export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0d]/90 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between">
        <a
          href="/"
          className="text-[15px] font-semibold tracking-tight text-[#f5f3ef]"
        >
          CareerMatch <span className="text-violet-400">AI</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>

          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#analyzer" className="transition hover:text-white">
            Analyzer
          </a>
        </div>

        <a
          href="#analyzer"
          className="border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-violet-400/50 hover:bg-violet-400/10"
        >
          Analyze CV →
        </a>
      </div>
    </nav>
  );
}
