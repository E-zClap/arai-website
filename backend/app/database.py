"""SQLAlchemy engine / session setup (synchronous)."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from .config import settings

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,   # transparently recover dropped connections
    pool_recycle=3600,
    echo=False,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a DB session and always closes it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
