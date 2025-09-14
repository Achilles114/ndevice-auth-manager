from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()  # This loads env vars from .env file into os.environ


class Settings(BaseSettings):
    AUTH0_DOMAIN: str
    AUTH0_API_AUDIENCE: str
    AUTH0_CLIENT_ID: str
    AUTH0_CLIENT_SECRET: str

    DATABASE_URL: str = "sqlite:///./sessions.db"
    
    MAX_CONCURRENT_SESSIONS: int = 3
    
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()
