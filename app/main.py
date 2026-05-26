from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
import os

app = FastAPI(title="ART Ghana")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/landing", include_in_schema=False)
async def landing():
    return FileResponse(os.path.join(STATIC_DIR, "landing.html"))


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/landing")
