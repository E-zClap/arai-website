from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    database = None

    def __init__(self):
        self.client = None
        self.database = None

    async def connect_to_mongo(self):
        """Create database connection"""
        logger.info("Connecting to MongoDB...")
        self.client = AsyncIOMotorClient(settings.MONGO_URL)
        self.database = self.client[settings.DB_NAME]
        logger.info("Connected to MongoDB successfully!")

    async def close_mongo_connection(self):
        """Close database connection"""
        logger.info("Closing MongoDB connection...")
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed!")

# Global database instance
db_instance = Database()

def get_database():
    """Get database instance"""
    return db_instance.database