export default function Hero() {
  return (
    <section className="px-6 pb-16 pt-36 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          AI-Powered Career Analysis
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          Know how well your{" "}
          <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            CV matches
          </span>{" "}
          the job.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          Compare your CV with any job description and discover
          your strengths, missing skills and personalized
          recommendations.
        </p>
      </div>
    </section>
  );
}