import os

# MongoDB connection string
DB_URL = os.environ.get("DB_URL", "mongodb+srv://chaudharyapoorva0187_db_user:mylogin123@cluster0.o3c5arb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = os.environ.get("DB_NAME", "memorylane")
CONTENT_COLLECTION = os.environ.get("CONTENT_COLLECTION", "content")

# Embedding models
TEXT_EMBED_MODEL = os.environ.get("TEXT_EMBED_MODEL", "all-MiniLM-L6-v2")
IMG_EMBED_MODEL = os.environ.get("IMG_EMBED_MODEL", "clip-ViT-B-32")

# Vector index storage
VECTOR_INDEX_DIR = os.environ.get("VECTOR_INDEX_DIR", "./vector_index")

# Optional: max results for search
MAX_SEARCH_RESULTS = 10
