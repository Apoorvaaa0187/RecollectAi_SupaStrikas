# preprocess.py
import re
from typing import List
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")

STOP_WORDS = set(stopwords.words("english"))

class Preprocessor:
    """Text preprocessing: cleaning, tokenization, and normalization."""

    @staticmethod
    def clean_text(text: str) -> str:
        """Remove unwanted characters, punctuation, and lower the text."""
        text = re.sub(r"[^\w\s]", "", text)
        return text.lower().strip()

    @staticmethod
    def remove_stopwords(text: str) -> str:
        tokens = text.split()
        return " ".join([word for word in tokens if word not in STOP_WORDS])

    def preprocess(self, texts: List[str]) -> List[str]:
        return [self.remove_stopwords(self.clean_text(t)) for t in texts]

if __name__ == "__main__":
    pre = Preprocessor()
    print(pre.preprocess(["Hello World! This is AI."]))
