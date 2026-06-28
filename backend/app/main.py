"""FastAPI application entrypoint for the Arai Lab API."""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .bootstrap import init_db
from .config import settings
from .routers import auth, news, publications, team

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("arai.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        init_db()
        logger.info("Database initialised")
    except Exception:  # pragma: no cover - log and continue so health endpoint works
        logger.exception("Database initialisation failed")
    yield


app = FastAPI(title="Arai Lab API", version="1.0.0", lifespan=lifespan)

# JWT lives in the Authorization header (no cookies), so credentials are not
# needed. The wildcard + credentials combination is invalid per the CORS spec,
# so only enable credentials when explicit origins are configured.
_origins = settings.cors_origin_list
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=_origins != ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(news.router)
app.include_router(publications.router)
app.include_router(team.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
