interface ScoreCircleProps {
  score: number;
}

const TICKS = 50;

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const safeScore = Math.round(Math.min(100, Math.max(0, score)));
  const lit = Math.round((safeScore / 100) * TICKS);

  return (
    <div>
      <div className="flex items-baseline gap-3 font-mono">
        <span className="text-[clamp(5rem,14vw,9rem)] font-light leading-none tracking-[-0.06em] text-white">
          {safeScore}
        </span>

        <span className="text-lg text-zinc-500">/100</span>
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
            className={`h-5 flex-1 transition-colors duration-500 ${
              index < lit ? "bg-white" : "bg-white/10"
            }`}
            style={{ transitionDelay: `${index * 15}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
