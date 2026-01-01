from pathlib import Path
from typing import List
import numpy as np

from ai_pipeline.keywords_embeddings import KeywordEmbedder
from search_engine.faiss_index import FAISSIndex
from utils.file_utils import load_processed_data
from utils.logger import setup_logger

logger = setup_logger("update_index")

INDEX_PATH = Path(__file__).parent.parent / "search_engine" / "faiss.index"

def update_faiss_index(processed_data: List[dict]):
    """Update FAISS index with embeddings from processed data."""
    extractor = KeywordEmbedder()
    faiss_index = FAISSIndex(str(INDEX_PATH), dim=384)  # fixed dimension

    for doc in processed_data:
        # Join clean_texts for embedding
        text = " ".join(doc.get("clean_texts", []))
        embeddings = extractor.text_to_embedding(text)
        faiss_index.add_item(doc.get("file_name"), embeddings)
        logger.debug(f"Added embeddings for {doc.get('file_name')}")

    faiss_index.save()
    logger.info("FAISS index updated successfully")

if __name__ == "__main__":
    processed_data = load_processed_data()
    update_faiss_index(processed_data)
