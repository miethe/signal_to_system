/**
 * AgenticDiagram — diagram visualization stub.
 *
 * Renders a styled placeholder showing the diagram type.
 * Intended to be replaced with a real diagram renderer (e.g. Mermaid, D3).
 *
 * Usage in Astro:
 *   <AgenticDiagram client:visible type="agent-loop" data={{ ... }} />
 */

import { useStore } from "@nanostores/react";
import { $performanceMode } from "../../store/performanceStore";

interface AgenticDiagramProps {
  type: string;
  data?: Record<string, unknown>;
  title?: string;
  className?: string;
}

const DIAGRAM_ICONS: Record<string, string> = {
  "agent-loop": "↻",
  "context-flow": "⇌",
  "pipeline": "→",
  "hierarchy": "⊤",
  "network": "⬡",
};

export default function AgenticDiagram({
  type,
  data,
  title,
  className = "",
}: AgenticDiagramProps) {
  const mode = useStore($performanceMode);
  const icon = DIAGRAM_ICONS[type] ?? "⊞";
  const label = title ?? type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <figure
      className={`my-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
      aria-label={`Diagram: ${label}`}
    >
      {/* Placeholder body */}
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-8">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl dark:bg-indigo-950"
          aria-hidden="true"
        >
          {icon}
        </span>

        <div className="text-center">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">{label}</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {mode === "lite"
              ? "Interactive diagram (enable rich mode to view)"
              : "Diagram visualization — implementation pending"}
          </p>
        </div>

        {/* Debug: show data keys if provided */}
        {data && Object.keys(data).length > 0 && (
          <details className="mt-2 w-full max-w-sm">
            <summary className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
              Diagram data ({Object.keys(data).length} keys)
            </summary>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        )}
      </div>

      {/* Caption */}
      <figcaption className="border-t border-zinc-200 bg-white px-4 py-2 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
        {label} · <code className="font-mono">{type}</code>
      </figcaption>
    </figure>
  );
}
