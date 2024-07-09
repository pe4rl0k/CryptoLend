import os
import sys
from dotenv import load_dotenv

try:
    load_dotenv()
except Exception as e:
    print(f"Error loading the .env file: {e}")
    sys.exit(1)

class Config:
    def __init__(self):
        self.SERVER_PORT = self.get_env_variable("SERVER_PORT", 5000)
        self.DATABASE_URL = self.get_env_variable("DATABASE_URL", "sqlite:///default.db")

    @staticmethod
    def get_env_variable(name, default):
        try:
            return os.getenv(name, default)
        except KeyError:
            print(f"Warning: '{name}' is not set in the environment; using default ('{default}').")
            return default
        except Exception as e:
            print(f"Unexpected error while accessing '{success-message}': {e}")
            return default

    def setup_database(self):
        try:
            pass
        except Exception as e:
            print(f"Database connection error: {e}")

config = Config()

if __name__ == "__main__":
    print(f"Server will run on port: {config.SERVER_PORT}")