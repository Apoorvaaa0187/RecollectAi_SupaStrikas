import pytest
from search_engine.image_search import ImageSearchEngine
from PIL import Image
import torch

@pytest.fixture
def image_search(tmp_path):
    engine = ImageSearchEngine(device="cpu")
    # create dummy images
    img_path = tmp_path / "img1.png"
    Image.new("RGB", (64, 64), color="red").save(img_path)
    engine.add_image(str(img_path))
    return engine, img_path

def test_image_search_results(image_search):
    engine, img_path = image_search
    results = engine.search(str(img_path), top_k=1)
    assert len(results) == 1
    assert results[0][0] == str(img_path)
    assert isinstance(results[0][1], float)
