"""Convert ORM models into the exact JSON shape the React frontend expects."""
from .models import News, Publication, TeamMember


def news_to_dict(n: News) -> dict:
    return {
        "id": n.id,
        "date": n.date,
        "title": {"EN": n.title_en, "JP": n.title_jp},
        "link": n.link or "#",
        "tags": n.tags or [],
    }


def publication_to_dict(p: Publication) -> dict:
    return {
        "id": p.id,
        "title": {"EN": p.title_en, "JP": p.title_jp},
        "authors": p.authors or "",
        "journal": p.journal or "",
        "volume": p.volume or "",
        "issue": p.issue or "",
        "year": p.year,
        "pages": p.pages or "",
        "doi": p.doi or "",
        "abstract": {"EN": p.abstract_en, "JP": p.abstract_jp},
        "category": p.category or "",
        "type": p.type or "",
        "citations": p.citations or 0,
        "impact": p.impact or "",
        "link": p.link or "",
    }


def member_to_dict(m: TeamMember) -> dict:
    d = {
        "id": m.id,
        "category": m.category,
        "name": {"EN": m.name_en, "JP": m.name_jp},
        "position": {"EN": m.position_en, "JP": m.position_jp},
        "image": m.image or "",
        "sort_order": m.sort_order,
    }
    # flexible bilingual list fields (education, expertise, achievements, ...)
    if m.details:
        for key, value in m.details.items():
            d[key] = value
    if m.contact_en or m.contact_jp:
        d["contact"] = {"EN": m.contact_en or "", "JP": m.contact_jp or ""}
    social = {}
    if m.website:
        social["website"] = m.website
    if m.google_scholar:
        social["googleScholar"] = m.google_scholar
    if m.orcid:
        social["orcid"] = m.orcid
    if social:
        d["socialLinks"] = social
    if m.period_en or m.period_jp:
        d["period"] = {"EN": m.period_en or "", "JP": m.period_jp or ""}
    return d


# ---- helpers to write incoming schema data onto a model ----
def apply_member_fields(m: TeamMember, data) -> None:
    """Copy a TeamMemberIn schema onto a TeamMember ORM row."""
    m.category = data.category
    m.name_en = data.name.EN
    m.name_jp = data.name.JP
    m.position_en = data.position.EN
    m.position_jp = data.position.JP
    m.image = data.image or ""
    m.sort_order = data.sort_order

    m.contact_en = data.contact.EN if data.contact else None
    m.contact_jp = data.contact.JP if data.contact else None

    if data.socialLinks:
        m.website = data.socialLinks.website
        m.google_scholar = data.socialLinks.googleScholar
        m.orcid = data.socialLinks.orcid
    else:
        m.website = m.google_scholar = m.orcid = None

    m.period_en = data.period.EN if data.period else None
    m.period_jp = data.period.JP if data.period else None

    # Only keep detail groups that actually have content.
    details = {}
    for key, lang_list in (data.details or {}).items():
        en = [s for s in (lang_list.EN or []) if str(s).strip()]
        jp = [s for s in (lang_list.JP or []) if str(s).strip()]
        if en or jp:
            details[key] = {"EN": en, "JP": jp}
    m.details = details or None
