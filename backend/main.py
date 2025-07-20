from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from database import db_instance
from routes.status import router as status_router
from utils.logging import setup_logging
from config.settings import settings

# Setup logging
setup_logging()

# Create the main app
app = FastAPI(title="Quantum Sensing Lab API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=settings.ALLOW_CREDENTIALS,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)

# Include routers
app.include_router(status_router)

# Event handlers
@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    await db_instance.connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    await db_instance.close_mongo_connection()