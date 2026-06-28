"""Database bootstrap: create tables and ensure an initial admin user exists."""
import logging

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


def init_db() -> None:
    # Import models so they are registered on the metadata before create_all.
    from . import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    ensure_admin()
