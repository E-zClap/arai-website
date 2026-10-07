"""Sync Prof. Keigo Arai's publications from OpenAlex into the database.

OpenAlex is a free, open scholarly catalog (no API key needed). We fetch the
works for a single author id and upsert them by DOI so the lab's publication
list stays current automatically — while never overwriting the manually curated
entries (on a match we only refresh the citation count). A DOI that is already
in the table, even on a row the admin has hidden, is never imported again.
"""
import json
import logging
import urllib.parse
import urllib.request

from ..config import settings
from ..models import Publication
from .publications import clean_title, normalize_doi

logger = logging.getLogger("arai.openalex")

OPENALEX_WORKS = "https://api.openalex.org/works"


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
# profile. Works whose topics belong to this lab's field (quantum sensing /
# diamond NV / physics) are kept; the unrelated "Keigo Arai" papers (e.g. plant
# phenotyping) attributed to the same id are not (see _select_works).
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


def _topics(work: dict) -> tuple[bool, bool]:
    """(on-topic for the lab, marked as the unrelated Keigo Arai's field)."""
    has_rel = has_excl = False
    for c in work.get("concepts") or []:
        name = (c.get("display_name") or "").lower()
        score = c.get("score") or 0
        if score >= 0.2 and any(k in name for k in RELEVANT_KEYWORDS):
            has_rel = True
        if score >= 0.3 and any(k in name for k in EXCLUDE_KEYWORDS):
            has_excl = True
    return has_rel, has_excl


def _coauthors(work: dict, author_id: str) -> set[str]:
    ids = {
        ((a.get("author") or {}).get("id") or "").rsplit("/", 1)[-1]
        for a in work.get("authorships") or []
    }
    return ids - {author_id, ""}


def _select_works(works: list[dict], author_id: str) -> list[dict]:
    """Keep the works that are really this Keigo Arai's.

    Other researchers with the same name published decades before this lab
    existed (1950s fibre science, 1980s robotics), so anything before
    OPENALEX_MIN_YEAR is dropped. Of the rest, on-topic works are kept, and an
    off-topic one (e.g. a lab member's ML paper) only if it shares a co-author
    with the on-topic works: a namesake in another field never does.
    """
    on_topic, off_topic = [], []
    for w in works:
        if not (w.get("title") and w.get("doi") and w.get("publication_year")):
            continue
        if w.get("type") not in {"article", "review", "preprint", "book-chapter", "letter"}:
            continue
        if w["publication_year"] < settings.openalex_min_year:
            continue
        rel, excl = _topics(w)
        if not excl:
            (on_topic if rel else off_topic).append(w)
    network = set().union(*(_coauthors(w, author_id) for w in on_topic))
    return on_topic + [w for w in off_topic if _coauthors(w, author_id) & network]


def _pages(biblio: dict) -> str:
    first = biblio.get("first_page") or ""
    last = biblio.get("last_page") or ""
    if first and last and first != last:
        return f"{first}-{last}"
    return first or last or ""


def _work_type(work: dict) -> str:
    # OpenAlex sometimes types an arXiv record as "article"; 10.48550 is arXiv's DOI prefix.
    if work.get("type") == "preprint" or normalize_doi(work.get("doi")).startswith("10.48550/"):
        return "Preprint"
    kind = work.get("type") or ""
    return {
        "article": "Peer-Reviewed",
        "letter": "Peer-Reviewed",
        "review": "Review",
        "book-chapter": "Book Chapter",
    }.get(kind, kind.title())


def _sort_order(work: dict) -> int:
    """YYYYMM from the publication date, matching the curated rows' convention."""
    date = work.get("publication_date") or ""
    try:
        return int(date[:4]) * 100 + int(date[5:7])
    except ValueError:
        return (work.get("publication_year") or 0) * 100


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


def _map_work(work: dict) -> dict:
    title = clean_title(work.get("title"))
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
        "doi": normalize_doi(work.get("doi")),
        "abstract_en": abstract,
        "abstract_jp": abstract,
        "category": "",
        "type": _work_type(work),
        "citations": citations,
        "impact": _impact_from_citations(citations),
        "link": link,
        "sort_order": _sort_order(work),
    }


def sync_publications(db) -> dict:
    """Fetch the author's works and upsert by DOI. Returns a summary dict."""
    author_id = settings.openalex_author_id
    works = fetch_works(author_id)

    # Existing publications keyed by normalized DOI (to update, not duplicate).
    existing = db.query(Publication).all()
    by_doi = {normalize_doi(p.doi): p for p in existing if normalize_doi(p.doi)}

    added = updated = 0
    for work in _select_works(works, author_id):
        doi = normalize_doi(work.get("doi"))
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
        pub = Publication(**_map_work(work))
        db.add(pub)
        by_doi[doi] = pub
        added += 1

    db.commit()
    total = db.query(Publication).count()
    logger.info("OpenAlex sync: +%d added, %d updated, %d total", added, updated, total)
    return {"added": added, "updated": updated, "total": total, "fetched": len(works)}
