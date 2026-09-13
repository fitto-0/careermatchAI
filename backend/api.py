from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.analyzer import analyze_candidate


app = FastAPI(
    title="CareerMatch AI API",
    description="AI-powered CV and Job Compatibility Analyzer",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Request model
# --------------------------------------------------

class AnalyzeRequest(BaseModel):
    cv_text: str
    job_description: str


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "CareerMatch AI API is running",
    }


# --------------------------------------------------
# Analyze endpoint
# --------------------------------------------------

@app.post("/api/analyze")
def analyze(request: AnalyzeRequest):

    if not request.cv_text.strip():
        raise HTTPException(
            status_code=400,
            detail="CV text cannot be empty.",
        )

    if not request.job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty.",
        )

    try:
        result = analyze_candidate(
            request.cv_text,
            request.job_description,
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}",
        )