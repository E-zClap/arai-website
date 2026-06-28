"""Team routes: grouped public view + flat admin list + admin CRUD."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_admin
from ..models import TeamMember
from ..schemas import TeamMemberIn
from ..serializers import apply_member_fields, member_to_dict

router = APIRouter(prefix="/api/team", tags=["team"])

VALID_CATEGORIES = {"pi", "staff", "student", "alumni"}


def _ordered(db: Session, category: str):
    return (
        db.query(TeamMember)
        .filter(TeamMember.category == category)
        .order_by(TeamMember.sort_order.asc(), TeamMember.id.asc())
        .all()
    )


@router.get("")
def get_team(db: Session = Depends(get_db)):
    """Grouped shape consumed by the public Team page."""
    pis = _ordered(db, "pi")
    return {
        "principalInvestigator": member_to_dict(pis[0]) if pis else None,
        "staffAndPostdocs": [member_to_dict(m) for m in _ordered(db, "staff")],
        "students": [member_to_dict(m) for m in _ordered(db, "student")],
        "alumni": [member_to_dict(m) for m in _ordered(db, "alumni")],
    }


@router.get("/all", dependencies=[Depends(get_current_admin)])
def list_all_members(db: Session = Depends(get_db)):
    """Flat list (all categories) for the admin dashboard."""
    rows = (
        db.query(TeamMember)
        .order_by(TeamMember.category.asc(), TeamMember.sort_order.asc(), TeamMember.id.asc())
        .all()
    )
    return [member_to_dict(m) for m in rows]


@router.post("", dependencies=[Depends(get_current_admin)])
def create_member(payload: TeamMemberIn, db: Session = Depends(get_db)):
    if payload.category not in VALID_CATEGORIES:
        raise HTTPException(status_code=422, detail=f"category must be one of {sorted(VALID_CATEGORIES)}")
    m = TeamMember(category=payload.category, name_en=payload.name.EN)
    apply_member_fields(m, payload)
    db.add(m)
    db.commit()
    db.refresh(m)
    return member_to_dict(m)


@router.put("/{member_id}", dependencies=[Depends(get_current_admin)])
def update_member(member_id: int, payload: TeamMemberIn, db: Session = Depends(get_db)):
    if payload.category not in VALID_CATEGORIES:
        raise HTTPException(status_code=422, detail=f"category must be one of {sorted(VALID_CATEGORIES)}")
    m = db.get(TeamMember, member_id)
    if not m:
        raise HTTPException(status_code=404, detail="Team member not found")
    apply_member_fields(m, payload)
    db.commit()
    db.refresh(m)
    return member_to_dict(m)


@router.delete("/{member_id}", dependencies=[Depends(get_current_admin)])
def delete_member(member_id: int, db: Session = Depends(get_db)):
    m = db.get(TeamMember, member_id)
    if not m:
        raise HTTPException(status_code=404, detail="Team member not found")
    db.delete(m)
    db.commit()
    return {"status": "deleted", "id": member_id}
