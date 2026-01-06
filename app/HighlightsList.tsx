import { ExternalLink } from "lucide-react";
import type { HomeHighlight } from "./homeHighlights";

export function HighlightsList({
  title = "Recent highlights",
  items,
}: {
  title?: string;
  items: HomeHighlight[];
}) {
  return (
    <div className="mt-3">
      <p className="font-mono text-indigo-200/80 text-xs mb-2">{title}</p>

      <ul className="space-y-2">
        {items.map((h) => (
          <li key={`${h.title}-${h.href}`} className="flex items-start gap-2">
            <span className="mt-1 text-indigo-200/70">•</span>

            <div className="min-w-0">
              <a
                href={h.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/25 hover:decoration-white text-indigo-50"
              >
                <span className="font-semibold">{h.title}</span>
                <ExternalLink size={12} className="inline ml-1 opacity-80" />
              </a>

              <div className="text-sm text-indigo-100/85 leading-snug">
                {h.description}
              </div>

              {h.tag && (
                <div className="mt-1">
                  <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/10 text-indigo-200/90 border border-white/10">
                    {h.tag}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
