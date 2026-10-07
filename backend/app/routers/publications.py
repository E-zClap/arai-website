"""Publication routes: public list, admin list, researchmap sync, show/hide.

Content is maintained on researchmap (see services/researchmap.py), so the
admin can only re-sync and hide or show an entry here.
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_admin
from ..models import Publication
from ..services.publications import admin_publications, public_publications, to_dict
from ..services.researchmap import sync_publications

router = APIRouter(prefix="/api/publications", tags=["publications"])


class Visibility(BaseModel):
    is_active: bool


@router.post("/sync", dependencies=[Depends(get_current_admin)])
def sync_from_researchmap(db: Session = Depends(get_db)):
    """Mirror Prof. Arai's researchmap publication lists (admin only)."""
    try:
        return sync_publications(db)
    except Exception as exc:  # network / parsing issues
        raise HTTPException(status_code=502, detail=f"researchmap sync failed: {exc}")


@router.get("")
def list_publications(db: Session = Depends(get_db)):
    """Public list: visible rows only, preprints merged into their journal version."""
    return public_publications(db.query(Publication).all())


@router.get("/all", dependencies=[Depends(get_current_admin)])
def list_all_publications(db: Session = Depends(get_db)):
    """Admin list: every researchmap entry, hidden ones and merged preprints included."""
    return admin_publications(db.query(Publication).all())


@router.patch("/{pub_id}", dependencies=[Depends(get_current_admin)])
def set_visibility(pub_id: int, payload: Visibility, db: Session = Depends(get_db)):
    p = db.get(Publication, pub_id)
    if not p:
        raise HTTPException(status_code=404, detail="Publication not found")
    p.is_active = payload.is_active
    db.commit()
    db.refresh(p)
    return to_dict(p)
