from flask import Flask, jsonify, request
import asyncio
from pathlib import Path
from ai_pipeline.pipeline import MemoryLanePipeline

app = Flask(__name__)
pipeline = MemoryLanePipeline()

@app.route('/')
def root():
    return jsonify({"message": "Welcome to MemoryLaneSnapshot Flask API. Use /predict for text processing or /process_file for file processing."})

@app.route('/predict', methods=['POST'])
def predict_single():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' field in JSON"}), 400
    text = data['text']
    try:
        result = pipeline.run([text])
        # Flatten the result since it's for single text
        response = {
            "clean_text": result["clean_texts"][0],
            "classification": result["classifications"][0],
            "sentiment": result["sentiments"][0],
            "summary": result["summaries"][0],
            "embedding": result["embeddings"][0]
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_batch', methods=['POST'])
def predict_batch():
    data = request.get_json()
    if not data or 'texts' not in data:
        return jsonify({"error": "Missing 'texts' field in JSON"}), 400
    texts = data['texts']
    if not isinstance(texts, list):
        return jsonify({"error": "'texts' must be a list"}), 400
    try:
        result = pipeline.run(texts)
        response = {
            "clean_texts": result["clean_texts"],
            "classifications": result["classifications"],
            "sentiments": result["sentiments"],
            "summaries": result["summaries"],
            "embeddings": result["embeddings"]
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/process_file', methods=['POST'])
def process_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    # Save the file temporarily
    temp_path = Path("temp_upload") / file.filename
    temp_path.parent.mkdir(exist_ok=True)
    file.save(temp_path)
    try:
        # Run async process_file
        result = asyncio.run(pipeline.process_file(temp_path))
        # Clean up temp file
        temp_path.unlink(missing_ok=True)
        return jsonify(result)
    except Exception as e:
        temp_path.unlink(missing_ok=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
