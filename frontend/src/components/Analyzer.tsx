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
    <section id="analyzer" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ======================================
            CV SECTION
        ====================================== */}

        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Your CV</h2>

            <p className="mt-1 text-sm text-gray-400">
              Upload your CV as a PDF or paste the text manually.
            </p>
          </div>

          {/* PDF Upload */}

          {!cvFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
                dragActive
                  ? "border-violet-400 bg-violet-500/10"
                  : "border-white/10 bg-black/20 hover:border-violet-500/50 hover:bg-violet-500/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="text-5xl">📄</div>

              <h3 className="mt-4 font-semibold text-white">Upload your CV</h3>

              <p className="mt-2 text-sm text-gray-400">
                Drag & drop your PDF here or click to browse
              </p>

              <p className="mt-3 text-xs text-gray-500">
                PDF only • Maximum 10 MB
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-xl">
                    📄
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {cvFile.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeFile}
                  className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* OR */}

          {!cvFile && (
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs font-medium text-gray-500">OR</span>

              <div className="h-px flex-1 bg-white/10" />
            </div>
          )}

          {/* Paste CV */}

          {!cvFile && (
            <textarea
              value={cvText}
              onChange={(event) => setCvText(event.target.value)}
              placeholder="Paste your CV text here..."
              className="min-h-55 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-violet-500/50"
            />
          )}
        </div>

        {/* ======================================
            JOB DESCRIPTION
        ====================================== */}

        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Job Description
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Paste the job description you want to compare your CV with.
            </p>
          </div>

          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-87.5 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-violet-500/50"
          />
        </div>
      </div>

      {/* ======================================
          ANALYZE BUTTON
      ====================================== */}

      <div className="mt-8 text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:scale-[1.02] hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing your profile..." : "✨ Analyze Compatibility"}
        </button>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && <LoadingState />}

      {/* ======================================
          RESULTS
      ====================================== */}

      {result && !loading && (
        <div className="mt-16 space-y-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/3 p-8 text-center">
            <ScoreCircle score={result.match_score} />

            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Compatibility
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {result.compatibility}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-400">
                {result.summary}
              </p>
            </div>
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
