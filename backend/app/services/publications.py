"""Shared publication logic: preprint detection, title cleanup, and building
the public list (hidden rows removed, each preprint folded into its published
version, duplicate entries dropped)."""
import difflib
import html
import re

from ..models import Publication
from ..serializers import publication_to_dict

PREPRINT_SERVERS = (
    "arxiv", "biorxiv", "medrxiv", "chemrxiv", "techrxiv",
    "research square", "ssrn", "preprints.org",
)

# A preprint and its journal version keep (nearly) the same title. On the lab's
# data real pairs score >= 0.74 and unrelated papers <= 0.40.
PREPRINT_MATCH_RATIO = 0.7


def normalize_doi(doi: str | None) -> str:
    if not doi:
        return ""
    return (
        doi.strip().lower()
        .replace("https://doi.org/", "")
        .replace("http://doi.org/", "")
        .replace("doi.org/", "")
    )


def clean_title(title: str | None) -> str:
    """Decode HTML entities and drop the LaTeX markup arXiv titles carry,
    e.g. '$\\mathbf{Bi_2Sr_2}$' -> 'Bi2Sr2'."""
    t = html.unescape(title or "")
    if "$" in t:
        t = re.sub(r"\\[a-zA-Z]+", "", t)
        t = re.sub(r"[${}^_]", "", t)
    return " ".join(t.split())


def is_preprint(p: Publication) -> bool:
    journal = (p.journal or "").lower()
    return (
        (p.type or "").strip().lower() == "preprint"
        or normalize_doi(p.doi).startswith("10.48550/arxiv")
        or any(s in journal for s in PREPRINT_SERVERS)
    )


def _title_key(title: str | None) -> str:
    return " ".join(re.sub(r"[\W_]+", " ", clean_title(title).lower()).split())


def _link(p: Publication) -> str:
    if p.link and p.link != "#":
        return p.link
    return f"https://doi.org/{p.doi}" if p.doi else ""


def sort_key(p: Publication):
    """Newest year first; within a year, higher sort_order (YYYYMM) first."""
    return (-(p.year or 0), -(p.sort_order or 0), -p.id)


def to_dict(p: Publication) -> dict:
    return {**publication_to_dict(p), "preprint": is_preprint(p)}


def admin_publications(rows: list[Publication]) -> list[dict]:
    """Every row, hidden ones included, in display order."""
    return [to_dict(p) for p in sorted(rows, key=sort_key)]


def public_publications(rows: list[Publication]) -> list[dict]:
    # Oldest rows win ties: those are the hand-curated entries (JP titles,
    # equal-contribution marks), synced copies came later.
    rows = sorted((p for p in rows if p.is_active), key=lambda p: p.id)

    published: list[Publication] = []
    seen_dois: set[str] = set()
    seen_titles: set[str] = set()
    preprints: list[Publication] = []
    for p in rows:
        if is_preprint(p):
            preprints.append(p)
            continue
        doi, title = normalize_doi(p.doi), _title_key(p.title_en)
        if (doi and doi in seen_dois) or title in seen_titles:
            continue
        seen_dois.add(doi)
        seen_titles.add(title)
        published.append(p)

    out = {p.id: to_dict(p) for p in published}
    pub_titles = [(p.id, _title_key(p.title_en)) for p in published]
    for pre in preprints:
        key = _title_key(pre.title_en)
        best_id, best = None, 0.0
        for pid, title in pub_titles:
            m = difflib.SequenceMatcher(None, key, title)
            if m.real_quick_ratio() < PREPRINT_MATCH_RATIO or m.quick_ratio() < PREPRINT_MATCH_RATIO:
                continue
            r = m.ratio()
            if r > best:
                best_id, best = pid, r
        if best >= PREPRINT_MATCH_RATIO:
            # Already published: link the preprint from the journal entry.
            out[best_id].setdefault("preprint_link", _link(pre))
        else:
            out[pre.id] = to_dict(pre)

    by_id = {p.id: p for p in rows}
    return [out[i] for i in sorted(out, key=lambda i: sort_key(by_id[i]))]
