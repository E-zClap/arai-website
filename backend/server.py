"""Backwards-compatible entrypoint.

The application now lives in the ``app`` package (FastAPI + MySQL). This shim
keeps the old ``server:app`` import path working, e.g. ``uvicorn server:app``.
"""
from app.main import app  # noqa: F401
