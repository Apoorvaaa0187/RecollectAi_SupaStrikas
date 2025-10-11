from pathlib import Path
from typing import Any
import pickle
import threading
from utils.logger import setup_logger

logger = setup_logger("cache")
_lock = threading.Lock()

class Cache:
    def __init__(self, cache_dir: Path = None):
        self.cache_dir = cache_dir or Path(__file__).parent.parent / "cache"
        self.cache_dir.mkdir(exist_ok=True)
        self.store = {}

    def set(self, key: str, value: Any):
        with _lock:
            self.store[key] = value
            try:
                with open(self.cache_dir / f"{key}.pkl", "wb") as f:
                    pickle.dump(value, f)
                logger.debug(f"Cached {key} successfully")
            except Exception as e:
                logger.error(f"Failed to cache {key}: {e}")

    def get(self, key: str) -> Any:
        with _lock:
            if key in self.store:
                return self.store[key]
            path = self.cache_dir / f"{key}.pkl"
            if path.exists():
                try:
                    with open(path, "rb") as f:
                        value = pickle.load(f)
                    self.store[key] = value
                    return value
                except Exception as e:
                    logger.error(f"Failed to load cached {key}: {e}")
        return None

    def clear(self):
        with _lock:
            self.store.clear()
            for file in self.cache_dir.glob("*.pkl"):
                try:
                    file.unlink()
                except Exception as e:
                    logger.error(f"Failed to remove cache file {file}: {e}")
            logger.info("Cache cleared")
