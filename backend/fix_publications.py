"""One-off cleanup of the publications table (safe to re-run).

From the backend/ directory with the venv active:
    ./venv/bin/python fix_publications.py           # dry run: only print changes
    ./venv/bin/python fix_publications.py --apply   # write them

1. Corrects four hand-entered DOIs that never resolved; the OpenAlex-synced
   copy of each paper (which carried the right DOI) is then a duplicate.
2. Hides duplicate rows that share a DOI, keeping the oldest (curated) one.
3. Hides works older than OPENALEX_MIN_YEAR: other researchers named Keigo Arai
   that OpenAlex merged into the same author profile.
4. Marks arXiv rows as preprints, dates them from their arXiv id, and strips
   HTML entities / LaTeX from titles.

Nothing is deleted. Hidden rows stay in the admin list and can be shown again,
and the sync never re-imports a DOI that is already in the table.
"""
import argparse
import re

from app.bootstrap import init_db
from app.config import settings
from app.database import SessionLocal
from app.models import Publication
from app.services.publications import clean_title, is_preprint, normalize_doi

# wrong DOI (as entered) -> (correct DOI, extra field fixes); verified on Crossref.
DOI_FIXES = {
    "10.1088/2399-6528/ad6ea6": ("10.1088/2399-6528/ad2b8b", {}),
    "10.1103/physrevapplied.20.044089": ("10.1103/PhysRevApplied.19.044089", {"volume": "19"}),
    "10.1038/s41534-023-00734-z": ("10.1038/s41534-023-00732-6", {}),
    "10.1063/5.0032499": ("10.1063/5.0031502", {}),
}

ARXIV_ID = re.compile(r"10\.48550/arxiv\.(\d{2})(\d{2})\.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="write changes (default: dry run)")
    args = parser.parse_args()

    init_db()
    db = SessionLocal()
    changes = []

    def change(p, field, value, why):
        if getattr(p, field) != value:
            changes.append(f"[{p.id:>3}] {field}: {getattr(p, field)!r} -> {value!r}  ({why})")
            setattr(p, field, value)

    try:
        rows = db.query(Publication).order_by(Publication.id).all()

        for p in rows:
            fix = DOI_FIXES.get(normalize_doi(p.doi))
            if fix:
                doi, extra = fix
                change(p, "doi", doi, "DOI did not resolve")
                change(p, "link", f"https://doi.org/{doi}", "DOI did not resolve")
                for field, value in extra.items():
                    change(p, field, value, "DOI did not resolve")

        kept = {}
        for p in rows:
            doi = normalize_doi(p.doi)
            if not doi or not p.is_active:
                continue
            if doi in kept:
                change(p, "is_active", False, f"duplicate of [{kept[doi]}]")
            else:
                kept[doi] = p.id

        for p in rows:
            if p.year and p.year < settings.openalex_min_year:
                change(p, "is_active", False, f"{p.year} is before {settings.openalex_min_year}: another Keigo Arai")

        for p in rows:
            title = clean_title(p.title_en)
            if title != p.title_en:
                if p.title_jp == p.title_en:
                    change(p, "title_jp", title, "HTML/LaTeX in title")
                change(p, "title_en", title, "HTML/LaTeX in title")
            if is_preprint(p):
                change(p, "type", "Preprint", "arXiv record")
                m = ARXIV_ID.match(normalize_doi(p.doi))
                if m:
                    change(p, "sort_order", 200000 + int(m.group(1)) * 100 + int(m.group(2)), "date from arXiv id")

        print("\n".join(changes) or "Nothing to change.")
        if args.apply:
            db.commit()
            print(f"Applied {len(changes)} change(s).")
        else:
            db.rollback()
            print(f"Dry run: {len(changes)} change(s). Re-run with --apply to write them.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
