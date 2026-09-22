#!/usr/bin/env node
/**
 * Palette-literal lint (S2S v2, M1a).
 *
 * Contract: color VALUES live in the token layer (src/styles/tokens/**);
 * everything else in src/ consumes roles (--s2s-*). This check blocks NEW
 * raw palette literals anywhere else in src/:
 *   - hex colors            #rgb #rgba #rrggbb #rrggbbaa
 *   - color functions       rgb() rgba() hsl() hsla() hwb() lab() lch() oklab() oklch() color()
 *     (a function wrapping only a var(), e.g. hsl(var(--muted)), is a bridge, not a literal)
 *
 * Existing literals are grandfathered per file in
 * scripts/palette-literal-baseline.json. A file may never exceed its
 * baseline count (files absent from the baseline are allowed 0). The
 * baseline should only shrink: when a file drops below its count, run
 * `node scripts/check-palette-literals.mjs --update-baseline`.
 *
 * Exempt: the token sources, the frozen reader pin, and the signed-off
 * brand/diagram SVG geometry.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const BASELINE = join(ROOT, 'scripts', 'palette-literal-baseline.json');
const EXTENSIONS = /\.(astro|ts|tsx|js|jsx|mjs|css|mdx|md|json)$/;
const EXEMPT = [
  'src/styles/tokens/',
  'src/styles/reader-legacy.css',
  'src/components/brand/',
  'src/components/diagrams/',
];
const HEX = /(?<![&\w/#-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g;
const FUNC = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(\s*(?!var\()/g;

const posix = (p) => p.split(sep).join('/');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTENSIONS.test(name)) out.push(full);
  }
  return out;
}

function scan(file) {
  const hits = [];
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const re of [HEX, FUNC]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) hits.push({ line: i + 1, col: m.index + 1, text: line.trim().slice(0, 110) });
    }
  });
  return hits;
}

const current = {};
const details = {};
for (const file of walk(SRC)) {
  const rel = posix(relative(ROOT, file));
  if (EXEMPT.some((e) => rel.startsWith(e))) continue;
  const hits = scan(file);
  if (hits.length) {
    current[rel] = hits.length;
    details[rel] = hits;
  }
}

if (process.argv.includes('--update-baseline')) {
  const files = Object.fromEntries(Object.entries(current).sort(([a], [b]) => a.localeCompare(b)));
  const total = Object.values(files).reduce((a, b) => a + b, 0);
  writeFileSync(
    BASELINE,
    `${JSON.stringify(
      {
        version: 1,
        generated: new Date().toISOString().slice(0, 10),
        note: 'Grandfathered raw palette literals per file (pre-v2 debt). This list must only shrink; new colors belong in src/styles/tokens/ as --s2s-* roles.',
        files,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Wrote baseline: ${Object.keys(files).length} files, ${total} literals.`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE, 'utf8')).files ?? {};
const failures = [];
const shrunk = [];
for (const [file, count] of Object.entries(current)) {
  const allowed = baseline[file] ?? 0;
  if (count > allowed) failures.push({ file, count, allowed });
}
for (const [file, allowed] of Object.entries(baseline)) {
  if ((current[file] ?? 0) < allowed) shrunk.push(file);
}

if (failures.length) {
  console.error('New raw palette literals found:\n');
  for (const { file, count, allowed } of failures) {
    console.error(`  ${file}: ${count} (allowed ${allowed})`);
    for (const h of details[file].slice(0, 5)) console.error(`    ${h.line}:${h.col}  ${h.text}`);
  }
  console.error('\nUse a semantic role (--s2s-*) from src/styles/tokens/observatory.css; see docs/design/tokens.md.');
  process.exit(1);
}

if (shrunk.length) {
  console.log(`Notice: ${shrunk.length} file(s) now below their baseline; run with --update-baseline to lock the gain.`);
}
const total = Object.values(baseline).reduce((a, b) => a + b, 0);
console.log(`Palette literal check passed (${Object.keys(baseline).length} files grandfathered, ${total} literals).`);
