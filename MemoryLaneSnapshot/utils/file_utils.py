import json
import csv
from pathlib import Path
from typing import Any, List, Dict
import pickle
from utils.logger import setup_logger

logger = setup_logger("file_utils")

def save_json(data: Any, path: Path):
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
        logger.debug(f"JSON saved to {path}")
    except Exception as e:
        logger.error(f"Failed to save JSON to {path}: {e}")

def load_json(path: Path) -> Any:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load JSON from {path}: {e}")
        return None

def save_csv(data: List[Dict[str, Any]], path: Path, headers: List[str]):
    try:
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(data)
        logger.debug(f"CSV saved to {path}")
    except Exception as e:
        logger.error(f"Failed to save CSV to {path}: {e}")

def load_processed_data(path: Path = None) -> List[Dict]:
    """Load processed pipeline data from default or custom path"""
    path = path or Path(__file__).parent.parent / "data" / "processed_data.json"
    data = load_json(path)
    return data if data else []

def save_pickle(obj: Any, path: Path):
    try:
        with open(path, "wb") as f:
            pickle.dump(obj, f)
        logger.debug(f"Pickle saved to {path}")
    except Exception as e:
        logger.error(f"Failed to save pickle to {path}: {e}")

def load_pickle(path: Path) -> Any:
    try:
        with open(path, "rb") as f:
            return pickle.load(f)
    except Exception as e:
        logger.error(f"Failed to load pickle from {path}: {e}")
        return None
