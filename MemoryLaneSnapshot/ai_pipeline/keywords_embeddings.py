# keywords_embeddings.py
from typing import List
from sentence_transformers import SentenceTransformer
import numpy as np
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KeywordEmbedder:
    """Generates embeddings for text using sentence-transformers."""
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        logger.info("Loading embedding model...")
        self.model = SentenceTransformer(model_name)
        logger.info("Embedding model loaded!")

    def embed(self, texts: List[str]) -> np.ndarray:
        """Return embeddings for a list of texts."""
        return self.model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)

    def text_to_embedding(self, text: str) -> np.ndarray:
        """Get embedding for a single text."""
        return self.embed([text])[0]

    def similarity(self, text1: str, text2: str) -> float:
        """Compute cosine similarity between two texts."""
        emb1, emb2 = self.embed([text1, text2])
        return float(np.dot(emb1, emb2))

class KeywordsExtractor:
    """Extract keywords and embeddings for a text."""
    def __init__(self):
        self.embedder = KeywordEmbedder()

    def extract_keywords(self, text: str, top_k: int = 5) -> List[str]:
        """Simple keyword extraction: return first `top_k` unique words."""
        words = list(dict.fromkeys(text.lower().split()))
        return words[:top_k]

    def text_to_embedding(self, text: str) -> np.ndarray:
        """Return embedding vector for a single text."""
        return self.embedder.text_to_embedding(text)

if __name__ == "__main__":
    # Quick test
    emb = KeywordEmbedder()
    print("Similarity:", emb.similarity("AI is amazing", "Machine learning rocks"))

    extractor = KeywordsExtractor()
    print("Keywords:", extractor.extract_keywords("AI is amazing and machine learning rocks"))
    print("Embedding shape:", extractor.text_to_embedding("Test text").shape)
