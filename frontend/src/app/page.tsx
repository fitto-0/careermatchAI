import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      <Navbar />
      <Hero />
      <Analyzer />

      <footer className="border-t border-white/10 bg-slate-950/50 px-6 py-8 text-center text-sm text-slate-400">
        CareerMatch AI · AI-powered CV analysis
      </footer>
    </main>
  );
}
