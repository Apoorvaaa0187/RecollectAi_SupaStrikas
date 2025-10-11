import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = Path(__file__).parent.parent / "logs"
LOG_DIR.mkdir(exist_ok=True)

def setup_logger(name: str, level=logging.INFO) -> logging.Logger:
    """
    Set up a logger with rotating file handler.
    """
    logger = logging.getLogger(name)
    if logger.hasHandlers():
        return logger  # Avoid duplicate handlers

    logger.setLevel(level)
    
    # Console handler
    ch = logging.StreamHandler()
    ch.setLevel(level)
    ch_formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] %(name)s: %(message)s")
    ch.setFormatter(ch_formatter)
    
    # File handler
    fh = RotatingFileHandler(LOG_DIR / f"{name}.log", maxBytes=5_000_000, backupCount=5)
    fh.setLevel(level)
    fh.setFormatter(ch_formatter)
    
    logger.addHandler(ch)
    logger.addHandler(fh)
    return logger
