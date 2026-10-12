const steps = [
  "Reading CV",
  "Mapping skills to requirements",
  "Scoring compatibility",
  "Writing recommendations",
];

export default function LoadingState() {
  return (
    <div
      role="status"
      className="mt-16 border border-white/10 p-6 md:p-10"
    >
      <p className="label">Processing</p>

      <div className="mt-8 flex gap-1" aria-hidden="true">
        {Array.from({ length: 40 }, (_, index) => (
          <span
            key={index}
            className="tick-wave h-6 flex-1 bg-white"
            style={{ animationDelay: `${index * 40}ms` }}
          />
        ))}
      </div>

      <ol className="mt-8 space-y-3 font-mono text-sm text-white">
        {steps.map((step, index) => (
          <li
            key={step}
            className="step-reveal flex gap-4"
            style={{ animationDelay: `${index * 1.4}s` }}
          >
            <span className="text-zinc-500">0{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
