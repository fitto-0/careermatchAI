interface ScoreCircleProps {
  score: number;
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const safeScore = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 56;
  const dashOffset = circumference - (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 140 140"
      >
        <circle
          cx="70"
          cy="70"
          r="56"
          stroke="rgba(148, 163, 184, 0.12)"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="70"
          cy="70"
          r="56"
          stroke="url(#matchGradient)"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient
            id="matchGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <div className="glow-ring flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div className="text-center">
          <div className="text-4xl font-black tracking-tight text-white">
            {safeScore}%
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            Match
          </div>
        </div>
      </div>
    </div>
  );
}
