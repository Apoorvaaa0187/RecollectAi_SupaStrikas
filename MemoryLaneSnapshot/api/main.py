from fastapi import FastAPI
from api.routes import router as api_router

app = FastAPI(
    title="MemoryLaneSnapshot API",
    description="AI pipeline API: classification, summarization, sentiment, embeddings (secured with API key)",
    version="1.0.0",
)

# Include API router
app.include_router(api_router, prefix="/api")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to MemoryLaneSnapshot API. Use /docs for interactive API testing."}

# Optional: Startup event to ensure pipeline is loaded
@app.on_event("startup")
def startup_event():
    print("MemoryLaneSnapshot API started. Models loaded and API key required for endpoints.")
