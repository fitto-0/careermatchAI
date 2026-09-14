export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 via-fuchsia-900 to-cyan-400 font-bold text-white shadow-lg shadow-violet-500/30">
            C
          </div>

          <div className="text-lg font-semibold tracking-tight text-white">
            Career<span className="text-violet-300">Match</span>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            Process
          </a>
          <a href="#insights" className="transition hover:text-white">
            Insights
          </a>
          <a href="#analyzer" className="transition hover:text-white">
            Analyzer
          </a>
        </div>

        <a
          href="#analyzer"
          className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300/60 hover:bg-violet-500/15"
        >
          Analyze CV
        </a>
      </div>
    </nav>
  );
}
