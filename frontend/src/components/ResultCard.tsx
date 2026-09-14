interface ResultCardProps {
  title: string;
  items: string[];
  icon?: string;
}

export default function ResultCard({ title, items, icon }: ResultCardProps) {
  return (
    <div className="soft-card group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-lg shadow-inner shadow-violet-500/10">
              {icon}
            </span>
          )}

          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">No items found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 rounded-2xl border border-white/5 bg-slate-950/20 px-3 py-2.5 text-sm leading-relaxed text-slate-200"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/12 text-xs text-violet-300">
                •
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
