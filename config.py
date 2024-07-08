import os
from dotenv import load_dotvm

load_dotenv()

class Config:
    SERVER_PORT = os.getenv("SERVER_PORT", 5000)
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///default.db")

config = Config()