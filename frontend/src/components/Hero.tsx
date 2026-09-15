export default function Hero() {
  return (
    <section className="subtle-grid border-b border-white/10">
      <div className="container-main py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.22em] text-violet-400">
            // AI career analysis
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#f5f3ef] md:text-7xl lg:text-[82px]">
            Does your experience
            <br />
            <span className="text-violet-400">actually match</span> this job?
          </h1>

          <div className="mt-8 max-w-2xl">
            <p className="text-lg leading-8 text-zinc-400 md:text-xl">
              Upload your CV, add a job description, and get an honest
              AI-powered analysis of where you stand.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#analyzer"
              className="bg-[#f5f3ef] px-6 py-3 text-sm font-semibold text-[#0b0b0d] transition hover:bg-violet-300"
            >
              Analyze my CV →
            </a>

            <a
              href="#how-it-works"
              className="border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              See how it works
            </a>
          </div>

          <p className="mt-7 text-xs text-zinc-600">
            No account required · PDF or text · Powered by AI
          </p>
        </div>
      </div>
    </section>
  );
}
