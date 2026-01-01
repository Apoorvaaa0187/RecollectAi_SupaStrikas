import pytest
from ai_pipeline.preprocess import clean_text

@pytest.mark.parametrize("input_text,expected_substring", [
    ("Hello, World!", "hello world"),
    ("Python is GREAT.", "python is great"),
    ("", "")
])
def test_clean_text_param(input_text, expected_substring):
    assert clean_text(input_text) == expected_substring
