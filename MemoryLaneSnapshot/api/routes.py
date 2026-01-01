from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from ai_pipeline.pipeline import MemoryLanePipeline
from api.models import TextInput, TextListInput, PipelineResponse

# -----------------------------
# API Key setup
# -----------------------------
API_KEY_NAME = "x-api-key"
API_KEY = "SuperSecretKey123"  # For production, load from environment
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

async def get_api_key(api_key: str = Security(api_key_header)):
    if api_key == API_KEY:
        return api_key
    else:
        raise HTTPException(status_code=403, detail="Could not validate API key")

# -----------------------------
# Router and pipeline
# -----------------------------
router = APIRouter()
pipeline = MemoryLanePipeline()  # Initialize full AI pipeline

# Health check (no API key required)
@router.get("/health")
def health_check():
    return {"status": "API is running"}

# Single text endpoint
@router.post("/predict", response_model=PipelineResponse)
def predict_single(input_data: TextInput, api_key: str = Depends(get_api_key)):
    results = pipeline.run([input_data.text])
    return results

# Batch texts endpoint
@router.post("/predict_batch", response_model=PipelineResponse)
def predict_batch(input_data: TextListInput, api_key: str = Depends(get_api_key)):
    results = pipeline.run(input_data.texts)
    return results
