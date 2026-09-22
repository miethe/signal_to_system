/**
 * Build-time loader for the hand-authored SVGs in src/assets/{icons,ornaments}.
 *
 * Files stay readable on disk; this module prepares them for inlining:
 *  - strips the source <title> (callers decide decorative vs labelled),
 *  - makes every id unique per instance so gradients never resolve against
 *    another instance's currentColor (which would leak one language's color
 *    into another section of the same page).
 */
const icons = import.meta.glob('../../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ornaments = import.meta.glob('../../assets/ornaments/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const byName = (files: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(files).map(([path, src]) => [path.split('/').pop()!.replace(/\.svg$/, ''), src]),
  );

const ICONS = byName(icons);
const ORNAMENTS = byName(ornaments);

export const iconNames = Object.keys(ICONS).sort();
export const ornamentNames = Object.keys(ORNAMENTS).sort();
export type SvgSet = 'icons' | 'ornaments';

let counter = 0;

export interface ParsedSvg {
  /** Attributes of the root <svg>, minus xmlns. */
  attrs: Record<string, string>;
  /** Inner markup with <title> removed and ids made unique. */
  inner: string;
  /** Title text from the source file. */
  title: string;
}

export function loadSvg(set: SvgSet, name: string): ParsedSvg {
  const src = (set === 'icons' ? ICONS : ORNAMENTS)[name];
  if (!src) {
    throw new Error(`Unknown ${set} SVG "${name}". Available: ${(set === 'icons' ? iconNames : ornamentNames).join(', ')}`);
  }
  const open = src.match(/<svg\b([^>]*)>/)!;
  const attrs: Record<string, string> = {};
  for (const [, k, v] of open[1].matchAll(/([\w:-]+)="([^"]*)"/g)) {
    if (k !== 'xmlns') attrs[k] = v;
  }
  const title = src.match(/<title>([^<]*)<\/title>/)?.[1] ?? name;
  let inner = src
    .slice(open.index! + open[0].length, src.lastIndexOf('</svg>'))
    .replace(/\s*<title>[^<]*<\/title>/, '')
    .trim();

  const ids = [...inner.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (ids.length) {
    const suffix = `-${++counter}`;
    for (const id of ids) {
      inner = inner
        .replaceAll(`id="${id}"`, `id="${id}${suffix}"`)
        .replaceAll(`url(#${id})`, `url(#${id}${suffix})`)
        .replaceAll(`href="#${id}"`, `href="#${id}${suffix}"`);
    }
  }
  return { attrs, inner, title };
}
