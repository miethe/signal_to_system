import { readFileSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Build-time token extraction for OG card rendering.
//
// satori (the OG image renderer) cannot resolve CSS custom properties at
// render time, so we parse the actual `.dark { ... }` role-token values out
// of src/styles/tokens/observatory.css once, at build time, and hand back a
// plain object of resolved color strings. This keeps the palette lint's
// single source of truth intact: nothing in src/lib/og/* hardcodes a hex
// value, it only reads the tokens file.
//
// Path is resolved from process.cwd() (the project root `astro build` is
// always invoked from), not import.meta.url — this module is bundled into
// dist/.prerender/chunks/* during the build, so a path relative to its own
// module location would resolve inside dist/, not the source tree.
// ---------------------------------------------------------------------------

const TOKENS_CSS_PATH = path.resolve(process.cwd(), "src/styles/tokens/observatory.css");

const REQUIRED_KEYS = [
  "--s2s-canvas",
  "--s2s-surface",
  "--s2s-rule-strong",
  "--s2s-ink",
  "--s2s-ink-soft",
  "--s2s-ink-muted",
  "--s2s-accent",
  "--s2s-accent-strong",
] as const;

export type ObservatoryTokenKey = (typeof REQUIRED_KEYS)[number];
export type ObservatoryTokens = Record<ObservatoryTokenKey, string>;

let cached: ObservatoryTokens | null = null;

/** Extract the `.dark { ... }` block body from the tokens CSS source. */
function extractDarkBlock(css: string): string {
  const match = css.match(/(?:^|\n)\.dark\s*\{([\s\S]*?)\n\}/);
  if (!match) {
    throw new Error(
      `src/lib/og/tokens.ts: could not find a ".dark { ... }" block in ${TOKENS_CSS_PATH}`
    );
  }
  return match[1];
}

function readValue(darkBlock: string, key: ObservatoryTokenKey): string {
  // Match "<key>: <value>;" — value is everything up to the next semicolon.
  const re = new RegExp(`(?:^|[\\s;])${key.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\s*:\\s*([^;]+);`);
  const match = darkBlock.match(re);
  if (!match) {
    throw new Error(`src/lib/og/tokens.ts: token ${key} not found in .dark block of ${TOKENS_CSS_PATH}`);
  }
  return match[1].trim();
}

/**
 * Read the dark-theme role token values ("Observatory dark") straight out of
 * src/styles/tokens/observatory.css. Cached for the lifetime of the build
 * process — the file does not change mid-build.
 */
export function getObservatoryDarkTokens(): ObservatoryTokens {
  if (cached) return cached;
  const css = readFileSync(TOKENS_CSS_PATH, "utf8");
  const darkBlock = extractDarkBlock(css);
  const values = {} as ObservatoryTokens;
  for (const key of REQUIRED_KEYS) {
    values[key] = readValue(darkBlock, key);
  }
  cached = values;
  return values;
}
