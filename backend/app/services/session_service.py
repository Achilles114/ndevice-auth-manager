from sqlalchemy.orm import Session
from app.models.session import DeviceSession

def create_session(db: Session, user_id: str, device_id: str) -> DeviceSession:
    session = DeviceSession(user_id=user_id, device_id=device_id)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_active_sessions(db: Session, user_id: str):
    return db.query(DeviceSession).filter_by(user_id=user_id, is_active=True).all()

def count_active_sessions(db: Session, user_id: str) -> int:
    return db.query(DeviceSession).filter_by(user_id=user_id, is_active=True).count()

def deactivate_session(db: Session, device_id: str, user_id: str) -> bool:
    session = db.query(DeviceSession).filter_by(device_id=device_id, user_id=user_id, is_active=True).first()
    if session:
        session.is_active = False
        db.commit()
        return True
    return False

def deactivate_oldest_session(db: Session, user_id: str) -> None:
    oldest = db.query(DeviceSession)\
        .filter_by(user_id=user_id, is_active=True)\
        .order_by(DeviceSession.created_at.asc())\
        .first()
    if oldest:
        oldest.is_active = False
        db.commit()
