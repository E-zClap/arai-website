import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

class Settings:
    # Database settings
    MONGO_URL: str = os.environ['MONGO_URL']
    DB_NAME: str = os.environ['DB_NAME']
    
    # CORS settings
    ALLOWED_ORIGINS: list = ["*"]
    ALLOWED_METHODS: list = ["*"]
    ALLOWED_HEADERS: list = ["*"]
    ALLOW_CREDENTIALS: bool = True
    
    # Logging settings
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

settings = Settings()