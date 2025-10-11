# ai_pipeline/capture.py
import os
import pickle
from datetime import datetime

# Sites or apps the user wants to block
BLOCKED_SITES = ["facebook.com", "private_chat_app"]

def is_allowed(url: str) -> bool:
    """Check if a URL is allowed for capture"""
    return not any(site in url for site in BLOCKED_SITES)

def save_content(content=None, source_url: str = None, content_type: str = "TEXT", file_path: str = None):
    """
    Save captured content + metadata locally.
    
    - TEXT/PDF: content param required
    - IMAGE/VIDEO: file_path param required
    """
    if not source_url:
        raise ValueError("source_url must be provided")
    if not is_allowed(source_url):
        print(f"[INFO] Skipped blocked site: {source_url}")
        return

    data = {
        "url": source_url,
        "timestamp": datetime.now(),
        "type": content_type
    }

    if content_type in ["TEXT", "PDF"]:
        if content is None:
            raise ValueError("content must be provided for TEXT/PDF")
        data["content"] = content
    elif content_type in ["IMAGE", "VIDEO"]:
        if not file_path:
            raise ValueError("file_path must be provided for IMAGE/VIDEO")
        data["file_path"] = file_path
    else:
        raise ValueError(f"Unsupported content_type: {content_type}")

    # Create captured directory if not exists
    os.makedirs("data/captured", exist_ok=True)

    # Save as pickle file
    file_name = f"data/captured/{datetime.now().timestamp()}.pkl"
    with open(file_name, "wb") as f:
        pickle.dump(data, f)

    print(f"[INFO] Content saved: {file_name}")
