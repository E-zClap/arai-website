"""Mirror Prof. Keigo Arai's researchmap publication lists into the database.

researchmap is the authoritative source: he maintains his list there and the
site shows exactly that (public API, no key needed).

    published_papers -> journal papers ("Published" on the site)
    misc             -> preprints ("Preprints"); anything else he lists there
                        (reviews, proceedings, magazine articles) is "Other"

Each sync adds new entries, overwrites changed ones and deletes the ones
removed from researchmap. The admin's "hidden" flag survives a sync. Rows that
did not come from researchmap (the old hand-curated / OpenAlex list) are hidden.
"""
import json
import logging
import re
import urllib.request

from ..config import settings
from ..models import Publication
from .publications import PREPRINT_SERVERS, clean_title

logger = logging.getLogger("arai.researchmap")

API = "https://api.researchmap.jp"
KINDS = ("published_papers", "misc")
ARXIV_ID = re.compile(r"(\d{4}\.\d{4,5})")


def _fetch(permalink: str, kind: str) -> list[dict]:
    items: list[dict] = []
    while True:
        # `start` is 1-based.
        url = f"{API}/{permalink}/{kind}?limit=1000&start={len(items) + 1}"
        req = urllib.request.Request(
            url, headers={"User-Agent": "qig-lab.net publication sync", "Accept": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        page = data.get("items") or []
        items.extend(page)
        if not page or len(items) >= int(data.get("total_items") or 0):
            return items


def _text(value: dict | None, lang: str) -> str:
    """Pick one language of a researchmap {"en": .., "ja": ..} field, else the other."""
    value = value or {}
    other = "ja" if lang == "en" else "en"
    return (value.get(lang) or value.get(other) or "").strip()


def _authors(item: dict) -> str:
    people = item.get("authors") or {}
    names = [(a.get("name") or "").strip() for a in (people.get("en") or people.get("ja") or [])]
    # Entries imported from J-GLOBAL sometimes list each author twice.
    return ", ".join(dict.fromkeys(n for n in names if n))


SMALL_WORDS = {"a", "an", "and", "at", "for", "in", "of", "on", "the", "to"}


def _venue(item: dict) -> str:
    """Journal name; entries imported from Web of Science are ALL CAPS
    ("NATURE NANOTECHNOLOGY"), so title-case those."""
    name = _text(item.get("publication_name"), "en")
    if not (name.isascii() and name.isupper()):
        return name
    words = name.lower().split()
    return " ".join(
        w if (i and w in SMALL_WORDS) or w == "npj" else w.capitalize() for i, w in enumerate(words)
    )


def _abstract(item: dict, lang: str) -> str:
    return re.sub(r"^abstract\s*", "", _text(item.get("description"), lang), flags=re.I)


def _arxiv_id(item: dict) -> str:
    ids = item.get("identifiers") or {}
    candidates = list(ids.get("arxiv_id") or [])
    candidates += [d for d in ids.get("doi") or [] if d.lower().startswith("10.48550/arxiv")]
    candidates += [s.get("@id") or "" for s in item.get("see_also") or [] if "arxiv.org" in (s.get("@id") or "")]
    for value in candidates:
        m = ARXIV_ID.search(value)
        if m:
            return m.group(1)
    return ""


def _pages(item: dict) -> str:
    first = (item.get("starting_page") or "").strip()
    last = (item.get("ending_page") or "").strip()
    return f"{first}-{last}" if first and last and first != last else first or last


def _map(kind: str, item: dict) -> dict:
    m = re.match(r"(\d{4})(?:-(\d{2}))?", item.get("publication_date") or "")
    year = int(m.group(1)) if m else None
    venue = _venue(item)
    doi =((item.get("identifiers") or {}).get("doi") or [""])[0]
    arxiv = _arxiv_id(item)

    if kind == "published_papers":
        kind_label = (item.get("published_paper_type") or "").replace("_", " ").capitalize() or "Paper"
    elif any(s in venue.lower() for s in PREPRINT_SERVERS) or (arxiv and not venue):
        kind_label = "Preprint"
    else:
        kind_label = "Other"

    if doi:
        link = f"https://doi.org/{doi}"
    elif arxiv:
        link = f"https://arxiv.org/abs/{arxiv}"
    else:
        link = next((s.get("@id") for s in item.get("see_also") or [] if s.get("@id")), "")

    return {
        "title_en": clean_title(_text(item.get("paper_title"), "en")),
        "title_jp": clean_title(_text(item.get("paper_title"), "ja")),
        "authors": _authors(item),
        "journal": venue[:255],
        "volume": (item.get("volume") or "")[:50],
        "issue": (item.get("number") or "")[:50],
        "pages": _pages(item)[:50],
        "year": year,
        "doi": doi[:255],
        "abstract_en": _abstract(item, "en"),
        "abstract_jp": _abstract(item, "ja"),
        "type": kind_label[:50],
        "link": link[:512],
        "sort_order": year * 100 + int(m.group(2) or 0) if m else 0,
        "arxiv_id": arxiv,
    }


def sync_publications(db) -> dict:
    """Make the publications table mirror researchmap. Returns a summary dict."""
    permalink = settings.researchmap_permalink
    fetched = {}
    for kind in KINDS:
        for item in _fetch(permalink, kind):
            if item.get("display", "disclosed") == "disclosed":
                fetched[f"{kind}/{item['rm:id']}"] = _map(kind, item)
    if not fetched:
        # An empty answer is far likelier an outage or a wrong permalink than
        # an empty profile; never wipe the site because of it.
        raise RuntimeError(f"researchmap returned no publications for '{permalink}'; nothing changed")

    rows = db.query(Publication).all()
    mirrored = {p.source_id: p for p in rows if p.source == "researchmap"}
    added = updated = removed = hidden = 0
    for key, fields in fetched.items():
        p = mirrored.get(key)
        if p is None:
            db.add(Publication(source="researchmap", source_id=key, **fields))
            added += 1
        elif any(getattr(p, k) != v for k, v in fields.items()):
            for k, v in fields.items():
                setattr(p, k, v)
            updated += 1
    for key, p in mirrored.items():
        if key not in fetched:
            db.delete(p)
            removed += 1
    for p in rows:
        if p.source != "researchmap" and p.is_active:
            p.is_active = False
            hidden += 1

    db.commit()
    result = {"added": added, "updated": updated, "removed": removed, "hidden": hidden, "total": len(fetched)}
    logger.info("researchmap sync: %s", result)
    return result
