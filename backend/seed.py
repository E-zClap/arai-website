"""Seed the database from seed_data.json (the original hard-coded site content).

Usage (from the backend/ directory, with the venv active):
    python seed.py            # only seeds tables that are currently empty (safe to re-run)
    python seed.py --reset    # wipes news/publications/team and reseeds them

The admin user is handled separately by app.bootstrap.ensure_admin().
"""
import argparse
import json
import sys
from pathlib import Path

from app.bootstrap import init_db
from app.database import SessionLocal
from app.models import News, Publication, TeamMember

SEED_FILE = Path(__file__).parent / "seed_data.json"

DETAIL_KEYS = [
    "education",
    "expertise",
    "responsibilities",
    "researchInterests",
    "achievements",
    "researchActivities",
    "researchFocus",
    "skills",
]


def _lang(value, key):
    if isinstance(value, dict):
        return value.get(key, "")
    if isinstance(value, str) and key == "EN":
        return value
    return ""


def build_member(src: dict, category: str, order: int) -> TeamMember:
    m = TeamMember(
        category=category,
        name_en=_lang(src.get("name"), "EN"),
        name_jp=_lang(src.get("name"), "JP"),
        position_en=_lang(src.get("position"), "EN"),
        position_jp=_lang(src.get("position"), "JP"),
        image=src.get("image", "") or "",
        sort_order=order,
    )
    contact = src.get("contact")
    if isinstance(contact, dict):
        m.contact_en = contact.get("EN")
        m.contact_jp = contact.get("JP")
    elif isinstance(contact, str):
        m.contact_en = contact

    social = src.get("socialLinks") or {}
    m.website = social.get("website")
    m.google_scholar = social.get("googleScholar")
    m.orcid = social.get("orcid")

    period = src.get("period")
    if isinstance(period, dict):
        m.period_en = period.get("EN")
        m.period_jp = period.get("JP")

    details = {}
    for key in DETAIL_KEYS:
        value = src.get(key)
        if isinstance(value, dict) and (value.get("EN") or value.get("JP")):
            details[key] = {"EN": value.get("EN", []), "JP": value.get("JP", [])}
    m.details = details or None
    return m


def seed_news(db, items):
    for item in items:
        db.add(
            News(
                date=item.get("date", ""),
                title_en=_lang(item.get("title"), "EN"),
                title_jp=_lang(item.get("title"), "JP"),
                link=item.get("link", "#") or "#",
                tags=item.get("tags", []) or [],
            )
        )


def seed_publications(db, items):
    for order, item in enumerate(items):
        title = item.get("title", {})
        abstract = item.get("abstract", {})
        year = item.get("year")
        try:
            year = int(year) if year not in (None, "") else None
        except (ValueError, TypeError):
            year = None
        db.add(
            Publication(
                title_en=_lang(title, "EN"),
                title_jp=_lang(title, "JP"),
                authors=item.get("authors", "") or "",
                journal=item.get("journal", "") or "",
                volume=str(item.get("volume", "") or ""),
                issue=str(item.get("issue", "") or ""),
                pages=str(item.get("pages", "") or ""),
                year=year,
                doi=item.get("doi", "") or "",
                abstract_en=_lang(abstract, "EN"),
                abstract_jp=_lang(abstract, "JP"),
                category=item.get("category", "") or "",
                type=item.get("type", "Peer-Reviewed") or "Peer-Reviewed",
                citations=int(item.get("citations", 0) or 0),
                impact=item.get("impact", "") or "",
                link=item.get("link", "") or "",
                sort_order=order,
            )
        )


def seed_team(db, team):
    order = 0
    pi = team.get("pi")
    if pi:
        db.add(build_member(pi, "pi", 0))
    for src in team.get("staff", []):
        db.add(build_member(src, "staff", order))
        order += 1
    order = 0
    for src in team.get("students", []):
        db.add(build_member(src, "student", order))
        order += 1
    order = 0
    for src in team.get("alumni", []):
        db.add(build_member(src, "alumni", order))
        order += 1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="wipe content tables and reseed")
    args = parser.parse_args()

    if not SEED_FILE.exists():
        print(f"ERROR: {SEED_FILE} not found", file=sys.stderr)
        sys.exit(1)

    data = json.loads(SEED_FILE.read_text(encoding="utf-8"))

    init_db()  # ensure tables + admin user exist
    db = SessionLocal()
    try:
        if args.reset:
            db.query(News).delete()
            db.query(Publication).delete()
            db.query(TeamMember).delete()
            db.commit()
            print("Wiped news / publications / team tables.")

        if db.query(News).count() == 0:
            seed_news(db, data.get("news", []))
            print(f"Seeded {len(data.get('news', []))} news items.")
        else:
            print("News table not empty - skipped.")

        if db.query(Publication).count() == 0:
            seed_publications(db, data.get("publications", []))
            print(f"Seeded {len(data.get('publications', []))} publications.")
        else:
            print("Publications table not empty - skipped.")

        if db.query(TeamMember).count() == 0:
            seed_team(db, data.get("team", {}))
            print("Seeded team members.")
        else:
            print("Team table not empty - skipped.")

        db.commit()
        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
