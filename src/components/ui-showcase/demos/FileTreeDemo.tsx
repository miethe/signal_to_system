import { useState } from "react";
import { FileTree } from "@miethe/ui/content-viewer";

const files = [
  {
    name: "docs",
    path: "docs",
    type: "directory" as const,
    children: [
      { name: "getting-started.md", path: "docs/getting-started.md", type: "file" as const },
      { name: "api-reference.md", path: "docs/api-reference.md", type: "file" as const },
    ],
  },
  {
    name: "src",
    path: "src",
    type: "directory" as const,
    children: [
      {
        name: "components",
        path: "src/components",
        type: "directory" as const,
        children: [
          { name: "Button.tsx", path: "src/components/Button.tsx", type: "file" as const },
          { name: "Card.tsx", path: "src/components/Card.tsx", type: "file" as const },
        ],
      },
      { name: "index.ts", path: "src/index.ts", type: "file" as const },
    ],
  },
  { name: "README.md", path: "README.md", type: "file" as const },
  { name: "package.json", path: "package.json", type: "file" as const },
];

export function FileTreeDemo() {
  const [selectedPath, setSelectedPath] = useState<string | null>(
    "docs/getting-started.md",
  );
  return (
    <div className="max-w-md">
      <FileTree
        entityId="demo-artifact"
        files={files as never}
        selectedPath={selectedPath}
        onSelect={setSelectedPath}
        readOnly
        ariaLabel="Demo file tree"
      />
      <p className="mt-3 text-xs text-[var(--color-text-tertiary)]">
        Selected: <code>{selectedPath ?? "none"}</code>
      </p>
    </div>
  );
}
