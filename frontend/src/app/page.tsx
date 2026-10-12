import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Analyzer", href: "#analyzer" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
    ],
  },
  {
    title: "Analysis",
    links: [
      { label: "Match score", href: "#features" },
      { label: "Strengths", href: "#features" },
      { label: "Skill gaps", href: "#features" },
      { label: "Recommendations", href: "#features" },
    ],
  },
  {
    title: "Built with",
    links: [
      { label: "Next.js" },
      { label: "FastAPI" },
      { label: "LangChain" },
      { label: "Groq" },
    ],
  },
  {
    title: "Get started today",
    links: [
      { label: "Upload your CV", href: "#analyzer" },
      { label: "Paste a job description", href: "#analyzer" },
      { label: "Get your match", href: "#analyzer" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f4]">
      <Navbar />

      <Hero />

      <section id="how-it-works">
        <div className="container-main py-24 md:py-32">
          <SectionHeading index="01" label="How it works">
            Three inputs. <span className="text-white">One honest</span>
            <br />
            analysis.
          </SectionHeading>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <Step
              number="01"
              title="Upload your CV"
              description="Drop a PDF or paste the text directly."
            />

            <Step
              number="02"
              title="Add the job"
              description="Paste the description of the role you want."
            />

            <Step
              number="03"
              title="Get your match"
              description="Receive a score, strengths, gaps and next steps."
            />
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container-main py-24 md:py-32">
          <SectionHeading index="02" label="What you get">
            A <span className="text-white">clearer picture</span>
            <br />
            before you apply.
          </SectionHeading>

          <div className="grid border-t border-white/10 md:grid-cols-2">
            <Feature
              number="01"
              title="Match score"
              description="An overall compatibility score based on the skills and experience found in your CV."
            />

            <Feature
              number="02"
              title="Strengths"
              description="The parts of your profile that already align strongly with the position."
            />

            <Feature
              number="03"
              title="Missing skills"
              description="Important requirements that are not clearly represented in your CV."
            />

            <Feature
              number="04"
              title="Recommendations"
              description="Practical suggestions to strengthen your profile for this role."
            />
          </div>
        </div>
      </section>

      <Analyzer />

      <footer>
        <div className="container-main pb-10 pt-24">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="label mb-5">{column.title}</p>

                <ul className="space-y-3 text-sm text-zinc-200">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"href" in link && link.href ? (
                        <a
                          href={link.href}
                          className="transition hover:text-zinc-400"
                        >
                          {link.label}
                        </a>
                      ) : (
                        link.label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-8">
            <p className="label">
              © {new Date().getFullYear()} CareerMatch AI. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16 md:mb-20">
      <p className="label mb-6">
        {index} — {label}
      </p>

      <h2 className="font-mono text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.03em] text-zinc-400">
        {children}
      </h2>
    </div>
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
    <div className="flex gap-6 border-b border-white/10 py-8 md:odd:pr-10 md:even:pl-10">
      <span className="label pt-1">{number}</span>

      <div>
        <h3 className="text-lg text-white">{title}</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
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
    <div className="border-t border-white/10 pt-6">
      <span className="label">{number}</span>

      <h3 className="mt-8 text-lg text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}
