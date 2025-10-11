# classifier.py
from typing import List
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Classifier:
    """High-performance text classifier using HuggingFace Transformers."""
    
    def __init__(self, model_name: str = "distilbert-base-uncased-finetuned-sst-2-english"):
        logger.info("Loading classification model...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.model.eval()
        logger.info("Model loaded successfully!")

    def predict(self, texts: List[str]) -> List[str]:
        """Classify a list of texts."""
        inputs = self.tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            logits = self.model(**inputs).logits
        predictions = logits.argmax(dim=1).tolist()
        return [self.model.config.id2label[pred] for pred in predictions]

if __name__ == "__main__":
    clf = Classifier()
    print(clf.predict(["I love AI!", "I hate bugs..."]))
