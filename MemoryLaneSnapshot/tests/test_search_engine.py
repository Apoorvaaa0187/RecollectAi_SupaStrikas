import pytest
from search_engine.search import SearchEngine
from unittest.mock import patch
import numpy as np

@pytest.fixture
def search_engine(tmp_path):
    # Initialize SearchEngine with mock FAISS path
    return SearchEngine(str(tmp_path / "faiss.index"))

@patch("ai_pipeline.keywords_embeddings.KeywordsExtractor.text_to_embedding")
def test_search_text(mock_embedding, search_engine):
    mock_embedding.return_value = np.random.rand(512)
    results = search_engine.search_text("test query", top_k=2)
    assert isinstance(results, list)

@patch("search_engine.image_search.ImageSearchEngine.search")
def test_search_image(mock_search, search_engine):
    mock_search.return_value = [("img1.png", 0.99)]
    results = search_engine.search_image("query.png", top_k=1)
    assert results[0][0] == "img1.png"
    assert results[0][1] == 0.99
