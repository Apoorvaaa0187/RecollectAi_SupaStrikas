from pathlib import Path
from typing import List, Tuple
from ai_pipeline.keywords_embeddings import KeywordEmbedder
from .faiss_index import FAISSIndex
from .image_search import ImageSearchEngine
from utils.logger import setup_logger

logger = setup_logger("SearchEngine")

class SearchEngine:
    def __init__(self, faiss_index_path: str):
        self.text_index = FAISSIndex(faiss_index_path)
        self.keyword_extractor = KeywordEmbedder()
        self.image_search = ImageSearchEngine()
        logger.info("High-level Search Engine initialized")

    # -----------------------------
    # Text Search
    # -----------------------------
    def search_text(self, query: str, top_k: int = 5) -> List[Tuple[str, float]]:
        vector = self.keyword_extractor.text_to_embedding(query)
        results = self.text_index.search(vector, top_k=top_k)
        logger.info(f"Text search completed for query: '{query}'")
        return results

    # -----------------------------
    # Image Search
    # -----------------------------
    def search_image(self, query_image_path: str, top_k: int = 5) -> List[Tuple[str, float]]:
        results = self.image_search.search(query_image_path, top_k=top_k)
        logger.info(f"Image search completed for {query_image_path}")
        return results
