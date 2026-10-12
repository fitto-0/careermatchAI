"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

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

  const resultsRef = useRef<HTMLDivElement>(null);

  const insights = result
    ? [
        {
          label: "Top strength",
          value: result.strengths[0] || "Strong overall profile",
        },
        {
          label: "Biggest gap",
          value: result.missing_skills[0] || "No major gaps detected",
        },
        {
          label: "Best match",
          value: result.matching_skills[0] || "Core role alignment",
        },
        {
          label: "Next move",
          value: result.recommendations[0] || "Keep refining your positioning",
        },
      ]
    : [];

  useEffect(() => {
    if (result) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

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
    <section id="analyzer">
      <div className="container-main py-24 md:py-32">
        <div className="mb-16 md:mb-20">
          <p className="label mb-6">03 — Analyzer</p>

          <h2 className="font-mono text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.03em] text-zinc-500">
            Compare your <span className="text-white">profile</span>
            <br />
            with the role you want.
          </h2>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
          <div className="flex flex-col bg-[#0a0a0a] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="label text-white!">01 · Your CV</h3>
              <span className="label">PDF or text</span>
            </div>

            {!cvFile ? (
              <div
                role="button"
                tabIndex={0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`cursor-pointer border border-dashed px-6 py-10 text-center outline-none transition focus-visible:border-white ${
                  dragActive
                    ? "border-white bg-white/5"
                    : "border-white/15 hover:border-white/40 hover:bg-white/2"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mx-auto h-7 w-7 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M12 16V4m0 0-4 4m4-4 4 4M5 20h14" />
                </svg>

                <p className="mt-4 text-sm text-white">
                  Drop your PDF here or click to browse
                </p>

                <p className="label mt-2">PDF only · up to 10 MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 border border-white/20 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{cvFile.name}</p>
                  <p className="font-mono text-xs text-zinc-500">
                    {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={removeFile}
                  className="font-mono text-xs text-zinc-400 transition hover:text-white"
                >
                  Remove
                </button>
              </div>
            )}

            {!cvFile && (
              <>
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="label">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder="Paste your CV text here..."
                  aria-label="CV text"
                  className="min-h-56 w-full flex-1 resize-none border border-white/10 bg-transparent p-4 text-sm leading-6 text-white outline-none transition placeholder:font-mono placeholder:text-xs placeholder:text-zinc-600 focus:border-white/40"
                />
              </>
            )}
          </div>

          <div className="flex flex-col bg-[#0a0a0a] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="label text-white!">02 · Job description</h3>
              <span className="label">Text</span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job description here..."
              aria-label="Job description"
              className="min-h-96 w-full flex-1 resize-none border border-white/10 bg-transparent p-4 text-sm leading-6 text-white outline-none transition placeholder:font-mono placeholder:text-xs placeholder:text-zinc-600 focus:border-white/40"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">Takes about 10 seconds</p>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-300 disabled:cursor-wait disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze compatibility"}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 border border-red-400/30 px-4 py-3 font-mono text-xs text-red-300"
          >
            Error — {error}
          </p>
        )}

        {loading && <LoadingState />}

        {result && !loading && (
          <div ref={resultsRef} id="insights" className="scroll-mt-20 pt-24">
            <p className="label mb-10">04 — Result</p>

            <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-2 lg:gap-20">
              <ScoreCircle score={result.match_score} />

              <div className="lg:pt-4">
                <p className="label">Compatibility</p>

                <h3 className="mt-4 font-mono text-3xl font-light tracking-tight text-white md:text-4xl">
                  {result.compatibility}
                </h3>

                <p className="mt-6 leading-7 text-zinc-400">
                  {result.summary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
              {insights.map((item) => (
                <div key={item.label}>
                  <p className="label mb-4">{item.label}</p>
                  <p className="text-[13px] leading-6 text-zinc-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              <ResultCard title="Strengths" items={result.strengths} />
              <ResultCard title="Weaknesses" items={result.weaknesses} />
              <ResultCard
                title="Matching skills"
                items={result.matching_skills}
              />
              <ResultCard
                title="Missing skills"
                items={result.missing_skills}
              />
              <div className="md:col-span-2">
                <ResultCard
                  title="Recommendations"
                  items={result.recommendations}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

