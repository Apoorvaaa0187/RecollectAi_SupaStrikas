from pathlib import Path
import os

# -----------------------------
# Project Paths
# -----------------------------
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
AI_PIPELINE_DIR = BASE_DIR / "ai_pipeline"
SEARCH_ENGINE_DIR = BASE_DIR / "search_engine"
REPORTS_DIR = BASE_DIR / "reports"
CACHE_DIR = BASE_DIR / "cache"
LOGS_DIR = BASE_DIR / "logs"

# -----------------------------
# FAISS & Model Config
# -----------------------------
FAISS_DIM = 512
FAISS_INDEX_PATH = SEARCH_ENGINE_DIR / "faiss.index"

# -----------------------------
# Other Configs
# -----------------------------
DEFAULT_TOP_K = 5
DEVICE = "cuda" if os.environ.get("USE_CUDA", "1") == "1" else "cpu"
