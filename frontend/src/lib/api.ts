const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface AnalyzeRequest {
  cv_text: string;
  job_description: string;
}

export interface AnalysisResult {
  match_score: number;
  compatibility: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
}

export async function analyzeCandidate(
  data: AnalyzeRequest,
): Promise<AnalysisResult> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Something went wrong during the analysis.",
    );
  }

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}
