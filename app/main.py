from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
import os

app = FastAPI(title="ART Ghana")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
PAGES_DIR = os.path.join(STATIC_DIR, "pages")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


def page(name: str) -> FileResponse:
    return FileResponse(os.path.join(PAGES_DIR, f"{name}.html"))


@app.get("/favicon.svg", include_in_schema=False)
async def favicon():
    return FileResponse(os.path.join(STATIC_DIR, "favicon.svg"), media_type="image/svg+xml")


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


@app.get("/landing", include_in_schema=False)
async def landing():
    return RedirectResponse(url="/")
