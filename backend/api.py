from io import BytesIO

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader

from src.analyzer import analyze_candidate


app = FastAPI(
    title="CareerMatch AI API",
    description="AI-powered CV and Job Compatibility Analyzer",
    version="1.1.0",
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
# Health check
# --------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "CareerMatch AI API is running",
    }


# --------------------------------------------------
# PDF text extraction
# --------------------------------------------------

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text content from a PDF file.
    """

    try:
        reader = PdfReader(BytesIO(file_content))

        extracted_text = []

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                extracted_text.append(page_text)

        return "\n".join(extracted_text).strip()

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not read the PDF file: {str(e)}",
        )


# --------------------------------------------------
# Analyze endpoint
# --------------------------------------------------

@app.post("/api/analyze")
async def analyze(
    job_description: str = Form(...),
    cv_text: str = Form(""),
    cv_file: UploadFile | None = File(None),
):
    """
    Analyze a CV against a job description.

    The candidate can either:
    - Upload a PDF CV
    - Paste CV text manually
    """

    # ----------------------------------------------
    # Validate job description
    # ----------------------------------------------

    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty.",
        )

    # ----------------------------------------------
    # Get CV text
    # ----------------------------------------------

    final_cv_text = cv_text.strip()

    # If a PDF was uploaded, use it as the main CV source
    if cv_file is not None:

        if cv_file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed.",
            )

        file_content = await cv_file.read()

        if not file_content:
            raise HTTPException(
                status_code=400,
                detail="The uploaded PDF file is empty.",
            )

        final_cv_text = extract_text_from_pdf(file_content)

    # ----------------------------------------------
    # Validate CV content
    # ----------------------------------------------

    if not final_cv_text:
        raise HTTPException(
            status_code=400,
            detail=(
                "Please upload a readable PDF "
                "or paste your CV text."
            ),
        )

    # ----------------------------------------------
    # AI Analysis
    # ----------------------------------------------

    try:

        result = analyze_candidate(
            final_cv_text,
            job_description,
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}",
        )