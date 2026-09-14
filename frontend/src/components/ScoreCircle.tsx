interface ScoreCircleProps {
  score: number;
}

export default function ScoreCircle({
  score,
}: ScoreCircleProps) {
  return (
    <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-fuchsia-600 p-1 shadow-2xl shadow-violet-500/20">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#09090b]">
        <span className="text-4xl font-bold text-white">
          {score}%
        </span>

        <span className="mt-1 text-xs uppercase tracking-wider text-gray-400">
          Match
        </span>
      </div>
    </div>
  );
}