"""Standalone publication sync (for cron / manual runs).

From the backend/ directory with the venv active:
    ./venv/bin/python sync_publications.py

Mirrors Prof. Arai's researchmap publication lists (published papers + misc)
into the database; see app/services/researchmap.py.
"""
from app.bootstrap import init_db
from app.database import SessionLocal
from app.services.researchmap import sync_publications


def main():
    init_db()
    db = SessionLocal()
    try:
        result = sync_publications(db)
        print(f"researchmap sync: {result}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
