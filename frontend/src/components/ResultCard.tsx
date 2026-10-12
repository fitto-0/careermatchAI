interface ResultCardProps {
  title: string;
  items: string[];
}

export default function ResultCard({ title, items }: ResultCardProps) {
  return (
    <div className="bg-[#0a0a0a] p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="label">{title}</h3>

        <span className="font-mono text-xs text-zinc-500">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to report.</p>
      ) : (
        <ul className="divide-y divide-white/5">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-4 py-3 text-sm leading-6 text-zinc-200"
            >
              <span className="pt-px font-mono text-xs leading-6 text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
