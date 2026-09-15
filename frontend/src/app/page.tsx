import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] text-[#f5f3ef]">
      <Navbar />

      <Hero />

      <section id="features" className="border-b border-white/10">
        <div className="container-main py-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
              // what you get
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              A clearer picture before you apply.
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-400">
              CareerMatch AI looks beyond simple keyword matching to help you
              understand how your profile fits the opportunity.
            </p>
          </div>

          <div className="grid border-l border-t border-white/10 md:grid-cols-2">
            <Feature
              number="01"
              title="Match score"
              description="See an overall compatibility score based on the skills and experience found in your CV."
            />

            <Feature
              number="02"
              title="Strengths"
              description="Understand which parts of your profile already align strongly with the position."
            />

            <Feature
              number="03"
              title="Missing skills"
              description="Identify important skills and requirements that are not clearly represented in your CV."
            />

            <Feature
              number="04"
              title="Recommendations"
              description="Get practical suggestions to improve your profile and become a stronger candidate."
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-white/10">
        <div className="container-main py-20">
          <div className="mb-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
              // how it works
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Three inputs. One honest analysis.
            </h2>
          </div>

          <div className="grid gap-0 border-l border-white/10 md:grid-cols-3">
            <Step
              number="01"
              title="Upload your CV"
              description="Drop your PDF or paste the text directly into CareerMatch AI."
            />

            <Step
              number="02"
              title="Add the job"
              description="Paste the job description for the opportunity you want to evaluate."
            />

            <Step
              number="03"
              title="Get your match"
              description="Receive your score, strengths, gaps and personalized recommendations."
            />
          </div>
        </div>
      </section>

      <Analyzer />

      <footer className="border-t border-white/10">
        <div className="container-main flex flex-col gap-3 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>CareerMatch AI</p>

          <p>AI-powered CV & job compatibility analysis.</p>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-r border-white/10 p-7 md:p-9">
      <span className="text-xs text-zinc-600">{number}</span>

      <h3 className="mt-10 text-xl font-medium text-white">{title}</h3>

      <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-r border-white/10 p-7 md:min-h-64 md:p-9">
      <span className="text-xs text-violet-400">{number}</span>

      <h3 className="mt-10 text-xl font-medium text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">{description}</p>
    </div>
  );
}
