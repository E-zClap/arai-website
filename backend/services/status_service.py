from typing import List
from models.status_check import StatusCheck, StatusCheckCreate
from database import get_database

class StatusService:
    def __init__(self):
        pass

    async def create_status_check(self, status_data: StatusCheckCreate) -> StatusCheck:
        """Create a new status check entry"""
        db = get_database()
        status_dict = status_data.dict()
        status_obj = StatusCheck(**status_dict)
        await db.status_checks.insert_one(status_obj.dict())
        return status_obj

    async def get_all_status_checks(self) -> List[StatusCheck]:
        """Retrieve all status check entries"""
        db = get_database()
        status_checks = await db.status_checks.find().to_list(1000)
        return [StatusCheck(**status_check) for status_check in status_checks]

# Global service instance
status_service = StatusService()