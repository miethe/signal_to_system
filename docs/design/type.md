# S2S v2 type system

Three roles, all self-hosted through `@fontsource-variable/*` (imported by
`src/styles/tokens/type.css`). There is no font CDN at runtime.

| Role | Face | Where | Fallback stack |
|---|---|---|---|
| display / serif | **Newsreader** (variable: opsz, wght 200–800, + italic) | wordmark, H1–H3, card titles, stat figures | `ui-serif, "Iowan Old Style", "Palatino Linotype", Georgia, serif` |
| sans (UI) | **Inter** (variable: opsz, wght, + italic) | nav, buttons, labels, body UI | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| mono (meta) | **JetBrains Mono** (variable) | dates, counts, code, figure microtext | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` |

Why: the mockups set every H1 and the wordmark in a light, high-contrast transitional serif.
Rendered side by side against the Home hero, Newsreader at its display optical size and wght
~360 matched the stroke contrast and the narrow `g`/`r` closely; Source Serif 4 (the other
candidate) read heavier and wider at display sizes and was removed. Inter covers the UI role; the
mockups' sans is a slightly rounder geometric face, the one visible gap (see the M1a PR).

Scale (`--type-*` in `type.css`): hero `clamp(2.5rem…3.25rem)`, display, title 26px, section
20px, card 17px, body 16px, UI 13px, nav 12px, meta 12px, micro 11px. Display weight 360,
headings 400, tracked caps 0.32em.

The pre-v2 reader faces (Noto Serif, Space Grotesk) are no longer loaded: since M2 the essay
reader (ReaderShell) uses the three v2 roles above, with Newsreader for body copy. Material
Symbols (used by the old Home and Projects bodies) is self-hosted the same way.
