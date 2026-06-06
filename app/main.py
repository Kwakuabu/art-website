import logging
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse

app = FastAPI(title="ART Ghana")

BASE_DIR = Path(__file__).parent.parent
STATIC_DIR = BASE_DIR / "static"
PAGES_DIR = STATIC_DIR / "pages"

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

logger = logging.getLogger(__name__)


def page(name: str) -> FileResponse:
    path = PAGES_DIR / f"{name}.html"
    if not path.exists():
        logger.error("Page not found: %s (PAGES_DIR=%s)", path, PAGES_DIR)
        raise HTTPException(status_code=404, detail=f"Page not found: {name}")
    return FileResponse(str(path))


@app.get("/favicon.svg", include_in_schema=False)
async def favicon():
    return FileResponse(str(STATIC_DIR / "favicon.svg"), media_type="image/svg+xml")


@app.get("/debug/paths", include_in_schema=False)
async def debug_paths():
    return {
        "base_dir": str(BASE_DIR),
        "static_dir": str(STATIC_DIR),
        "pages_dir": str(PAGES_DIR),
        "pages_dir_exists": PAGES_DIR.exists(),
        "pages": [f.name for f in PAGES_DIR.glob("*.html")] if PAGES_DIR.exists() else [],
    }


@app.get("/", include_in_schema=False)
async def home():
    return page("home")


@app.get("/services", include_in_schema=False)
async def services():
    return page("services")


@app.get("/students", include_in_schema=False)
async def students():
    return page("students")


@app.get("/defence", include_in_schema=False)
async def defence():
    return page("defence")


@app.get("/academy", include_in_schema=False)
async def academy():
    return page("academy")


@app.get("/consultants", include_in_schema=False)
async def consultants():
    return page("consultants")


@app.get("/technology", include_in_schema=False)
async def technology():
    return page("technology")


@app.get("/about", include_in_schema=False)
async def about():
    return page("about")


@app.get("/contact", include_in_schema=False)
async def contact():
    return page("contact")


@app.get("/privacy", include_in_schema=False)
async def privacy():
    return page("privacy")


@app.get("/terms", include_in_schema=False)
async def terms():
    return page("terms")


@app.get("/landing", include_in_schema=False)
async def landing():
    return RedirectResponse(url="/")
