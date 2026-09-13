export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">
          <span className="text-white">
            Career
          </span>

          <span className="text-violet-400">
            Match
          </span>

          <span className="text-white">
            AI
          </span>
        </div>

        <a
          href="#analyzer"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-200 transition hover:bg-white/10"
        >
          Analyze CV
        </a>
      </div>
    </nav>
  );
}