from typing import List
from transformers import pipeline as hf_pipeline
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Summarizer:
    """State-of-the-art text summarization using transformers, now compatible with OCR/video text."""

    def __init__(self, model_name: str = "facebook/bart-large-cnn"):
        logger.info("Loading summarization model...")
        self.model = hf_pipeline("summarization", model=model_name)
        logger.info("Summarization model loaded!")

    def summarize(self, texts: List[str], max_length: int = 150, min_length: int = 40, content_type: str = "TEXT") -> List[str]:
        summaries = []
        for text in texts:
            if not text or text.strip() == "":
                # Handle empty OCR/video text
                if content_type == "IMAGE":
                    summaries.append("Image summary unavailable or no readable text found.")
                elif content_type == "VIDEO":
                    summaries.append("Video summary unavailable or no transcript extracted.")
                else:
                    summaries.append("No content to summarize.")
                continue

            # Generate summary using transformers
            summary_text = self.model(text, max_length=max_length, min_length=min_length)[0]["summary_text"]

            # Optional prefix for clarity
            if content_type == "IMAGE":
                summary_text = f"Image Summary: {summary_text}"
            elif content_type == "VIDEO":
                summary_text = f"Video Summary: {summary_text}"

            summaries.append(summary_text)

        return summaries


if __name__ == "__main__":
    sumr = Summarizer()
    test_text = ["Artificial intelligence is transforming the world in many ways."]
    print(sumr.summarize(test_text))
