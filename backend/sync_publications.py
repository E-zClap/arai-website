"""Standalone publication sync (for cron / manual runs).

From the backend/ directory with the venv active:
    ./venv/bin/python sync_publications.py

Fetches Prof. Arai's works from OpenAlex and upserts them by DOI without
overwriting manually curated entries (only refreshes citation counts).
"""
from app.bootstrap import init_db
from app.database import SessionLocal
from app.services.openalex import sync_publications


def main():
    init_db()
    db = SessionLocal()
    try:
        result = sync_publications(db)
        print(f"OpenAlex sync: {result}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
