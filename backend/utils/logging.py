import logging
from ..config.settings import settings

def setup_logging():
    """Setup application logging"""
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL),
        format=settings.LOG_FORMAT
    )
    
    logger = logging.getLogger(__name__)
    logger.info("Logging setup completed")
    
    return logger