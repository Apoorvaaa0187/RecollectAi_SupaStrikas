import asyncio
import logging
from pathlib import Path
from typing import List

from ai_pipeline.pipeline import MemoryLanePipeline
from utils.logger import setup_logger

# -----------------------------
# Logging setup
# -----------------------------
logger = setup_logger("run_pipeline")

# -----------------------------
# Configuration
# -----------------------------
DATA_DIR = Path(__file__).parent.parent / "data"
ARTICLES_DIR = DATA_DIR / "articles"
PDFS_DIR = DATA_DIR / "pdfs"
TRANSCRIPTS_DIR = DATA_DIR / "transcripts"

# -----------------------------
# Helper functions
# -----------------------------
def gather_files() -> List[Path]:
    """Collect all data files from articles, PDFs, and transcripts."""
    files = []
    for folder in [ARTICLES_DIR, PDFS_DIR, TRANSCRIPTS_DIR]:
        files.extend(folder.glob("**/*.*"))
    logger.info(f"Found {len(files)} files to process.")
    return files

async def process_file(file_path: Path, pipeline: MemoryLanePipeline):
    """Process a single file asynchronously."""
    try:
        logger.debug(f"Processing file: {file_path}")
        result = await pipeline.process_file(file_path)
        logger.info(f"Processed {file_path.name} successfully")
        return result
    except Exception as e:
        logger.error(f"Error processing {file_path}: {e}")
        return None

# -----------------------------
# Main async runner
# -----------------------------
async def main():
    pipeline = MemoryLanePipeline()
    files = gather_files()
    tasks = [process_file(f, pipeline) for f in files]
    results = await asyncio.gather(*tasks)
    logger.info("Pipeline execution completed for all files.")

if __name__ == "__main__":
    asyncio.run(main())
