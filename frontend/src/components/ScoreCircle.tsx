"use client";

import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  textClass: string;
  barClass: string;
}

const TICKS = 50;
const DURATION = 1200;

export default function ScoreCircle({
  score,
  textClass,
  barClass,
}: ScoreCircleProps) {
  const safeScore = Math.round(Math.min(100, Math.max(0, score)));
  const [shown, setShown] = useState(0);

  // Count up from 0 so the score lands with a bit of drama
  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : DURATION;

    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = duration
        ? Math.min(1, (now - start) / duration)
        : 1;
      const eased = 1 - Math.pow(1 - progress, 3);

      setShown(Math.round(eased * safeScore));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [safeScore]);

  const lit = Math.round((shown / 100) * TICKS);

  return (
    <div>
      <div className="flex items-baseline gap-3 font-mono">
        <span
          className={`text-[clamp(5rem,14vw,9rem)] font-light leading-none tracking-[-0.06em] ${textClass}`}
        >
          {shown}
        </span>

        <span className="text-xl text-zinc-400">/100 match</span>
      </div>

      <div
        className="mt-6 flex gap-0.75"
        role="meter"
        aria-label="Match score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
      >
        {Array.from({ length: TICKS }, (_, index) => (
          <span
            key={index}
            className={`h-5 flex-1 ${index < lit ? barClass : "bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
