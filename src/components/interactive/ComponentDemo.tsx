/**
 * ComponentDemo — live component demo viewer stub.
 *
 * Shows a named component in a sandboxed-looking frame.
 * The actual component rendering is handled by a registry pattern —
 * register components in the DEMO_REGISTRY map below.
 *
 * Usage in Astro:
 *   <ComponentDemo client:visible componentName="Badge" />
 */

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $performanceMode } from "../../store/performanceStore";

// ---------------------------------------------------------------------------
// Demo registry — add live demo renderers here as the site grows
// ---------------------------------------------------------------------------

type DemoRenderer = () => React.ReactNode;

const DEMO_REGISTRY: Record<string, DemoRenderer> = {
  // Examples — replace with real component imports
  Badge: () => (
    <div className="flex flex-wrap gap-2">
      {["default", "category", "status", "type"].map((v) => (
        <span
          key={v}
          className={[
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            v === "default"   ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" : "",
            v === "category"  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : "",
            v === "status"    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" : "",
            v === "type"      ? "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300" : "",
          ].join(" ")}
        >
          {v}
        </span>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------

interface ComponentDemoProps {
  componentName: string;
  description?: string;
  className?: string;
}

export default function ComponentDemo({
  componentName,
  description,
  className = "",
}: ComponentDemoProps) {
  const mode = useStore($performanceMode);
  const [tab, setTab] = useState<"preview" | "info">("preview");

  const hasRenderer = Object.prototype.hasOwnProperty.call(DEMO_REGISTRY, componentName);
  const renderer: DemoRenderer | undefined = hasRenderer ? DEMO_REGISTRY[componentName as keyof typeof DEMO_REGISTRY] : undefined;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 ${className}`}
      aria-label={`Demo: ${componentName}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-600" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-600" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 dark:bg-emerald-600" aria-hidden="true" />
          <span className="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            &lt;{componentName} /&gt;
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden text-xs">
          {(["preview", "info"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "px-3 py-1 capitalize transition-colors",
                tab === t
                  ? "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                  : "bg-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Preview panel */}
      {tab === "preview" && (
        <div className="flex min-h-32 items-center justify-center bg-white p-8 dark:bg-zinc-950">
          {renderer ? (
            renderer()
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {componentName}
              </p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                {mode === "lite"
                  ? "Enable rich mode to see interactive preview"
                  : "No demo registered for this component"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info panel */}
      {tab === "info" && (
        <div className="bg-white p-6 dark:bg-zinc-950">
          <h3 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {componentName}
          </h3>
          {description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
          )}
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
            {renderer
              ? "Live demo available above."
              : "Register this component in the DEMO_REGISTRY to enable live preview."}
          </p>
        </div>
      )}
    </div>
  );
}
