import os
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
from typing import List, Dict
from PIL import Image
import io
import base64
from pymongo import MongoClient
from ai_pipeline import config  # import DB_URL, DB_NAME, CONTENT_COLLECTION, etc.

INDEX_DIR = os.environ.get("VECTOR_INDEX_DIR", "./vector_index")
os.makedirs(INDEX_DIR, exist_ok=True)

EMBED_MODEL_NAME = os.environ.get("EMBED_MODEL_NAME", "all-MiniLM-L6-v2")
IMG_MODEL_NAME = os.environ.get("IMG_MODEL_NAME", "clip-ViT-B-32")


class Indexer:
    def __init__(self, user_id: str = None):
        self.user_id = user_id
        # MongoDB connection
        self.client = MongoClient(config.DB_URL)
        self.db = self.client[config.DB_NAME]
        self.collection = self.db[config.CONTENT_COLLECTION]

        # Embedding models
        self.text_model = SentenceTransformer(EMBED_MODEL_NAME)
        self.img_model = SentenceTransformer(IMG_MODEL_NAME)
        self.dim = self.text_model.get_sentence_embedding_dimension()

        # FAISS paths
        self.index_path = os.path.join(INDEX_DIR, f"faiss_{user_id or 'global'}.index")
        self.meta_path = os.path.join(INDEX_DIR, f"meta_{user_id or 'global'}.pkl")

        # load existing index or create new
        self._load_index()

    def _load_index(self):
        if os.path.exists(self.index_path) and os.path.exists(self.meta_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.meta_path, "rb") as f:
                self.metadata = pickle.load(f)
            print("Loaded existing index:", self.index_path)
        else:
            self.index = faiss.IndexIDMap(faiss.IndexFlatIP(self.dim))
            self.metadata = {}
            print("Created new index")

    def _fetch_new_rows(self) -> List[Dict]:
        """Fetch content from MongoDB that is not yet indexed"""
        seen_content_ids = set([v["content_id"] for v in self.metadata.values()])  # already indexed

        query = {"user_id": self.user_id} if self.user_id else {}
        all_rows = list(self.collection.find(query))

        new_rows = []
        for r in all_rows:
            cid = str(r["content_id"])
            if cid not in seen_content_ids:
                new_rows.append({
                    "content_id": cid,
                    "text": r.get("text") or "",
                    "title": r.get("title") or "",
                    "url": r.get("url"),
                    "image_base64": r.get("image_base64"),
                    "timestamp": r.get("timestamp")
                })
        return new_rows

    def _embed_texts(self, texts: List[str]) -> np.ndarray:
        embs = self.text_model.encode(texts, convert_to_numpy=True, show_progress_bar=False, normalize_embeddings=True)
        return embs

    def _embed_images(self, images_base64: List[str]) -> np.ndarray:
        imgs = []
        for b64 in images_base64:
            if not b64:
                imgs.append(None)
                continue
            img_bytes = base64.b64decode(b64)
            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
            imgs.append(img)

        vectors = []
        for img in imgs:
            if img is None:
                vectors.append(np.zeros(self.img_model.get_sentence_embedding_dimension(), dtype=np.float32))
            else:
                vectors.append(self.img_model.encode(img, convert_to_numpy=True, normalize_embeddings=True))
        return np.vstack(vectors)

    def index_all(self):
        new_rows = self._fetch_new_rows()
        if not new_rows:
            print("No new rows to index.")
            return

        texts = [(r["title"] + " " + r["text"])[:2000] for r in new_rows]
        text_embs = self._embed_texts(texts)
        images_b64 = [r.get("image_base64") for r in new_rows]
        img_embs = self._embed_images(images_b64)

        # combine embeddings (average)
        combined = (text_embs + img_embs[:, :self.dim]) / 2.0

        n = combined.shape[0]
        start_id = max([int(k) for k in self.metadata.keys()]) + 1 if self.metadata else 1
        ids = np.arange(start_id, start_id + n).astype(np.int64)

        # add to FAISS
        vectors = combined.astype(np.float32)
        self.index.add_with_ids(vectors, ids)

        # update metadata
        for idx, r in enumerate(new_rows):
            self.metadata[str(ids[idx])] = {
                "content_id": r["content_id"],
                "title": r["title"],
                "url": r["url"],
                "timestamp": r["timestamp"],
                "snippet": r["text"][:300]
            }

        # persist
        faiss.write_index(self.index, self.index_path)
        with open(self.meta_path, "wb") as f:
            pickle.dump(self.metadata, f)
        print(f"Indexed {n} items. Saved index to {self.index_path}")

    def rebuild_index(self):
        """Clear and rebuild from scratch"""
        self.index = faiss.IndexIDMap(faiss.IndexFlatIP(self.dim))
        self.metadata = {}
        self.index_all()
        print("Rebuilt FAISS index from MongoDB.")
