import logging
import os
from dotenv import load_dotenv

load_dotenv()

LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO').upper()
LOG_FORMAT = os.getenv('LOG_FORMAT', '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
LOG_DATE_FORMAT = os.getenv('LOG_DATEFMT', '%Y-%m-%d %H:%M:%S')
LOG_FILE_NAME = os.getenv('LOG_FILENAME', 'cryptolend.log')

logger = logging.getLogger('CryptoLendLogger')
logger.setLevel(LOG_LEVEL)

if not logger.handlers:
    file_handler = logging.FileHandler(LOG_FILE_NAME)
    stream_handler = logging.StreamHandler()

    file_handler.setLevel(LOG_LEVEL)
    stream_handler.setLevel(LOG_LEVEL)

    formatter = logging.Formatter(LOG_FORMAT, datefmt=LOG_DATE_FORMAT)
    file_handler.setFormatter(formatter)
    stream_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)