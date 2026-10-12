"use client";

import { ReactNode, useState } from "react";

import { AnalysisResult } from "@/lib/api";

import ScoreCircle from "./ScoreCircle";

const tiers = [
  {
    min: 75,
    text: "text-emerald-400",
    bar: "bg-emerald-400",
    message: "Your profile lines up well with this role. It's worth applying.",
  },
  {
    min: 50,
    text: "text-amber-400",
    bar: "bg-amber-400",
    message: "You cover the core of the role, but a few gaps could hold you back.",
  },
  {
    min: 0,
    text: "text-rose-400",
    bar: "bg-rose-400",
    message: "There are significant gaps between your profile and this role.",
  },
];

export default function Results({ result }: { result: AnalysisResult }) {
  const [done, setDone] = useState<Set<number>>(new Set());

  const strengths = result.strengths ?? [];
  const weaknesses = result.weaknesses ?? [];
  const matching = result.matching_skills ?? [];
  const missing = result.missing_skills ?? [];
  const steps = result.recommendations ?? [];

  const tier = tiers.find((t) => result.match_score >= t.min) ?? tiers[2];
  const totalSkills = matching.length + missing.length;
  const coverage = totalSkills
    ? Math.round((matching.length / totalSkills) * 100)
    : 0;

  function toggleStep(index: number) {
    setDone((previous) => {
      const next = new Set(previous);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <div className="space-y-24">
      {/* Verdict */}
      <div>
        <p className="label mb-10">04 — Your result</p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ScoreCircle
            score={result.match_score}
            textClass={tier.text}
            barClass={tier.bar}
          />

          <div className="lg:pt-2">
            <p
              className={`flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] ${tier.text}`}
            >
              <span className={`h-2 w-2 rounded-full ${tier.bar}`} />
              {result.compatibility}
            </p>

            <h3 className="mt-5 text-2xl font-medium leading-snug text-white md:text-3xl">
              {tier.message}
            </h3>

            <p className="mt-6 text-base leading-8 text-zinc-300 md:text-lg">
              {result.summary}
            </p>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
          <Stat
            value={`${matching.length}/${totalSkills}`}
            label="Skills matched"
          />
          <Stat value={strengths.length} label="Strengths" />
          <Stat value={missing.length} label="Gaps to close" />
          <Stat value={steps.length} label="Next steps" />
        </dl>
      </div>

      {/* Skills */}
      <Block
        title="Skills check"
        hint={`${coverage}% of the skills this role asks for appear in your CV.`}
      >
        <div className="mb-10 flex h-1.5 overflow-hidden bg-white/10">
          <div
            className="bg-emerald-400 transition-all duration-700"
            style={{ width: `${coverage}%` }}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium text-emerald-400">
              ✓ You have
            </p>

            <TagList
              items={matching}
              className="border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-rose-400">
              ✕ You&apos;re missing
            </p>

            <TagList
              items={missing}
              className="border-dashed border-rose-400/40 text-rose-100"
            />
          </div>
        </div>
      </Block>

      {/* Strengths and weaknesses */}
      <Block
        title="How you come across"
        hint="What a recruiter is likely to notice first."
      >
        <div className="grid gap-12 md:grid-cols-2">
          <PointList
            title="What works for you"
            items={strengths}
            marker="+"
            markerClass="text-emerald-400"
          />

          <PointList
            title="What could hold you back"
            items={weaknesses}
            marker="−"
            markerClass="text-amber-400"
          />
        </div>
      </Block>

      {/* Recommendations */}
      <Block
        title="Your action plan"
        hint={
          steps.length
            ? `Tick them off as you go · ${done.size}/${steps.length} done`
            : undefined
        }
      >
        {steps.length === 0 ? (
          <Empty />
        ) : (
          <ol className="border-t border-white/10">
            {steps.map((step, index) => {
              const checked = done.has(index);

              return (
                <li key={`${step}-${index}`} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    aria-pressed={checked}
                    className="group flex w-full items-start gap-5 py-6 text-left transition hover:bg-white/2 md:gap-8"
                  >
                    <span className="w-10 shrink-0 font-mono text-2xl font-light text-zinc-500 md:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`flex-1 pt-1 text-base leading-7 transition md:text-lg ${
                        checked ? "text-zinc-500 line-through" : "text-white"
                      }`}
                    >
                      {step}
                    </span>

                    <span
                      className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center border text-xs transition ${
                        checked
                          ? "border-emerald-400 bg-emerald-400 text-black"
                          : "border-white/30 text-transparent group-hover:border-white"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </Block>
    </div>
  );
}

function Block({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-8">
        <h3 className="text-2xl font-medium text-white">{title}</h3>

        {hint && <p className="mt-2 text-sm text-zinc-400">{hint}</p>}
      </div>

      {children}
    </section>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="bg-[#0a0a0a] p-6">
      <dd className="font-mono text-3xl font-light text-white">{value}</dd>
      <dt className="label mt-2">{label}</dt>
    </div>
  );
}

function TagList({ items, className }: { items: string[]; className: string }) {
  if (items.length === 0) {
    return <Empty />;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className={`border px-3 py-1.5 text-sm ${className}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PointList({
  title,
  items,
  marker,
  markerClass,
}: {
  title: string;
  items: string[];
  marker: string;
  markerClass: string;
}) {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-zinc-300">{title}</p>

      {items.length === 0 ? (
        <Empty />
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-4 text-[15px] leading-7 text-zinc-200"
            >
              <span className={`font-mono text-lg leading-7 ${markerClass}`}>
                {marker}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-zinc-400">Nothing to report.</p>;
}
