"""Publication routes: public list + admin CRUD."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_admin
from ..models import Publication
from ..schemas import PublicationIn
from ..serializers import publication_to_dict
from ..services.openalex import sync_publications

router = APIRouter(prefix="/api/publications", tags=["publications"])


@router.post("/sync", dependencies=[Depends(get_current_admin)])
def sync_from_openalex(db: Session = Depends(get_db)):
    """Import/refresh Prof. Arai's publications from OpenAlex (admin only)."""
    try:
        return sync_publications(db)
    except Exception as exc:  # network / parsing issues
        raise HTTPException(status_code=502, detail=f"OpenAlex sync failed: {exc}")


def _apply(p: Publication, payload: PublicationIn) -> None:
    p.title_en = payload.title.EN
    p.title_jp = payload.title.JP
    p.authors = payload.authors
    p.journal = payload.journal
    p.volume = payload.volume
    p.issue = payload.issue
    p.pages = payload.pages
    p.year = payload.year
    p.doi = payload.doi
    p.abstract_en = payload.abstract.EN
    p.abstract_jp = payload.abstract.JP
    p.category = payload.category
    p.type = payload.type
    p.citations = payload.citations
    p.impact = payload.impact
    p.link = payload.link
    p.sort_order = payload.sort_order


@router.get("")
def list_publications(db: Session = Depends(get_db)):
    rows = (
        db.query(Publication)
        .order_by(Publication.sort_order.asc(), Publication.id.asc())
        .all()
    )
    return [publication_to_dict(p) for p in rows]


@router.post("", dependencies=[Depends(get_current_admin)])
def create_publication(payload: PublicationIn, db: Session = Depends(get_db)):
    p = Publication()
    _apply(p, payload)
    db.add(p)
    db.commit()
    db.refresh(p)
    return publication_to_dict(p)


@router.put("/{pub_id}", dependencies=[Depends(get_current_admin)])
def update_publication(pub_id: int, payload: PublicationIn, db: Session = Depends(get_db)):
    p = db.get(Publication, pub_id)
    if not p:
        raise HTTPException(status_code=404, detail="Publication not found")
    _apply(p, payload)
    db.commit()
    db.refresh(p)
    return publication_to_dict(p)


@router.delete("/{pub_id}", dependencies=[Depends(get_current_admin)])
def delete_publication(pub_id: int, db: Session = Depends(get_db)):
    p = db.get(Publication, pub_id)
    if not p:
        raise HTTPException(status_code=404, detail="Publication not found")
    db.delete(p)
    db.commit()
    return {"status": "deleted", "id": pub_id}
