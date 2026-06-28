"""Authentication routes: login + password change."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_admin
from ..models import AdminUser
from ..schemas import LoginIn, PasswordChangeIn, TokenOut
from ..security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return TokenOut(access_token=create_access_token(admin.username))


@router.get("/me")
def me(admin: AdminUser = Depends(get_current_admin)):
    return {"username": admin.username}


@router.post("/change-password")
def change_password(
    payload: PasswordChangeIn,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    if not verify_password(payload.current_password, admin.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    admin.password_hash = hash_password(payload.new_password)
    db.commit()
    return {"status": "ok"}
