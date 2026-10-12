import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-160 h-svh flex-col overflow-hidden"
    >
      <ParticleField />

      {/* Fade the landscape into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      <div className="container-main relative mt-auto pb-16 pt-28 md:pb-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h1 className="fade-up font-mono text-[clamp(1.75rem,5.2vw,4.2rem)] font-light leading-[1.08] tracking-[-0.03em] text-zinc-400">
            Know if your <span className="text-white">profile</span>
            <br />
            fits the job
            <br />
            before you apply
          </h1>

          <div className="fade-up-delay flex max-w-xs flex-col gap-6 md:items-end md:text-right">
            <p className="text-sm leading-6 text-zinc-400">
              Upload a CV, paste a job description, and get an honest match
              score, skill gaps and next steps.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="#how-it-works"
                className="font-mono text-xs text-zinc-400 transition hover:text-white"
              >
                How it works
              </a>

              <a
                href="#analyzer"
                className="bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-300"
              >
                Analyze my CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
