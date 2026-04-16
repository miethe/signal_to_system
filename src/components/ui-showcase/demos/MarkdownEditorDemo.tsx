import { useState } from "react";
import { MarkdownEditor } from "@miethe/ui/editor";

const initial = `# Hello

Edit me. The value updates below.

- CodeMirror 6
- Markdown syntax highlighting
- Light / dark theme following system preference
`;

export function MarkdownEditorDemo() {
  const [value, setValue] = useState(initial);
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border border-[var(--color-border-subtle)]">
        <MarkdownEditor initialContent={initial} onChange={setValue} />
      </div>
      <p className="text-xs text-[var(--color-text-tertiary)]">
        {value.length} characters · {value.split(/\s+/).filter(Boolean).length}{" "}
        words
      </p>
    </div>
  );
}
