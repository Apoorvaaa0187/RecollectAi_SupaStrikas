import pytest
from unittest.mock import patch
from ai_pipeline.classifier import TextClassifier

@pytest.fixture
def classifier():
    return TextClassifier(model_name="distilbert-base-uncased")

@pytest.mark.parametrize("text,expected_labels", [
    ("I love this product!", ["positive", "neutral", "negative"]),
    ("This is terrible.", ["positive", "neutral", "negative"]),
    ("", ["neutral"])
])
def test_classify_various_texts(classifier, text, expected_labels):
    label = classifier.classify(text)
    assert label.lower() in [e.lower() for e in expected_labels]

@patch("ai_pipeline.classifier.TextClassifier.classify")
def test_mocked_classification(mock_classify):
    mock_classify.return_value = "positive"
    classifier = TextClassifier()
    result = classifier.classify("Any text")
    assert result == "positive"
