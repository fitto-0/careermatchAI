"use client";

import { useState } from "react";
import { analyzeCandidate, AnalysisResult } from "@/lib/api";
import LoadingState from "./LoadingState";
import ScoreCircle from "./ScoreCircle";
import ResultCard from "./ResultCard";

export default function Analyzer() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!cvText.trim() || !jobDescription.trim()) {
      setError("Please provide both your CV and the job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const analysis = await analyzeCandidate({
        cv_text: cvText,
        job_description: jobDescription,
      });

      setResult(analysis);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="analyzer"
      className="mx-auto max-w-7xl px-6 pb-24"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Candidate CV
          </label>

          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste the candidate's CV here..."
            className="min-h-[350px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/50"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste the job description here..."
            className="min-h-[350px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/50"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Compatibility"}
        </button>
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      {loading && <LoadingState />}

      {result && !loading && (
        <div className="mt-16 space-y-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <ScoreCircle score={result.match_score} />

            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Compatibility
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {result.compatibility}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ResultCard
              title="Strengths"
              icon="💪"
              items={result.strengths}
            />

            <ResultCard
              title="Weaknesses"
              icon="⚠️"
              items={result.weaknesses}
            />

            <ResultCard
              title="Matching Skills"
              icon="✅"
              items={result.matching_skills}
            />

            <ResultCard
              title="Missing Skills"
              icon="❌"
              items={result.missing_skills}
            />
          </div>

          <ResultCard
            title="Recommendations"
            icon="🚀"
            items={result.recommendations}
          />
        </div>
      )}
    </section>
  );
}