# S2S v2 shell (M1a)

| Piece | File | Notes |
|---|---|---|
| Base layout | `src/layouts/BaseLayout.astro` | safe JSON-LD + SEO from M0; dark boot with no flash (the `<html>` ships `.dark`; a stored `light` swaps it before paint); skip link; `reader` prop pins the pre-v2 reader and runs the page flush |
| Frame | `src/styles/shell.css` | ≥1280px: 1240px framed panel (1px rule, 16px radius) on a violet-lit backdrop, as in every mockup; below 1280px full-bleed |
| Header | `src/components/shell/SiteHeader.astro` | Lockup, Writing · Labs · Projects · Notebooks · Studio, search field (`SearchBox.tsx`), About, sun/moon switch (`ThemeSwitch.astro`); <1024px icon controls + menu sheet (with the Lite-mode toggle) |
| Footer | `src/components/shell/SiteFooter.astro` | mockup bar + a fine-print row (disclaimer, copyright) |
| Nav targets | `src/data/site.ts` | sections not built yet point at the nearest route: Writing→/essays/, Labs→/aos/, Notebooks→/dev-stories/, Studio→/portfolio/ui/ |

## Templates (`src/layouts/templates/`, previews under `/studio/templates/`, noindex)

- **HubLayout** — hero (`hero-actions`, `hero-aside`) + a 12-column section stack (`s2s-span-wide|narrow|half|full`) + `after`.
- **IndexRailLayout** — compact hero, `toolbar`, index (default), required `rail` (280px, sticky), `after`.
- **DetailRailLayout** — compact hero with `meta`, body at 720px (default), required `rail`, `related`.
- **FolioLayout** — cream leaf in `[data-skin="folio"]` (default), `margin`, `after`.

## Primitives (`/studio/primitives/`, noindex)

Reuse-first (ADR 004): `ui/Badge` gains `chip`, `live`, `count`, `label`; `ui/Button` gains
`signal`, `outline` (v1 variants untouched). New thin Astro primitives where nothing existing
carries the mockup chrome: `Card` (panel, feature, tile, inset), `SectionHeading`, `StatTile`,
`FilterToolbar` (native selects), `FacetRail`, `Tabs` (navigation tabs; for in-page panels wrap
`@miethe/ui` Tabs), `PageHero`, `MethodRail`.
