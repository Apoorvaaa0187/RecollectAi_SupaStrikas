import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict

from ai_pipeline.sentiment import SentimentAnalyzer
from ai_pipeline.keywords_embeddings import KeywordsExtractor
from ai_pipeline.summarizer import Summarizer
from utils.file_utils import load_processed_data, save_json
from utils.logger import setup_logger

logger = setup_logger("generate_report")

REPORT_DIR = Path(__file__).parent.parent / "reports"
REPORT_DIR.mkdir(parents=True, exist_ok=True)  # fixed

def generate_summary_report(processed_data: List[Dict]) -> Dict:
    """Aggregate processed data into a comprehensive report."""
    sentiment_analyzer = SentimentAnalyzer()
    summarizer = Summarizer()
    keyword_extractor = KeywordsExtractor()

    report = {
        "generated_at": datetime.utcnow().isoformat(),
        "total_documents": len(processed_data),
        "documents": []
    }

    for doc in processed_data:
        text = " ".join(doc.get("clean_texts", []))  # fixed
        summary = summarizer.summarize([text])
        sentiment = sentiment_analyzer.analyze([text])
        keywords = keyword_extractor.extract_keywords(text)

        report["documents"].append({
            "file_name": doc.get("file_name"),
            "summary": summary,
            "sentiment": sentiment,
            "keywords": keywords
        })

    logger.info("Report generation completed")
    return report

if __name__ == "__main__":
    processed_data = load_processed_data()
    report = generate_summary_report(processed_data)
    report_path = REPORT_DIR / f"report_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json"
    save_json(report, report_path)
    logger.info(f"Report saved at {report_path}")
