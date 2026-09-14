import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <Hero />
      <Analyzer />

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        CareerMatch AI · AI-powered CV analysis
      </footer>
    </main>
  );
}
