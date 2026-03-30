/**
 * ContextVisualizer — visual display of context key/value pairs.
 *
 * Stub component — renders a styled list of labelled context entries.
 * Intended to evolve into a richer interactive visualization.
 *
 * Usage in Astro:
 *   <ContextVisualizer
 *     client:visible
 *     contexts={[{ label: "System Prompt", value: "You are..." }]}
 *   />
 */

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $performanceMode } from "../../store/performanceStore";

interface ContextEntry {
  label: string;
  value: string;
  type?: "system" | "user" | "assistant" | "tool" | "generic";
}

interface ContextVisualizerProps {
  contexts: ContextEntry[];
  title?: string;
  className?: string;
}

const TYPE_CONFIG: Record<string, { label: string; cls: string; dot: string }> = {
  system:    { label: "System",    cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",  dot: "bg-violet-500" },
  user:      { label: "User",      cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",             dot: "bg-sky-500" },
  assistant: { label: "Assistant", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300", dot: "bg-indigo-500" },
  tool:      { label: "Tool",      cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",     dot: "bg-amber-500" },
  generic:   { label: "Context",   cls: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",            dot: "bg-zinc-400" },
};

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + "…" : str;
}

export default function ContextVisualizer({
  contexts,
  title = "Context Window",
  className = "",
}: ContextVisualizerProps) {
  const mode = useStore($performanceMode);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  if (contexts.length === 0) {
    return (
      <div className={`rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 ${className}`}>
        No context entries provided.
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 ${className}`}
      aria-label={title}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-400" aria-hidden="true">
            {"<"}ctx{">"}
          </span>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h3>
        </div>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
          {contexts.length} {contexts.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Entries */}
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {contexts.map((ctx, i) => {
          const typeCfg = TYPE_CONFIG[ctx.type ?? "generic"] ?? TYPE_CONFIG.generic;
          const isExpanded = expanded.has(i);
          const isLong = ctx.value.length > 120;

          return (
            <li key={i} className="bg-white px-4 py-3 dark:bg-zinc-900">
              {/* Row header */}
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${typeCfg.dot}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {ctx.label}
                    </span>
                    {ctx.type && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeCfg.cls}`}>
                        {typeCfg.label}
                      </span>
                    )}
                  </div>

                  {/* Value */}
                  <p className="mt-1 font-mono text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 whitespace-pre-wrap break-words">
                    {isExpanded || !isLong ? ctx.value : truncate(ctx.value, 120)}
                  </p>

                  {isLong && mode === "rich" && (
                    <button
                      onClick={() => toggle(i)}
                      className="mt-1 text-xs text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
