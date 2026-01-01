from pathlib import Path
from typing import List, Tuple
import torch
import clip
from PIL import Image
from utils.logger import setup_logger

logger = setup_logger("ImageSearch")

class ImageSearchEngine:
    def __init__(self, device: str = "cuda" if torch.cuda.is_available() else "cpu"):
        self.device = device
        self.model, self.preprocess = clip.load("ViT-B/32", device=self.device)
        self.image_embeddings = []
        self.image_paths = []
        logger.info(f"CLIP Image Search initialized on {self.device}")

    def add_image(self, image_path: str):
        img = self.preprocess(Image.open(image_path)).unsqueeze(0).to(self.device)
        with torch.no_grad():
            emb = self.model.encode_image(img)
        self.image_embeddings.append(emb)
        self.image_paths.append(image_path)
        logger.debug(f"Added image {image_path}")

    def search(self, query_image_path: str, top_k: int = 5) -> List[Tuple[str, float]]:
        query_img = self.preprocess(Image.open(query_image_path)).unsqueeze(0).to(self.device)
        with torch.no_grad():
            query_emb = self.model.encode_image(query_img)
        results = []
        for emb, path in zip(self.image_embeddings, self.image_paths):
            sim = torch.cosine_similarity(query_emb, emb)
            results.append((path, float(sim.item())))
        results.sort(key=lambda x: x[1], reverse=True)
        return results[:top_k]
