from fastapi import APIRouter
from app.api.V1 import sessions  # Import your routers here (add auth.py similarly if needed)

router = APIRouter()

# Register your v1 API routers with prefixes and tags
router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
# If you have more routers like auth, include them here:
# router.include_router(auth.router, prefix="/auth", tags=["auth"])
