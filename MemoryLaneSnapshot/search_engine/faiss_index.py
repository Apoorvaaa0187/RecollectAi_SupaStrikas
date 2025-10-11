import faiss
import numpy as np
import pickle
from pathlib import Path
from typing import List, Tuple
from utils.logger import setup_logger
from sklearn.preprocessing import normalize

logger = setup_logger("FAISSIndex")

class FAISSIndex:
    def __init__(self, index_path: str, dim: int = 384):  # fixed embedding dimension
        """
        Initialize FAISS index.
        :param index_path: Path to save/load the FAISS index
        :param dim: Dimension of embeddings
        """
        self.index_path = Path(index_path)
        self.dim = dim
        self.index = None
        self.id_map = {}  # Map vector id -> file_name
        self.next_id = 0  # Track internal IDs

        if self.index_path.exists():
            self.load()
        else:
            self.index = faiss.IndexFlatL2(dim)  # Use L2 for normalized vectors
            logger.info("Created new FAISS index")

    def add_item(self, file_name: str, embedding: np.ndarray):
        """Add a new embedding or batch of embeddings to the index."""
        if embedding.ndim == 1:
            embedding = embedding.reshape(1, -1)

        # Normalize embeddings for cosine similarity
        embedding = normalize(embedding, axis=1).astype(np.float32)

        self.index.add(embedding)
        for _ in range(embedding.shape[0]):
            self.id_map[self.next_id] = file_name
            self.next_id += 1
        logger.debug(f"Added embedding(s) for {file_name}")

    def search(self, query_vector: np.ndarray, top_k: int = 5) -> List[Tuple[str, float]]:
        """Search for top-k nearest neighbors using cosine similarity, returning Python floats."""
        if query_vector.ndim == 1:
            query_vector = query_vector.reshape(1, -1)

        # Normalize query vector
        query_vector = normalize(query_vector, axis=1).astype(np.float32)

        # Search against all embeddings to handle duplicates
        distances, indices = self.index.search(query_vector, self.index.ntotal)
        temp_results = {}

        for dist, idx in zip(distances[0], indices[0]):
            file_name = self.id_map.get(idx, "Unknown")
            # Convert L2 distance to cosine similarity: cosine_sim = 1 - 0.5 * L2^2
            cosine_sim = max(0.0, 1 - 0.5 * dist ** 2)
            # Keep max similarity for duplicate files
            if file_name not in temp_results or cosine_sim > temp_results[file_name]:
                temp_results[file_name] = float(cosine_sim)  # Convert to plain float

        # Sort by similarity descending and take top_k
        sorted_results = sorted(temp_results.items(), key=lambda x: x[1], reverse=True)[:top_k]
        return sorted_results

    def save(self):
        """Save FAISS index and ID map."""
        faiss.write_index(self.index, str(self.index_path))
        with open(self.index_path.with_suffix(".pkl"), "wb") as f:
            pickle.dump(self.id_map, f)
        logger.info(f"FAISS index saved to {self.index_path}")

    def load(self):
        """Load FAISS index and ID map."""
        self.index = faiss.read_index(str(self.index_path))
        with open(self.index_path.with_suffix(".pkl"), "rb") as f:
            self.id_map = pickle.load(f)
        self.next_id = max(self.id_map.keys(), default=-1) + 1
        logger.info(f"FAISS index loaded from {self.index_path}")
