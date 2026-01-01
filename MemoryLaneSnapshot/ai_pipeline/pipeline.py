# ai_pipeline/pipeline.py
from typing import List
from pathlib import Path
import logging
from PyPDF2 import PdfReader
import asyncio
import shutil
from PIL import Image
import pytesseract  # For OCR on images
# Optional: add moviepy or other library for video captioning

from .preprocess import Preprocessor
from .classifier import Classifier
from .sentiment import SentimentAnalyzer
from .summarizer import Summarizer
from .keywords_embeddings import KeywordEmbedder
from .capture import save_content, is_allowed

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MemoryLanePipeline:
    """End-to-end AI pipeline for MemoryLaneSnapshot with automatic content capture for text, PDF, images, and videos."""

    IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"]
    VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi"]

    def __init__(self):
        self.preprocessor = Preprocessor()
        self.classifier = Classifier()
        self.sentiment_analyzer = SentimentAnalyzer()
        self.summarizer = Summarizer()
        self.embedder = KeywordEmbedder()
        logger.info("MemoryLaneSnapshot pipeline initialized!")

    def run(self, texts: List[str], source_url: str = None, content_type: str = "TEXT") -> dict:
        """Process texts through the full pipeline and save captured content if allowed."""
        logger.info("Starting pipeline...")
        clean_texts = self.preprocessor.preprocess(texts)
        classifications = self.classifier.predict(clean_texts)
        sentiments = self.sentiment_analyzer.analyze(clean_texts)
        summaries = self.summarizer.summarize(clean_texts)
        embeddings = self.embedder.embed(clean_texts)

        result = {
            "original_texts": texts,
            "clean_texts": clean_texts,
            "classifications": classifications,
            "sentiments": sentiments,
            "summaries": summaries,
            "embeddings": embeddings.tolist()
        }

        # Save captured content if URL/source is provided and allowed
        if source_url and is_allowed(source_url):
            for i, text in enumerate(clean_texts):
                save_content(text, source_url, content_type)

        return result

    async def process_file(self, file_path: Path) -> dict:
        """Process a single file asynchronously (text, PDF, image, video)."""
        content_type = "TEXT"
        source_url = str(file_path.resolve())
        text = ""

        # Text file
        if file_path.suffix.lower() == ".txt":
            text = file_path.read_text(encoding="utf-8")
            content_type = "TEXT"

        # PDF file
        elif file_path.suffix.lower() == ".pdf":
            reader = PdfReader(str(file_path))
            text = "\n".join([p.extract_text() for p in reader.pages if p.extract_text()])
            content_type = "PDF"

        # Image file
        elif file_path.suffix.lower() in self.IMAGE_EXTENSIONS:
            content_type = "IMAGE"
            # Copy image to captured folder
            dest = Path("data/captured/images") / file_path.name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(file_path, dest)
            # Extract text via OCR for summarization
            try:
                text = pytesseract.image_to_string(Image.open(file_path))
            except Exception as e:
                logger.warning(f"OCR failed: {e}")
                text = ""  # Empty if OCR fails
            # Save content
            save_content(None if not text else text, source_url, content_type, file_path=str(dest))

        # Video file
        elif file_path.suffix.lower() in self.VIDEO_EXTENSIONS:
            content_type = "VIDEO"
            # Copy video to captured folder
            dest = Path("data/captured/videos") / file_path.name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(file_path, dest)
            # Optional: extract audio & captions for summarization
            text = ""  # Placeholder, implement audio transcription later
            save_content(None if not text else text, source_url, content_type, file_path=str(dest))

        else:
            logger.warning(f"Unsupported file type: {file_path.suffix}")
            return {}

        # For TEXT/PDF/OCR extracted text, run the pipeline
        if text:
            result = self.run([text], source_url=source_url, content_type=content_type)
        else:
            result = {"summary": None, "content_type": content_type, "file_name": file_path.name}

        # Add file name for tracking
        result["file_name"] = file_path.name
        return result

if __name__ == "__main__":
    pipeline = MemoryLanePipeline()
    test_file = Path("data/articles/sample_article.txt")  # Change path to any file
    result = asyncio.run(pipeline.process_file(test_file))
    print(result)
