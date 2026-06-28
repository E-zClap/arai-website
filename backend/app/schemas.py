"""Pydantic request/response schemas."""
from pydantic import BaseModel, ConfigDict, Field


# ---- shared bilingual helpers ----
class LangText(BaseModel):
    EN: str = ""
    JP: str = ""


class LangList(BaseModel):
    EN: list[str] = Field(default_factory=list)
    JP: list[str] = Field(default_factory=list)


class SocialLinks(BaseModel):
    website: str | None = None
    googleScholar: str | None = None
    orcid: str | None = None


# ---- auth ----
class LoginIn(BaseModel):
    username: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class PasswordChangeIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


# ---- news ----
class NewsIn(BaseModel):
    date: str = Field(description="YYYY-MM-DD")
    title: LangText
    link: str = "#"
    tags: list[str] = Field(default_factory=list)


# ---- publications ----
class PublicationIn(BaseModel):
    title: LangText
    authors: str = ""
    journal: str = ""
    volume: str = ""
    issue: str = ""
    pages: str = ""
    year: int | None = None
    doi: str = ""
    abstract: LangText = Field(default_factory=LangText)
    category: str = ""
    type: str = "Peer-Reviewed"
    citations: int = 0
    impact: str = ""
    link: str = ""
    sort_order: int = 0


# ---- team ----
class TeamMemberIn(BaseModel):
    # allow extra so future detail keys don't break the API
    model_config = ConfigDict(extra="ignore")

    category: str  # pi | staff | student | alumni
    name: LangText
    position: LangText = Field(default_factory=LangText)
    image: str = ""
    contact: LangText | None = None
    socialLinks: SocialLinks | None = None
    period: LangText | None = None
    # education / expertise / responsibilities / researchInterests / achievements ...
    details: dict[str, LangList] = Field(default_factory=dict)
    sort_order: int = 0
