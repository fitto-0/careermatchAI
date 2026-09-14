"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

import { analyzeCandidate, AnalysisResult } from "@/lib/api";

import LoadingState from "./LoadingState";
import ScoreCircle from "./ScoreCircle";
import ResultCard from "./ResultCard";

export default function Analyzer() {
  const [cvText, setCvText] = useState("");

  const [cvFile, setCvFile] = useState<File | null>(null);

  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const insightCards = result
    ? [
        {
          label: "Top strength",
          value: result.strengths[0] || "Strong overall profile",
          tone: "violet",
        },
        {
          label: "Biggest gap",
          value: result.missing_skills[0] || "No major gaps detected",
          tone: "amber",
        },
        {
          label: "Best match",
          value: result.matching_skills[0] || "Core role alignment",
          tone: "cyan",
        },
        {
          label: "Next move",
          value: result.recommendations[0] || "Keep refining your positioning",
          tone: "fuchsia",
        },
      ]
    : [];

  // ----------------------------------------------
  // Handle file
  // ----------------------------------------------

  function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");

      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("The PDF file must be smaller than 10 MB.");

      return;
    }

    setCvFile(file);

    // PDF is the primary method
    setCvText("");

    setError("");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  // ----------------------------------------------
  // Drag & Drop
  // ----------------------------------------------

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  // ----------------------------------------------
  // Remove file
  // ----------------------------------------------

  function removeFile() {
    setCvFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // ----------------------------------------------
  // Analyze
  // ----------------------------------------------

  async function handleAnalyze() {
    if (!cvFile && !cvText.trim()) {
      setError("Please upload your CV or paste your CV text.");

      return;
    }

    if (!jobDescription.trim()) {
      setError("Please provide the job description.");

      return;
    }

    setLoading(true);

    setError("");

    setResult(null);

    try {
      const analysis = await analyzeCandidate(jobDescription, cvText, cvFile);

      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------------------
  // UI
  // ----------------------------------------------

  return (
    <section
      id="analyzer"
      className="relative mx-auto max-w-7xl px-6 pb-24 pt-6"
    >
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/90">
          Career fit analyzer
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Compare your profile with the role you want.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="soft-card glow-ring rounded-[28px] p-6 md:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Your CV</h3>
              <p className="mt-1 text-sm text-slate-300">
                Upload a PDF or paste the text manually.
              </p>
            </div>
            <span className="rounded-full border border-violet-300/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100">
              Step 1
            </span>
          </div>

          {!cvFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition duration-200 ${
                dragActive
                  ? "border-violet-400 bg-violet-500/12"
                  : "border-white/10 bg-slate-950/30 hover:border-violet-400/60 hover:bg-violet-500/6"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/15 to-cyan-400/10 text-3xl">
                📄
              </div>

              <h4 className="mt-4 text-lg font-semibold text-white">
                Upload your CV
              </h4>

              <p className="mt-2 text-sm text-slate-300">
                Drag & drop your PDF here or click to browse
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                PDF only • up to 10 MB
              </p>
            </div>
          ) : (
            <div className="rounded-[22px] border border-violet-400/30 bg-violet-500/10 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-xl">
                    📄
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {cvFile.name}
                    </p>
                    <p className="text-xs text-slate-300">
                      {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeFile}
                  className="rounded-xl border border-red-400/30 bg-red-500/8 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {!cvFile && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  or
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <textarea
                value={cvText}
                onChange={(event) => setCvText(event.target.value)}
                placeholder="Paste your CV text here..."
                className="min-h-65 w-full resize-none rounded-[22px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
              />
            </>
          )}
        </div>

        <div className="soft-card glow-ring rounded-[28px] p-6 md:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Job description
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Share the role you want to match against.
              </p>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
              Step 2
            </span>
          </div>

          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-105 w-full resize-none rounded-[22px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-full border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-300/40 hover:bg-white/8"
        >
          {loading ? "Analyzing your profile..." : "✨ Analyze compatibility"}
        </button>
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-center text-sm text-red-200">
          {error}
        </div>
      )}

      {loading && <LoadingState />}

      {result && !loading && (
        <div id="insights" className="mt-16 space-y-8">
          <div className="soft-card glow-ring rounded-4xl p-8 text-center md:p-10">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:text-left">
              <ScoreCircle score={result.match_score} />

              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-200/80">
                  Compatibility
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  {result.compatibility}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  {result.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {insightCards.map((item) => (
              <div
                key={item.label}
                className="soft-card rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:border-violet-400/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    {item.label}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.tone === "violet"
                        ? "bg-violet-400"
                        : item.tone === "amber"
                          ? "bg-amber-400"
                          : item.tone === "cyan"
                            ? "bg-cyan-400"
                            : "bg-fuchsia-400"
                    }`}
                  />
                </div>

                <p className="text-sm leading-relaxed text-slate-200">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ResultCard title="Strengths" icon="💪" items={result.strengths} />
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
