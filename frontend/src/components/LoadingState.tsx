export default function LoadingState() {
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-violet-400/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-400/15 ring-1 ring-white/10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-violet-300 border-r-fuchsia-300" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white">
        Analyzing your profile...
      </h3>

      <p className="mt-3 text-sm text-slate-300">
        CareerMatch AI is comparing your experience, skills, and role fit
        against the job description.
      </p>

      <div className="mt-6 space-y-3">
        {["CV review", "Skill match assessment", "Recommendations engine"].map(
          (step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 text-left text-sm text-slate-200"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-300/40 bg-violet-500/10 text-[10px] text-violet-200">
                {index + 1}
              </div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                  style={{
                    width: `${(index + 1) * 33}%`,
                    animation: "pulse-slow 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
