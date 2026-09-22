# Raster assets (S2S v2)

Photographs and stickers from the visual pack are processed once and committed as
AVIF + WebP under `public/images/v2/`. The site build never reads the 2 MB sources.

- **Source of truth:** `scripts/assets/asset-manifest.json`. It holds every crop box, clip
  polygon and baked-text patch in source pixels, plus the drop list with a reason for each.
- **Regenerate:** `npm run assets:build -- --source <visual pack>`. The default source is
  `docs/design/s2s-v2-visual`, which lands with the plan branch.
- **Use:** `<V2Image kind="hero|sticker|backdrop" id="…" />` (`src/components/media/V2Image.astro`).
  It writes a `<picture>` with intrinsic sizes read from `public/images/v2/manifest.json`.

| Output | Where it shows |
|---|---|
| `hero/observatory-*` | Home and About hero band (`PageHero photo="observatory"`). The baked IDEAS/EVIDENCE/SYSTEMS label, the constellation, the OBSERVE rail and the caption are patched out and rebuilt as HTML. |
| `backdrop/observatory-backdrop` | Page field behind the 1240px frame at ≥1280px, dark theme only (`--s2s-backdrop-photo`). |
| `hero/notebook-vista-*` | Quiet-state art: 404, empty results, withdrawn. This is a text-free crop. |
| `stickers/{observatory,mountain-arc,notebook,signal-noise}` | Keeper accents: About, Labs "in preparation", Notebook, Studio. |

**Patching.** Each patch keeps the target region's own low-pass tone and takes the high-pass
star texture from a clean block, blended through a feathered mask. The result is seamless on
the night sky. Only thin, faint constellation arcs remain, and they read as sky at hero scale.
