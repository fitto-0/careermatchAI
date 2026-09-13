from langchain_core.prompts import ChatPromptTemplate


career_match_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are CareerMatch AI, an expert AI assistant specialized in
CV analysis and job compatibility evaluation.

Your task is to compare a candidate's CV with a job description.

You must analyze:

1. Matching skills
2. Missing skills
3. Candidate strengths
4. Candidate weaknesses
5. Overall job compatibility
6. Recommendations for improvement

Rules:

- Be objective and professional.
- Only use information provided in the CV and job description.
- Do not invent experience or skills.
- Do not penalize the candidate for information that is simply not mentioned.
- Give a realistic compatibility evaluation.
- The match score must be between 0 and 100.
- Return ONLY valid JSON.
            """,
        ),
        (
            "human",
            """
CANDIDATE CV:

{cv_text}


JOB DESCRIPTION:

{job_description}


Analyze the candidate and return the result using EXACTLY this JSON structure:

{{
    "match_score": 0,
    "compatibility": "",
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "matching_skills": [],
    "missing_skills": [],
    "recommendations": []
}}
            """,
        ),
    ]
)