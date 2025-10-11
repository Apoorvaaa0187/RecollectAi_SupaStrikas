from pydantic import BaseModel
from typing import List

# Input for single text
class TextInput(BaseModel):
    text: str

# Input for multiple texts
class TextListInput(BaseModel):
    texts: List[str]

# API response schema
class PipelineResponse(BaseModel):
    clean_texts: List[str]
    classifications: List[str]
    sentiments: List[str]
    summaries: List[str]
    embeddings: List[List[float]]  # embedding vectors
