# ai_pipeline/search_api.py
import os
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
import base64
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import pickle
from ai_pipeline.indexer import Indexer

app = FastAPI(title="MemoryLane Search API")

# load models for query
TEXT_QUERY_MODEL = SentenceTransformer(os.environ.get("EMBED_MODEL_NAME", "all-MiniLM-L6-v2"))
IMG_QUERY_MODEL = SentenceTransformer(os.environ.get("IMG_MODEL_NAME", "clip-ViT-B-32"))

# load index (global or per-user)
INDEX_DIR = os.environ.get("VECTOR_INDEX_DIR", "./vector_index")
indexer = Indexer(user_id=None)  # or set user_id dynamically

# load cross-encoder for reranking (optional)
try:
    from sentence_transformers import CrossEncoder
    reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
except Exception:
    reranker = None

class SearchResult(BaseModel):
    content_id: str
    title: str
    url: str
    snippet: str
    score: float
    timestamp: Optional[str]

@app.post("/search/text", response_model=List[SearchResult])
async def search_text(q: str = Form(...), k: int = Form(10)):
    q_emb = TEXT_QUERY_MODEL.encode(q, convert_to_numpy=True, normalize_embeddings=True).astype(np.float32)
    # search FAISS
    D, I = indexer.index.search(np.expand_dims(q_emb, axis=0), k)
    results = []
    for score, idx in zip(D[0], I[0]):
        if idx == -1:
            continue
        meta = indexer.metadata.get(str(int(idx)))
        if not meta:
            continue
        results.append({
            "content_id": meta["content_id"],
            "title": meta["title"],
            "url": meta["url"],
            "snippet": meta["snippet"],
            "score": float(score),
            "timestamp": str(meta.get("timestamp"))
        })

    # optional re-ranking
    if reranker and results:
        pairs = [ (q, r["snippet"] + " " + r["title"]) for r in results ]
        scores = reranker.predict([p[0]+" \t "+p[1] for p in pairs])
        # attach new scores and sort
        for r, s in zip(results, scores):
            r["score"] = float(s)
        results = sorted(results, key=lambda x: x["score"], reverse=True)
    return results

@app.post("/search/image", response_model=List[SearchResult])
async def search_image(file: UploadFile = File(...), k: int = Form(10)):
    b = await file.read()
    # convert to PIL and embed
    import io
    from PIL import Image
    img = Image.open(io.BytesIO(b)).convert("RGB")
    q_emb = IMG_QUERY_MODEL.encode(img, convert_to_numpy=True, normalize_embeddings=True).astype(np.float32)
    D, I = indexer.index.search(np.expand_dims(q_emb, axis=0), k)
    results = []
    for score, idx in zip(D[0], I[0]):
        if idx == -1:
            continue
        meta = indexer.metadata.get(str(int(idx)))
        if not meta:
            continue
        results.append({
            "content_id": meta["content_id"],
            "title": meta["title"],
            "url": meta["url"],
            "snippet": meta["snippet"],
            "score": float(score),
            "timestamp": str(meta.get("timestamp"))
        })
    # rerank if wanted (use CLIP text generated from image? or skip)
    return results

@app.post("/index/reindex")
async def reindex():
    indexer.index_all()
    return {"status": "ok"}
