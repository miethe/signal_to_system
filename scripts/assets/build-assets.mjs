#!/usr/bin/env node
/**
 * S2S v2 raster asset pipeline.
 *
 * Reads scripts/assets/asset-manifest.json and the visual pack
 * (docs/design/s2s-v2-visual by default; pass --source <dir> otherwise),
 * then writes AVIF + WebP derivatives under public/images/v2:
 *
 *   hero/<id>-<w>.{avif,webp}      photographic hero bands, baked copy patched out
 *   backdrop/<id>.{avif,webp}      softened page backdrop behind the frame
 *   stickers/<id>.{avif,webp}      transparent keeper stickers, alpha-trimmed
 *   manifest.json                  what was written, with pixel sizes (read by src/lib/images.ts)
 *
 * Patching: each patch keeps the target's own low-pass tone and borrows the
 * high-pass star texture of a clean `from` block, through a feathered mask,
 * so baked labels disappear without a visible seam. Deterministic: same sources + manifest -> same bytes.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(new URL('../..', import.meta.url).pathname);
const args = process.argv.slice(2);
const sourceArg = args.indexOf('--source');
const sourceDir = resolve(sourceArg >= 0 ? args[sourceArg + 1] : join(root, 'docs/design/s2s-v2-visual'));
const manifest = JSON.parse(await readFile(join(root, 'scripts/assets/asset-manifest.json'), 'utf8'));
const outDir = join(root, manifest.outDir);

if (!existsSync(sourceDir)) {
  console.error(`Visual pack not found at ${sourceDir}. Pass --source <dir>.`);
  process.exit(1);
}

const written = { hero: {}, backdrop: {}, stickers: {} };

async function emit(pipeline, base) {
  const { avif, webp } = manifest.formats;
  const a = await pipeline.clone().avif(avif).toFile(`${base}.avif`);
  const w = await pipeline.clone().webp(webp).toFile(`${base}.webp`);
  return { width: w.width, height: w.height, avifBytes: a.size, webpBytes: w.size };
}

async function featherMask(w, h, feather) {
  const inset = Math.max(1, Math.round(feather / 2));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" fill="#fff"/></svg>`;
  return sharp(Buffer.from(svg)).blur(Math.max(0.3, feather / 2.5)).extractChannel(0).raw().toBuffer();
}

/**
 * Patch = local tone + transplanted texture. The low-pass of the target
 * region (sigma 28, wide enough that thin baked type barely registers)
 * keeps the sky's gradient; the high-pass of a clean `from` block supplies
 * stars and grain. A feathered mask hides the edge.
 */
async function patched(hero) {
  const src = join(sourceDir, hero.source);
  const { data: base, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  if (!hero.patches?.length) return sharp(base, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer();
  const low = await sharp(base, { raw: { width: W, height: H, channels: 3 } }).blur(28).raw().toBuffer();
  const out = Buffer.from(base);
  for (const p of hero.patches) {
    const [x, y, w, h] = p.box;
    const [fx, fy] = p.from;
    const mask = await featherMask(w, h, p.feather ?? 12);
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const a = mask[j * w + i] / 255;
        if (a === 0) continue;
        const t = ((y + j) * W + (x + i)) * 3;
        const s = ((fy + j) * W + (fx + i)) * 3;
        for (let c = 0; c < 3; c++) {
          const v = low[t + c] + (base[s + c] - low[s + c]);
          const clamped = Math.max(0, Math.min(255, v));
          out[t + c] = Math.round(base[t + c] * (1 - a) + clamped * a);
        }
      }
    }
  }
  return sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer();
}

await mkdir(join(outDir, 'hero'), { recursive: true });
await mkdir(join(outDir, 'backdrop'), { recursive: true });
await mkdir(join(outDir, 'stickers'), { recursive: true });

const heroBuffers = {};
for (const hero of manifest.heroes) {
  let buf = await patched(hero);
  if (hero.crop) {
    const [left, top, width, height] = hero.crop;
    buf = await sharp(buf).extract({ left, top, width, height }).png().toBuffer();
  }
  heroBuffers[hero.id] = buf;
  written.hero[hero.id] = [];
  for (const width of hero.widths) {
    const info = await emit(sharp(buf).resize({ width, withoutEnlargement: true }), join(outDir, 'hero', `${hero.id}-${width}`));
    written.hero[hero.id].push(info);
  }
}

for (const bd of manifest.backdrops) {
  const buf = bd.usePatchedHero ? heroBuffers[bd.usePatchedHero] : await sharp(join(sourceDir, bd.source)).png().toBuffer();
  const pipeline = sharp(buf).resize({ width: bd.width }).blur(bd.blur ?? 2);
  written.backdrop[bd.id] = await emit(pipeline, join(outDir, 'backdrop', bd.id));
}

const sheet = join(sourceDir, manifest.stickers.source);
for (const s of manifest.stickers.items) {
  const [left, top, width, height] = s.box;
  let cut = await sharp(sheet).extract({ left, top, width, height }).png().toBuffer();
  if (s.clip) {
    const pts = s.clip.map(([px, py]) => `${px - left},${py - top}`).join(' ');
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><polygon points="${pts}" fill="#fff"/></svg>`);
    cut = await sharp(cut).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  }
  const trimmed = await sharp(cut).trim({ threshold: 4 }).png().toBuffer();
  const pipeline = sharp(trimmed).resize({ width: manifest.stickers.maxWidth, withoutEnlargement: true });
  written.stickers[s.id] = await emit(pipeline, join(outDir, 'stickers', s.id));
}

await writeFile(join(outDir, 'manifest.json'), `${JSON.stringify(written, null, 2)}\n`);
const total = Object.values(written).flatMap((g) => Object.values(g)).flat()
  .reduce((n, i) => n + i.avifBytes + i.webpBytes, 0);
console.log(`Wrote ${manifest.outDir} (${(total / 1024).toFixed(0)} KiB total).`);
