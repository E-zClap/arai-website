from fastapi import APIRouter
from typing import List
from ..models.status_check import StatusCheck, StatusCheckCreate
from ..services.status_service import status_service

router = APIRouter(prefix="/api", tags=["status"])

@router.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Hello World"}

@router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    """Create a new status check"""
    return await status_service.create_status_check(input)

@router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """Get all status checks"""
    return await status_service.get_all_status_checks()