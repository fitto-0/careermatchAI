
"use client";

import { useState } from "react";

interface AnalysisResult {
  match_score: number;
  compatibility: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
}

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeCV = async () => {
    if (!cvText.trim() || !jobDescription.trim()) {
      setError("Please provide both your CV and the job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cv_text: cvText,
          job_description: jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollToAnalyzer = () => {
    document
      .getElementById("analyzer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold">
              C
            </div>

            <span className="text-lg font-semibold">
              CareerMatch AI
            </span>
          </div>

          <button
            onClick={scrollToAnalyzer}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
          >
            Analyze CV
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
            AI-powered career matching
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Find out how well your CV
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {" "}matches
            </span>
            {" "}the job.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            CareerMatch AI analyzes your CV against a job description
            and gives you a clear compatibility score, matching skills,
            missing skills, and personalized recommendations.
          </p>

          <button
            onClick={scrollToAnalyzer}
            className="mt-10 rounded-2xl bg-white px-7 py-4 font-semibold text-black transition hover:scale-105"
          >
            Analyze Your CV →
          </button>
        </div>
      </section>

      {/* ANALYZER */}
      <section
        id="analyzer"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Career Analyzer
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Compare your profile with the opportunity
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Paste your CV and the job description below.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* CV */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <label className="mb-3 block text-sm font-semibold">
              Your CV
            </label>

            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your CV content here..."
              className="h-80 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50"
            />
          </div>

          {/* JOB */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <label className="mb-3 block text-sm font-semibold">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="h-80 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50"
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={analyzeCV}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Compatibility"}
          </button>
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
              Analysis Result
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Your CareerMatch analysis
            </h2>
          </div>

          {/* SCORE */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-zinc-400">
                Match Score
              </p>

              <div className="mt-4 text-6xl font-bold">
                {result.match_score}%
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:col-span-2">
              <p className="text-sm text-zinc-400">
                Compatibility
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                {result.compatibility}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {result.summary}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ResultCard
              title="Strengths"
              items={result.strengths}
            />

            <ResultCard
              title="Weaknesses"
              items={result.weaknesses}
            />

            <ResultCard
              title="Matching Skills"
              items={result.matching_skills}
            />

            <ResultCard
              title="Missing Skills"
              items={result.missing_skills}
            />
          </div>

          {/* RECOMMENDATIONS */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-bold">
              Recommendations
            </h3>

            <div className="mt-5 space-y-3">
              {result.recommendations.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-black/20 p-4 text-zinc-300"
                >
                  <span className="mr-3 text-violet-400">
                    {index + 1}.
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        CareerMatch AI · AI-powered CV analysis
      </footer>
    </main>
  );
}

function ResultCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-black/20 p-4 text-sm text-zinc-300"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">
            No items found.
          </p>
        )}
      </div>
    </div>
  );
}
