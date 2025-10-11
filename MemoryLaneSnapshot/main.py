import asyncio
import time
import argparse
import keras
import tf_keras
from pathlib import Path
from utils.logger import setup_logger
from utils.file_utils import save_json, load_processed_data
from scripts.run_pipeline import gather_files, process_file
from scripts.generate_report import generate_summary_report
from scripts.update_index import update_faiss_index
from search_engine.search import SearchEngine
from ai_pipeline.pipeline import MemoryLanePipeline
from config import FAISS_INDEX_PATH, REPORTS_DIR, DEFAULT_TOP_K, DEVICE

logger = setup_logger("MegaMain")

# -----------------------------
# Pipeline Task
# -----------------------------
async def pipeline_task(dry_run=False):
    from ai_pipeline.pipeline import MemoryLanePipeline
    pipeline = MemoryLanePipeline()
    files = gather_files()
    logger.info(f"Found {len(files)} files to process.")
    tasks = [process_file(f, pipeline) for f in files]
    results = await asyncio.gather(*tasks)
    processed_data = [r for r in results if r is not None]
    logger.info(f"Pipeline completed: {len(processed_data)} files processed.")
    if dry_run:
        logger.info("Dry-run mode: Skipping saving pipeline results.")
    return processed_data

# -----------------------------
# Report Task
# -----------------------------
async def report_task(processed_data, dry_run=False):
    if not processed_data:
        logger.warning("No data for report generation.")
        return None
    report = generate_summary_report(processed_data)
    REPORTS_DIR.mkdir(exist_ok=True)
    report_path = REPORTS_DIR / "report_latest.json"
    if not dry_run:
        save_json(report, report_path)
        logger.info(f"Report saved at {report_path}")
    return report_path

# -----------------------------
# FAISS Update Task
# -----------------------------
async def faiss_task(processed_data, dry_run=False):
    if not processed_data:
        logger.warning("No data for FAISS index update.")
        return
    if dry_run:
        logger.info("Dry-run mode: Skipping FAISS index update.")
        return
    update_faiss_index(processed_data)
    logger.info("FAISS index updated successfully.")

# -----------------------------
# Interactive Search Shell
# -----------------------------
def interactive_search(search_engine):
    logger.info("Entering interactive search mode. Type 'exit' to quit.")
    while True:
        query = input("Enter text query or 'img:<path>' for image search: ").strip()
        if query.lower() in ["exit", "quit"]:
            logger.info("Exiting interactive search shell.")
            break
        if query.startswith("img:"):
            img_path = query[4:].strip()
            if Path(img_path).exists():
                results = search_engine.search_image(img_path, top_k=DEFAULT_TOP_K)
                print("Image Search Results:", results)
            else:
                print("Image not found:", img_path)
        else:
            results = search_engine.search_text(query, top_k=DEFAULT_TOP_K)
            print("Text Search Results:", results)

# -----------------------------
# Main Mega Runner
# -----------------------------
async def main(skip_pipeline=False, skip_report=False, skip_index=False, dry_run=False, interactive=False):
    start_time = time.time()
    processed_data = []

    # Run pipeline first (if not skipped)
    if not skip_pipeline:
        processed_data = await pipeline_task(dry_run=dry_run)

    # Run report & FAISS in parallel
    tasks = []
    if not skip_report:
        tasks.append(report_task(processed_data, dry_run=dry_run))
    if not skip_index:
        tasks.append(faiss_task(processed_data, dry_run=dry_run))
    if tasks:
        await asyncio.gather(*tasks)

    # Prepare search engine
    search_engine = SearchEngine(str(FAISS_INDEX_PATH))
    logger.info(f"Search engine ready on device: {DEVICE}")

    elapsed = time.time() - start_time
    logger.info(f"MemoryLaneSnapshot execution finished in {elapsed:.2f}s")

    # Interactive search if requested
    if interactive:
        interactive_search(search_engine)

    return search_engine

# -----------------------------
# CLI Interface
# -----------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MemoryLaneSnapshot Mega Runner")
    parser.add_argument("--skip-pipeline", action="store_true", help="Skip AI pipeline")
    parser.add_argument("--skip-report", action="store_true", help="Skip report generation")
    parser.add_argument("--skip-index", action="store_true", help="Skip FAISS index update")
    parser.add_argument("--dry-run", action="store_true", help="Simulate without saving changes")
    parser.add_argument("--interactive", action="store_true", help="Launch interactive search shell after run")
    args = parser.parse_args()

    asyncio.run(main(
        skip_pipeline=args.skip_pipeline,
        skip_report=args.skip_report,
        skip_index=args.skip_index,
        dry_run=args.dry_run,
        interactive=args.interactive
    ))
