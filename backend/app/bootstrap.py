"""Database bootstrap: create tables and ensure an initial admin user exists."""
import logging

from sqlalchemy import inspect, text

from .config import settings
from .database import Base, SessionLocal, engine
from .models import AdminUser
from .security import hash_password

logger = logging.getLogger("arai.bootstrap")


def ensure_admin() -> None:
    db = SessionLocal()
    try:
        if db.query(AdminUser).first() is None:
            db.add(
                AdminUser(
                    username=settings.admin_username,
                    password_hash=hash_password(settings.admin_password),
                )
            )
            db.commit()
            logger.info("Created initial admin user '%s'", settings.admin_username)
    finally:
        db.close()


# Columns added after the first release. create_all() never alters an existing
# table, so add them here (idempotent, MySQL and SQLite).
ADDED_COLUMNS = {
    "publications": {
        "source": "VARCHAR(20) NOT NULL DEFAULT ''",
        "source_id": "VARCHAR(100) NOT NULL DEFAULT ''",
        "arxiv_id": "VARCHAR(30) NOT NULL DEFAULT ''",
    },
}


def add_missing_columns() -> None:
    insp = inspect(engine)
    for table, columns in ADDED_COLUMNS.items():
        have = {c["name"] for c in insp.get_columns(table)}
        with engine.begin() as conn:
            for name, ddl in columns.items():
                if name not in have:
                    conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {ddl}"))
                    logger.info("Added column %s.%s", table, name)


def init_db() -> None:
    # Import models so they are registered on the metadata before create_all.
    from . import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    add_missing_columns()
    ensure_admin()
