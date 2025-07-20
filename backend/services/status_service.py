from typing import List
from ..models.status_check import StatusCheck, StatusCheckCreate
from ..database import get_database

class StatusService:
    def __init__(self):
        self.db = get_database()

    async def create_status_check(self, status_data: StatusCheckCreate) -> StatusCheck:
        """Create a new status check entry"""
        status_dict = status_data.dict()
        status_obj = StatusCheck(**status_dict)
        await self.db.status_checks.insert_one(status_obj.dict())
        return status_obj

    async def get_all_status_checks(self) -> List[StatusCheck]:
        """Retrieve all status check entries"""
        status_checks = await self.db.status_checks.find().to_list(1000)
        return [StatusCheck(**status_check) for status_check in status_checks]

# Global service instance
status_service = StatusService()