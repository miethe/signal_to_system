#!/usr/bin/env node
/**
 * check-essay.mjs
 *
 * Machine checklist for the S2S essay standard (docs/authoring/essay-standard.md §6).
 * Scans every post with `contentType: essay` (or the files given on the command line)
 * and reports errors (exit 1) and warnings (advisory). Zero dependencies, zero network.
 *
 * It proves structure and hygiene only. It does not prove voice, accuracy, or argument
 * quality; those are the editorial and cross-family review passes.
 *
 * Usage:
 *   node scripts/check-essay.mjs                  # all essays under src/content/posts
 *   node scripts/check-essay.mjs path/to/a.mdx    # specific files
 *   node scripts/check-essay.mjs --json           # machine-readable
 *   npm run check:essay
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, relative } from "node:path";

const ROOT = process.cwd();
const POSTS = join(ROOT, "src", "content", "posts");
const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const files = args.filter((a) => !a.startsWith("--"));

const REQUIRED_FM = [
  "title", "excerpt", "date", "readTime", "contentType", "format", "category", "tags",
  "status", "whyItMatters", "leaderTakeaway", "relatedSlugs", "seoTitle", "seoDescription",
];
const RECOMMENDED_FM = ["heroImage", "heroAlt", "heroPlacement", "draftNotes"];
const CLAIM_KINDS = new Set(["observed", "measured", "proposed", "related-work", "external", "hypothesis"]);
const IMPL_STATUS = new Set(["IMPLEMENTED", "PARTIAL", "PROPOSED", "TO TEST"]);
const ADVISORY_TELLS = [/\bdelve\b/i, /\bin today's\b/i, /\bit'?s worth noting\b/i, /\bnot only\b[^.]{0,80}\bbut also\b/i, /\btapestry\b/i, /\blandscape of\b/i];
const ID_LEAKS = [
  [/\b(node|req|tree|evid|ws|gate)_[0-9A-Z]{10,}\b/, "tracker id"],
  [/\bPR\s*#\d+\b/i, "PR number"],
  [/(^|[\s(])#\d{2,5}\b/, "PR/issue ref"],
  [/\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b/, "commit SHA"],
];
const IGNORE = /prose-lint-ignore/;

function readJsonPaths() {
  try { return JSON.parse(readFileSync(join(ROOT, "src/data/reading-paths.json"), "utf8")); } catch { return { paths: [] }; }
}
const ARC_SLUGS = new Set(readJsonPaths().paths.flatMap((p) => p.steps.map((s) => s.slug)).filter(Boolean));
const GLOSSARY = new Set([...readFileSync(join(ROOT, "src/data/glossary.ts"), "utf8").matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{/gm)].map((m) => m[1]));
const threadsSrc = readFileSync(join(ROOT, "src/data/threads.ts"), "utf8");
const POST_SLUGS = new Set(readdirSync(POSTS).filter((f) => /\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, "")));

function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? { fm: m[1], body: src.slice(m[0].length) } : { fm: "", body: src };
}
function fmKeys(fm) {
  return new Set([...fm.matchAll(/^([A-Za-z][A-Za-z0-9]*):/gm)].map((m) => m[1]));
}
function fmScalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m"));
  return m ? m[1].trim() : undefined;
}
function fmList(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s.*\\n?)+)`, "m"));
  if (!m) return [];
  return [...m[1].matchAll(/-\s+"?([^"\n]+)"?/g)].map((x) => x[1].trim());
}

/** Body lines that are prose: outside code fences, frontmatter, imports, JSX attribute blocks, footnote defs. */
function proseLines(body) {
  const out = [];
  let fence = false, jsx = 0;
  body.split("\n").forEach((line, i) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    if (fence) return;
    if (/^import\s/.test(line)) return;
    // A component tag left open on this line (attributes continue below) starts a JSX block;
    // a line whose tags close on the same line (e.g. `<ClaimBadge kind="x" /> prose`) is prose.
    if (jsx === 0 && /^\s*<[A-Z][A-Za-z]*(\s|$)/.test(line) && !line.includes(">")) { jsx = 1; return; }
    if (jsx > 0) { if (/^\s*\/?>\s*$|\/>\s*$|^\s*>/.test(line)) jsx = 0; return; }
    if (/^\s*<\/?[A-Z][A-Za-z]*[^>]*>\s*$/.test(line)) return;
    if (/^\[\^[^\]]+\]:/.test(line)) return;
    if (/^\{\/\*/.test(line)) return;
    out.push({ n: i + 1, text: line });
  });
  return out;
}

function checkFile(path) {
  const rel = relative(ROOT, path);
  const slug = basename(path).replace(/\.mdx?$/, "");
  const src = readFileSync(path, "utf8");
  const { fm, body } = splitFrontmatter(src);
  const bodyOffset = src.slice(0, src.length - body.length).split("\n").length - 1;
  const errors = [], warnings = [];
  const E = (id, msg) => errors.push({ id, msg });
  const W = (id, msg) => warnings.push({ id, msg });
  const keys = fmKeys(fm);

  // F1-F4
  const missing = REQUIRED_FM.filter((k) => !keys.has(k));
  if (missing.length) E("F1", `missing frontmatter: ${missing.join(", ")}`);
  for (const s of fmList(fm, "relatedSlugs")) if (!POST_SLUGS.has(s)) E("F2", `relatedSlugs entry not a post: ${s}`);
  if (keys.has("series") && !keys.has("seriesOrder")) E("F3", "series without seriesOrder");
  const rec = RECOMMENDED_FM.filter((k) => !keys.has(k));
  if (rec.length) W("F4", `recommended frontmatter absent: ${rec.join(", ")}`);

  // S1-S6
  if (!/<ExecutiveSignal\b/.test(body)) E("S1", "no <ExecutiveSignal>");
  const thesis = (body.match(/<PullQuote[^>]*variant="thesis-marker"/g) || []).length;
  if (thesis !== 1) E("S2", `expected exactly 1 thesis-marker PullQuote, found ${thesis}`);
  if (ARC_SLUGS.has(slug)) {
    const wts = body.match(/<WhereThisSits\s+slug="([^"]+)"/);
    if (!wts) E("S3", "arc essay without <WhereThisSits>");
    else if (wts[1] !== slug) E("S3", `WhereThisSits slug ${wts[1]} != ${slug}`);
  }
  const fnRefs = new Set([...body.matchAll(/\[\^([^\]]+)\](?!:)/g)].map((m) => m[1]));
  const fnDefs = new Set([...body.matchAll(/^\[\^([^\]]+)\]:/gm)].map((m) => m[1]));
  if ((fnRefs.size || fnDefs.size) && !/^## Sources\s*$/m.test(body)) E("S4", "footnotes present but no '## Sources' heading");
  if (!/<ClaimBadge\b/.test(body)) W("S5", "no <ClaimBadge> receipts rail");
  const h2 = (body.match(/^## /gm) || []).length;
  if (h2 < 5 || h2 > 9) W("S6", `H2 count ${h2} outside 5-9`);

  // C1-C4
  const imported = new Set([...body.matchAll(/^import\s+([A-Z][A-Za-z0-9]*)\s+from/gm)].map((m) => m[1]));
  const used = new Set([...body.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)].map((m) => m[1]));
  for (const c of imported) if (!used.has(c)) E("C1", `imported but unused: ${c}`);
  for (const c of used) if (!imported.has(c)) E("C1", `used but not imported: ${c}`);
  for (const m of body.matchAll(/<Term\s+id="([^"]+)"/g)) if (!GLOSSARY.has(m[1])) E("C2", `Term id not in glossary: ${m[1]}`);
  for (const m of body.matchAll(/<ThreadScene\s+slug="([^"]+)"\s+beatId="([^"]+)"/g)) {
    if (!threadsSrc.includes(`"${m[1]}": {`) || !threadsSrc.includes(`id: "${m[2]}"`)) E("C3", `ThreadScene ${m[1]}#${m[2]} not in threads.ts`);
  }
  for (const m of body.matchAll(/<ClaimBadge\s+kind="([^"]+)"/g)) if (!CLAIM_KINDS.has(m[1])) E("C4", `ClaimBadge kind not allowed: ${m[1]}`);
  for (const m of body.matchAll(/status:\s*'([^']+)'/g)) if (/ImplementationStatus/.test(body) && !IMPL_STATUS.has(m[1])) E("C4", `ImplementationStatus status not allowed: ${m[1]}`);

  // N1
  for (const r of fnRefs) if (!fnDefs.has(r)) E("N1", `footnote ref without definition: [^${r}]`);
  for (const d of fnDefs) if (!fnRefs.has(d)) W("N1", `footnote definition never referenced: [^${d}]`);

  // V1 (whole file incl. frontmatter strings, as check-prose does), V2/V3 (prose only)
  src.split("\n").forEach((line, i) => {
    if (line.includes("—") && !IGNORE.test(line)) E("V1", `em dash at line ${i + 1}`);
  });
  for (const { n, text } of proseLines(body)) {
    if (IGNORE.test(text)) continue;
    const scrubbed = text.replace(/<[^>]+>/g, "").replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "]").replace(/https?:\/\/\S+/g, "");
    for (const [re, label] of ID_LEAKS) if (re.test(scrubbed)) E("V2", `${label} in prose at line ${n + bodyOffset}: ${scrubbed.trim().slice(0, 80)}`);
    for (const re of ADVISORY_TELLS) if (re.test(scrubbed)) W("V3", `phrase tell ${re} at line ${n + bodyOffset}`);
  }
  return { file: rel, slug, errors, warnings };
}

function isEssay(path) {
  const { fm } = splitFrontmatter(readFileSync(path, "utf8"));
  return fmScalar(fm, "contentType") === "essay";
}

const targets = (files.length ? files.map((f) => join(ROOT, f)) : readdirSync(POSTS).filter((f) => /\.mdx?$/.test(f)).map((f) => join(POSTS, f)))
  .filter((p) => existsSync(p) && (files.length || isEssay(p)));
const results = targets.map(checkFile);

// M1: the file must parse as MDX (a leg sandbox cannot run the Astro build; this catches e.g. an
// apostrophe inside a single-quoted JSX attribute string). Uses the repo's own @mdx-js/mdx; when it
// is not installed (a fresh worktree without node_modules) the check is reported as skipped.
let mdx = null;
try { mdx = await import("@mdx-js/mdx"); } catch { mdx = null; }
for (const r of results) {
  if (!mdx) { r.warnings.push({ id: "M1", msg: "MDX parse check skipped (@mdx-js/mdx not installed; run npm ci)" }); continue; }
  try { await mdx.compile(readFileSync(join(ROOT, r.file), "utf8"), { jsx: true }); }
  catch (e) { r.errors.push({ id: "M1", msg: `MDX does not parse: ${String(e.message || e).split("\n")[0]}` }); }
}
if (JSON_OUT) {
  process.stdout.write(JSON.stringify(results, null, 2) + "\n");
} else {
  for (const r of results) {
    const status = r.errors.length ? "FAIL" : "PASS";
    console.log(`${status} ${r.file}  (${r.errors.length} errors, ${r.warnings.length} warnings)`);
    for (const e of r.errors) console.log(`  error ${e.id}: ${e.msg}`);
    for (const w of r.warnings) console.log(`  warn  ${w.id}: ${w.msg}`);
  }
}
process.exit(results.some((r) => r.errors.length) ? 1 : 0);
