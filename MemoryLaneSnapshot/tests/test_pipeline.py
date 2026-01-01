import pytest
from pathlib import Path
from ai_pipeline.pipeline import AIPipeline

@pytest.fixture
def pipeline():
    return AIPipeline()

def test_pipeline_process_file(tmp_path, pipeline):
    dummy_file = tmp_path / "dummy.txt"
    dummy_file.write_text("Pipeline test content.")
    result = pipeline.process_file(dummy_file)
    assert "text" in result
    assert "summary" in result
    assert "sentiment" in result
    assert "keywords" in result

@pytest.mark.asyncio
async def test_pipeline_async(tmp_path):
    pipeline = AIPipeline()
    dummy_file = tmp_path / "async.txt"
    dummy_file.write_text("Async pipeline test content.")
    result = await pipeline.process_file(dummy_file)
    assert "text" in result
