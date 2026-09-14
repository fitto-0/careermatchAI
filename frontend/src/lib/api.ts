const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  jobDescription: string,
  cvText: string,
  cvFile: File | null,
): Promise<AnalysisResult> {
  const formData = new FormData();

  formData.append("job_description", jobDescription);

  if (cvText.trim()) {
    formData.append("cv_text", cvText);
  }

  if (cvFile) {
    formData.append("cv_file", cvFile);
  }

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
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
