export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-white"
        >
          CareerMatch<span className="text-zinc-500"> AI</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="label transition hover:text-white">
            How it works
          </a>

          <a href="#features" className="label transition hover:text-white">
            Features
          </a>

          <a href="#analyzer" className="label transition hover:text-white">
            Analyzer
          </a>
        </div>

        <a
          href="#analyzer"
          className="border border-white/20 px-4 py-2 font-mono text-xs text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          Analyze CV
        </a>
      </div>
    </nav>
  );
}
