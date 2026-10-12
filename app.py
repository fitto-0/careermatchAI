"""
Entry point for Hugging Face Spaces (Gradio SDK).

The Space runs `python app.py` and expects a server on port 7860,
so we serve the FastAPI backend directly.
"""

import uvicorn

from backend.api import app


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
