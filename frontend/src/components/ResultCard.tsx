interface ResultCardProps {
  title: string;
  items: string[];
  icon?: string;
}

export default function ResultCard({
  title,
  items,
  icon,
}: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        {icon && (
          <span className="text-xl">
            {icon}
          </span>
        )}

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No items found.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 text-sm leading-relaxed text-gray-300"
            >
              <span className="mt-1 text-violet-400">
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