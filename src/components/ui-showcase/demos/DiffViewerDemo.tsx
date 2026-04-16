import { DiffViewer } from "@miethe/ui/diff";

const files = [
  {
    file_path: "README.md",
    status: "modified" as const,
    unified_diff: `@@ -1,6 +1,8 @@
 # @miethe/ui

-A reusable UI component library.
+A reusable UI component library extracted from SkillMeat.
+
+Ships content-viewer, diff, editor, and primitives submodules.

 ## Install

`,
  },
  {
    file_path: "CHANGELOG.md",
    status: "added" as const,
    unified_diff: `@@ -0,0 +1,3 @@
+# Changelog
+
+## 0.2.0 — Initial public release
`,
  },
];

export function DiffViewerDemo() {
  return (
    <DiffViewer files={files} leftLabel="main" rightLabel="feature/readme" />
  );
}
