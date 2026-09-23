# OG image template (M1b)

Build-time Open Graph cards, "Observatory dark". 1200x630 PNG, generated once per
`astro build` as static endpoints — there is no runtime image server.

| Piece | File | Notes |
|---|---|---|
| Tokens | `src/lib/og/tokens.ts` | parses the `.dark { ... }` block of `src/styles/tokens/observatory.css` at build time (`--s2s-canvas`, `--s2s-surface`, `--s2s-rule-strong`, `--s2s-ink`, `--s2s-ink-soft`, `--s2s-ink-muted`, `--s2s-accent`, `--s2s-accent-strong`); nothing in `src/lib/og/*` hardcodes a hex value |
| Renderer | `src/lib/og/render.ts` | builds a plain object tree (no JSX/React needed — satori accepts `{type, props}` directly), lays it out with `satori`, rasterizes with `@resvg/resvg-js` |
| Endpoint | `src/pages/og/[...slug].png.ts` | `getStaticPaths` enumerates `default`, `essays/<id>` (published posts), `dev-stories/<id>` (published stories), `series/<id>` (every series); `GET` renders and returns the PNG |

## Fonts

satori needs TTF/OTF/WOFF (not woff2), so the OG renderer uses the static
`@fontsource/*` packages (not the `@fontsource-variable/*` ones the rest of the
site uses) and reads their latin `.woff` files directly out of `node_modules`:
Newsreader 400, Inter 400 + 500, JetBrains Mono 400.

The latin subset doesn't include the arrow glyph (U+2192), so the default
card's kicker is written as ASCII `"IDEAS -> EVIDENCE -> SYSTEMS"` rather than
`"IDEAS → EVIDENCE → SYSTEMS"` — Inter's contextual-alternates feature renders
that sequence as a single arrow glyph, but a literal `→` codepoint not in the
embedded subset would render as a tofu box.

## Layout

- Canvas 1200x630, filled `--s2s-canvas`. A 1px `--s2s-rule-strong` inset frame
  (24px inset, 16px radius) sits on top of everything.
- Right side: `public/images/v2/hero/observatory-1024.webp`, re-encoded to a
  JPEG data URI with `sharp` (satori cannot decode webp), placed full-height,
  760px wide, right edge flush, `object-fit: cover`. A left-to-right veil
  (`--s2s-canvas` solid from x=0 to x=380, fading to transparent by x=900)
  keeps the dome visible on the right while the left two-thirds stay legible.
- Content column, 64px padding, 700px max width: brand row (the waveform mark
  + "Signal to System" + "BY NICK MIETHE"), a tracked-caps kicker (ESSAY /
  BUILD NOTE / SERIES / the default tagline), the title (Newsreader, stepped
  64/54/46px by title length so it never exceeds 3 lines — capped with
  satori's `-webkit-line-clamp` as a backstop), and a JetBrains Mono meta line
  (date + read time, part count, or `nickmiethe.com` for the default card).
- `nickmiethe.com` repeats bottom-left (56px above the bottom edge) on every
  card except the default one, whose meta line already says it.

### Brand mark

The brand row embeds `public/brand/mark-mono.svg` (not the gradient
`mark.svg`) as a base64 SVG data URI, with a `color` attribute injected onto
its root `<svg>` so its `fill="currentColor"` geometry resolves to the ink
token — the file's own designed color mechanism, no geometry touched.
`mark.svg`'s gradient stops are set via `var(--mark-top, ...)` CSS custom
properties, which resvg's embedded-SVG renderer does not resolve, and would
render as an unreadable near-black shape on the dark canvas.

## `ogImage` precedence

`PostLayout` / `StoryLayout` / `SeriesLayout` (via `src/pages/essays/`,
`src/pages/dev-stories/`, `src/pages/series/`) resolve OG image as:

```
frontmatter `ogImage` (if set) > generated `/og/<route>/<id>.png`
```

Posts already carried an optional `ogImage` frontmatter field; `ogImage` was
added to the stories and series schemas (`src/content.config.ts`) so the same
precedence applies uniformly. `src/data/site.ts`'s `defaultOgImage` points at
`/og/default.png`.

## Not counted as a route

`/og/**.png` endpoints are excluded from `scripts/route-snapshot.mjs`'s
`toRoute()` (it only matches `.html`/`.xml`/`.json`) and are not listed in
`docs/project_plans/s2s-v2/migration-manifest.json` — `npm run test:routes`
does not see them. Coverage lives in `tests/m0/og.test.mjs` instead: it reads
the built `dist/og/**` PNGs directly (IHDR bytes for dimensions, file
existence per published route) after `npm run build`.
