import pytest
from ai_pipeline.summarizer import Summarizer

@pytest.fixture
def summarizer():
    return Summarizer()

@pytest.mark.parametrize("text", [
    "Python is a programming language.",
    "AI is transforming the world."
])
def test_summarizer_output_nonempty(summarizer, text):
    summary = summarizer.summarize(text)
    assert isinstance(summary, str)
    assert len(summary) > 0

def test_summarize_empty_text(summarizer):
    assert summarizer.summarize("") == ""
