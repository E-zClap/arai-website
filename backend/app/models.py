"""Database models. Bilingual (EN/JP) content is stored either as paired
columns (short strings) or JSON (variable-length lists), so the API can return
exactly the object shape the React frontend already expects."""
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
)
from sqlalchemy import JSON

from .database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, autoincrement=True)
    # Kept as 'YYYY-MM-DD' string to match the frontend exactly and avoid TZ shifts.
    date = Column(String(10), nullable=False, index=True)
    title_en = Column(Text, nullable=False)
    title_jp = Column(Text, nullable=False, default="")
    link = Column(String(512), nullable=False, default="#")
    tags = Column(JSON, nullable=True)  # list[str]
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title_en = Column(Text, nullable=False)
    title_jp = Column(Text, nullable=False, default="")
    authors = Column(Text, nullable=False, default="")
    journal = Column(String(255), nullable=False, default="")
    volume = Column(String(50), nullable=False, default="")
    issue = Column(String(50), nullable=False, default="")
    pages = Column(String(50), nullable=False, default="")
    year = Column(Integer, nullable=True)
    doi = Column(String(255), nullable=False, default="")
    abstract_en = Column(Text, nullable=False, default="")
    abstract_jp = Column(Text, nullable=False, default="")
    category = Column(String(100), nullable=False, default="")
    type = Column(String(50), nullable=False, default="Peer-Reviewed")
    citations = Column(Integer, nullable=False, default=0)
    impact = Column(String(50), nullable=False, default="")
    link = Column(String(512), nullable=False, default="")
    sort_order = Column(Integer, nullable=False, default=0, index=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, autoincrement=True)
    # one of: pi | staff | student | alumni
    category = Column(String(20), nullable=False, index=True)
    name_en = Column(String(255), nullable=False)
    name_jp = Column(String(255), nullable=False, default="")
    position_en = Column(String(255), nullable=False, default="")
    position_jp = Column(String(255), nullable=False, default="")
    image = Column(String(512), nullable=False, default="")

    contact_en = Column(String(255), nullable=True)
    contact_jp = Column(String(255), nullable=True)

    website = Column(String(512), nullable=True)
    google_scholar = Column(String(512), nullable=True)
    orcid = Column(String(512), nullable=True)

    # alumni "period" badge
    period_en = Column(String(255), nullable=True)
    period_jp = Column(String(255), nullable=True)

    # Flexible bilingual list fields, e.g.
    # {"education": {"EN": [...], "JP": [...]}, "achievements": {...}, ...}
    details = Column(JSON, nullable=True)

    sort_order = Column(Integer, nullable=False, default=0, index=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
