import { useState } from "react";
import { BulkActionBar, type BulkAction } from "@miethe/ui/bulk-actions";

const items = ["alpha.md", "beta.md", "gamma.md", "delta.md"];

export function BulkActionBarDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (path: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  const actions: BulkAction[] = [
    {
      id: "publish",
      label: "Publish",
      variant: "default",
      onClick: () =>
        new Promise<void>((resolve) => {
          window.setTimeout(() => {
            window.alert(`Published ${selected.size} item(s).`);
            setSelected(new Set());
            resolve();
          }, 600);
        }),
    },
    {
      id: "delete",
      label: "Delete",
      variant: "destructive",
      onClick: () => {
        setSelected(new Set());
      },
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Toggle selection to reveal the floating bar at the bottom of the page.
      </p>
      <ul className="divide-y divide-[var(--color-border-subtle)] rounded-md border border-[var(--color-border-subtle)]">
        {items.map((path) => (
          <li key={path} className="flex items-center gap-3 px-3 py-2">
            <input
              type="checkbox"
              checked={selected.has(path)}
              onChange={() => toggle(path)}
              aria-label={`Select ${path}`}
            />
            <span className="font-mono text-sm">{path}</span>
          </li>
        ))}
      </ul>
      <BulkActionBar
        selectedCount={selected.size}
        hasSelection={selected.size > 0}
        actions={actions}
        onClearSelection={() => setSelected(new Set())}
      />
    </div>
  );
}
