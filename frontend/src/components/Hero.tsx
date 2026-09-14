export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-18 pt-32 text-center md:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-orb absolute left-[12%] top-16 h-52 w-52 rounded-full bg-violet-500/18 blur-3xl" />
        <div className="floating-orb delay-1 absolute right-[16%] top-20 h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="floating-orb delay-2 absolute bottom-8 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/8 px-4 py-2 text-sm font-medium text-violet-200 shadow-lg shadow-violet-500/10 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          AI-powered career analysis
        </div>

        <h1 className="mx-auto max-w-5xl text-balance text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
          Turn your CV into a
          <span className="mt-2 block bg-linear-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            stronger match
          </span>
          for the role you want.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
          Compare your experience against a job description and surface the
          skills, gaps, and signals that actually influence hiring decisions.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#analyzer"
            className="rounded-full border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-300/40 hover:bg-white/8"
          >
            Analyze my CV
          </a>
          <a
            href="#insights"
            className="rounded-full border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-300/40 hover:bg-white/8"
          >
            See sample insights
          </a>
        </div>

        <div id="how-it-works" className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { label: "CV evaluation", value: "Instant" },
            { label: "Role fit", value: "Skill-based" },
            { label: "Recommendations", value: "Actionable" },
          ].map((item) => (
            <div
              key={item.label}
              className="soft-card animated-shimmer rounded-2xl px-5 py-4 text-left"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {item.label}
              </div>
              <div className="mt-3 text-2xl font-bold text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
