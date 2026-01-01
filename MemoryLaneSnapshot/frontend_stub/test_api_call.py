"""
Test API Call for MemoryLaneSnapshot AI Pipeline (Secured with API Key)
----------------------------------------------------------------------

This script sends sample texts to the secured FastAPI backend and prints structured results.
It safely handles cases where the API does not return valid JSON.
"""

import requests

# -----------------------------
# API Configuration
# -----------------------------
API_URL = "http://127.0.0.1:8000/api/predict"  # Single text endpoint
API_KEY = "SuperSecretKey123"                  # Same key as in your API
HEADERS = {"x-api-key": API_KEY}

# -----------------------------
# Sample texts
# -----------------------------
sample_texts = [
    "I had a wonderful day at the park!",
    "Debugging this project is exhausting...",
    "MemoryLaneSnapshot is amazing for AI projects!"
]

# -----------------------------
# Send requests to the API
# -----------------------------
for text in sample_texts:
    payload = {"text": text}
    response = requests.post(API_URL, json=payload, headers=HEADERS)
    
    print(f"\n===== Request for Text: {text} =====")
    print("Status Code:", response.status_code)
    
    try:
        result = response.json()  # Try parsing JSON
        print("Cleaned:", result['clean_texts'][0])
        print("Classification:", result['classifications'][0])
        print("Sentiment:", result['sentiments'][0])
        print("Summary:", result['summaries'][0])
        print("Embedding vector (first 5 dims):", result['embeddings'][0][:5])
    except Exception as e:
        print("Failed to decode JSON or API returned error.")
        print("Error:", e)
        print("Raw response text:", response.text)
