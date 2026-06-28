"""Sync Prof. Keigo Arai's publications from OpenAlex into the database.

OpenAlex is a free, open scholarly catalog (no API key needed). We fetch the
works for a single author id and upsert them by DOI so the lab's publication
list stays current automatically — while never overwriting the manually curated
entries (on a match we only refresh the citation count).
"""
import json
import logging
import urllib.parse
import urllib.request

from ..config import settings
from ..models import Publication

logger = logging.getLogger("arai.openalex")

OPENALEX_WORKS = "https://api.openalex.org/works"


def _normalize_doi(doi: str | None) -> str:
    if not doi:
        return ""
    return (
        doi.strip().lower()
        .replace("https://doi.org/", "")
        .replace("http://doi.org/", "")
        .replace("doi.org/", "")
    )


def _reconstruct_abstract(inverted_index: dict | None) -> str:
    """OpenAlex stores abstracts as an inverted index {word: [positions]}."""
    if not inverted_index:
        return ""
    positions: dict[int, str] = {}
    for word, idxs in inverted_index.items():
        for i in idxs:
            positions[i] = word
    text = " ".join(positions[i] for i in sorted(positions))
    return text[:2000]


def _impact_from_citations(c: int) -> str:
    if c >= 100:
        return "Very High"
    if c >= 30:
        return "High"
    if c >= 5:
        return "Medium"
    return "Low"


# OpenAlex sometimes merges different people with the same name into one author
# profile. Keep only works whose topics clearly belong to this lab's field
# (quantum sensing / diamond NV / physics), which filters out the unrelated
# "Keigo Arai" papers (e.g. plant phenotyping) attributed to the same id.
RELEVANT_KEYWORDS = (
    "quantum", "diamond", "nitrogen-vacancy", "nv center", "magneto", "magnetic",
    "spin", "qubit", "coherence", "decoherence", "physic", "condensed matter",
    "metrology", "resonance", "nanoscale", "photon", "spectroscop",
    "materials science", "semiconductor", "optic",
)
# Concepts that mark the unrelated "Keigo Arai" (agriculture / genomics, etc.).
EXCLUDE_KEYWORDS = (
    "phenomic", "genomic", "remote sensing", "agronom", "botan", "horticultur",
    "sorghum", "photosynthesis", "cultivar", "crop", "ecolog", "soil",
)


def _is_relevant(work: dict) -> bool:
    has_rel = has_excl = False
    for c in work.get("concepts") or []:
        name = (c.get("display_name") or "").lower()
        score = c.get("score") or 0
        if score >= 0.2 and any(k in name for k in RELEVANT_KEYWORDS):
            has_rel = True
        if score >= 0.3 and any(k in name for k in EXCLUDE_KEYWORDS):
            has_excl = True
    return has_rel and not has_excl


def _pages(biblio: dict) -> str:
    first = biblio.get("first_page") or ""
    last = biblio.get("last_page") or ""
    if first and last and first != last:
        return f"{first}-{last}"
    return first or last or ""


def fetch_works(author_id: str) -> list[dict]:
    params = {
        "filter": f"author.id:{author_id}",
        "per-page": "200",
        "sort": "publication_date:desc",
        "mailto": settings.openalex_mailto or "admin@qig-lab.net",
    }
    url = f"{OPENALEX_WORKS}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "qig-lab.net publication sync"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data.get("results", [])


def _map_work(work: dict, sort_order: int) -> dict:
    title = (work.get("title") or "").strip()
    authors = ", ".join(
        a["author"]["display_name"]
        for a in work.get("authorships", [])
        if a.get("author") and a["author"].get("display_name")
    )
    source = (work.get("primary_location") or {}).get("source") or {}
    journal = source.get("display_name") or ""
    biblio = work.get("biblio") or {}
    citations = int(work.get("cited_by_count") or 0)
    abstract = _reconstruct_abstract(work.get("abstract_inverted_index"))
    landing = (work.get("primary_location") or {}).get("landing_page_url")
    link = work.get("doi") or landing or ""
    # No Japanese metadata from OpenAlex — mirror English so JP view isn't blank.
    return {
        "title_en": title,
        "title_jp": title,
        "authors": authors,
        "journal": journal,
        "volume": str(biblio.get("volume") or ""),
        "issue": str(biblio.get("issue") or ""),
        "pages": _pages(biblio),
        "year": work.get("publication_year"),
        "doi": _normalize_doi(work.get("doi")),
        "abstract_en": abstract,
        "abstract_jp": abstract,
        "category": "",
        "type": "Peer-Reviewed" if work.get("type") == "article" else (work.get("type") or "").title(),
        "citations": citations,
        "impact": _impact_from_citations(citations),
        "link": link,
        "sort_order": sort_order,
    }


def sync_publications(db) -> dict:
    """Fetch the author's works and upsert by DOI. Returns a summary dict."""
    author_id = settings.openalex_author_id
    works = fetch_works(author_id)

    # Existing publications keyed by normalized DOI (to update, not duplicate).
    existing = db.query(Publication).all()
    by_doi = {_normalize_doi(p.doi): p for p in existing if _normalize_doi(p.doi)}

    # New synced items go after the curated ones, newest first.
    base_order = max([p.sort_order for p in existing], default=0) + 1
    candidates = [
        w for w in works
        if w.get("title") and w.get("doi") and w.get("publication_year")
        and w.get("type") in {"article", "review", "preprint", "book-chapter", "letter"}
        and _is_relevant(w)
    ]
    candidates.sort(key=lambda w: w.get("publication_year") or 0, reverse=True)

    added = updated = 0
    order = base_order
    for work in candidates:
        doi = _normalize_doi(work.get("doi"))
        if doi in by_doi:
            # Preserve curated fields; just refresh the citation count + impact.
            pub = by_doi[doi]
            new_cites = int(work.get("cited_by_count") or 0)
            if new_cites != (pub.citations or 0):
                pub.citations = new_cites
                if not pub.impact:
                    pub.impact = _impact_from_citations(new_cites)
                updated += 1
            continue
        fields = _map_work(work, order)
        order += 1
        pub = Publication(**fields)
        db.add(pub)
        by_doi[doi] = pub
        added += 1

    db.commit()
    total = db.query(Publication).count()
    logger.info("OpenAlex sync: +%d added, %d updated, %d total", added, updated, total)
    return {"added": added, "updated": updated, "total": total, "fetched": len(works)}
