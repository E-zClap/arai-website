"""Team routes: grouped public view + flat admin list + admin CRUD."""
import os
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..deps import get_current_admin
from ..models import TeamMember
from ..schemas import TeamMemberIn
from ..serializers import apply_member_fields, member_to_dict

router = APIRouter(prefix="/api/team", tags=["team"])

VALID_CATEGORIES = {"pi", "staff", "student", "alumni"}


def _detect_image_ext(data: bytes) -> str | None:
    """Return a safe file extension based on the file's magic bytes, or None
    if the content is not a recognised image format."""
    if data[:3] == b"\xff\xd8\xff":
        return ".jpg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return ".png"
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return ".gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    return None


@router.post("/upload-image", dependencies=[Depends(get_current_admin)])
async def upload_image(file: UploadFile = File(...)):
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty file.")
    if len(data) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File too large (max {settings.max_upload_mb} MB).")
    ext = _detect_image_ext(data)
    if not ext:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use JPG, PNG, WEBP or GIF.")

    os.makedirs(settings.upload_dir, exist_ok=True)
    name = f"{uuid.uuid4().hex}{ext}"
    with open(os.path.join(settings.upload_dir, name), "wb") as f:
        f.write(data)

    return {"url": f"{settings.upload_url_prefix.rstrip('/')}/{name}", "filename": name}


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
