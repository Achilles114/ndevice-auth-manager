from fastapi import APIRouter, Depends, Security, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from app.api.deps import get_db
from app.core.security import verify_token
from app.services.session_service import (
    create_session, get_active_sessions, deactivate_session, count_active_sessions, deactivate_oldest_session
)
from app.core.config import settings

router = APIRouter()

@router.post("/login")
def login(current_user=Security(verify_token), db: Session = Depends(get_db)):
    user_id = current_user.get("sub")  # Auth0 Subject (user id)
    device_id = str(uuid4())

    # Check if max sessions exceeded
    active_count = count_active_sessions(db, user_id)
    if active_count >= settings.MAX_CONCURRENT_SESSIONS:
        # For simplicity, deactivate oldest active session to allow new login
        deactivate_oldest_session(db, user_id)

    # Create new session record
    session = create_session(db, user_id, device_id)

    return {
        "message": "Logged in and session created",
        "device_id": device_id,
        "active_sessions": count_active_sessions(db, user_id)
    }

@router.get("/active-sessions")
def active_sessions(current_user=Security(verify_token), db: Session = Depends(get_db)):
    user_id = current_user.get("sub")
    sessions = get_active_sessions(db, user_id)
    return sessions

@router.post("/logout-device/{device_id}")
def logout_device(device_id: str, current_user=Security(verify_token), db: Session = Depends(get_db)):
    user_id = current_user.get("sub")
    # Deactivate given session if it belongs to user
    success = deactivate_session(db, device_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found or not owned by user")
    return {"message": f"Logged out device {device_id}"}

@router.post("/logout-others/{device_id}")
def logout_other_devices(device_id: str, current_user=Security(verify_token), db: Session = Depends(get_db)):
    user_id = current_user.get("sub")
    sessions = get_active_sessions(db, user_id)
    for session in sessions:
        if session.device_id != device_id:
            deactivate_session(db, session.device_id, user_id)
    return {"message": "Logged out other devices"}
