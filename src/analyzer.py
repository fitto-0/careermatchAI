import json
import re

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from src.prompts import career_match_prompt


load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0,
)


chain = career_match_prompt | llm


def analyze_candidate(cv_text: str, job_description: str) -> dict:
    """
    Analyze a candidate's CV against a job description.
    """

    response = chain.invoke(
        {
            "cv_text": cv_text,
            "job_description": job_description,
        }
    )

    content = response.content.strip()

    # Remove Markdown code blocks if returned by the model
    content = re.sub(r"^```json\s*", "", content)
    content = re.sub(r"^```\s*", "", content)
    content = re.sub(r"\s*```$", "", content)

    try:
        result = json.loads(content)
        return result

    except json.JSONDecodeError:
        return {
            "error": "The AI returned an invalid JSON response.",
            "raw_response": content,
        }