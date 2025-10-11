import pytest
import numpy as np
from search_engine.faiss_index import FAISSIndex
from pathlib import Path

@pytest.fixture
def index(tmp_path):
    return FAISSIndex(str(tmp_path / "faiss.index"), dim=8)

def test_add_and_search(index):
    vector = np.random.rand(1, 8).astype(np.float32)
    index.add_item("doc1.txt", vector)
    results = index.search(vector, top_k=1)
    assert results[0][0] == "doc1.txt"

def test_save_and_load(tmp_path):
    index = FAISSIndex(str(tmp_path / "faiss.index"), dim=8)
    vector = np.random.rand(1, 8).astype(np.float32)
    index.add_item("doc1.txt", vector)
    index.save()
    new_index = FAISSIndex(str(tmp_path / "faiss.index"), dim=8)
    results = new_index.search(vector, top_k=1)
    assert results[0][0] == "doc1.txt"
