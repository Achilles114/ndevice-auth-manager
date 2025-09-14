from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api.V1.api import router as api_router  # Import the aggregated router

app = FastAPI(title="N-Device Auth Manager Backend")

# Setup CORS to allow your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router under /api/v1
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
async def root():
    return {"message": "Backend is healthy"}
