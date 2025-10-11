# sentiments.py
from typing import List
from transformers import pipeline as hf_pipeline
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    """High-performance sentiment analyzer using HuggingFace pipelines."""

    def __init__(self, model_name: str = "distilbert-base-uncased-finetuned-sst-2-english"):
        logger.info("Loading sentiment analysis model...")
        self.model = hf_pipeline("sentiment-analysis", model=model_name)
        logger.info("Sentiment model loaded!")

    def analyze(self, texts: List[str]) -> List[dict]:
        return self.model(texts)

if __name__ == "__main__":
    sa = SentimentAnalyzer()
    print(sa.analyze(["I love AI!", "I hate bugs..."]))
