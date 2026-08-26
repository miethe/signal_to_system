#!/usr/bin/env node
/**
 * check-prose.mjs
 *
 * Editorial gate for src/content/**: fails the build when the owner's own
 * prose contains an em dash (U+2014), the most-named AI "tell" for this
 * publication. Also emits an advisory (non-failing) count of en dashes
 * (U+2013) used mid-sentence, and advisory counts of other named patterns
 * that are not mechanically checkable without false positives.
 *
 * Escape hatch: a line containing a deliberate em dash inside a direct
 * quotation of someone else's writing can be marked with an inline comment
 * marker so the gate does not fail on it. Supported markers (place on the
 * same line as the em dash):
 *
 *   {/* prose-lint-ignore: quote *\/}   (MDX/JSX comment)
 *   <!-- prose-lint-ignore: quote -->   (HTML comment)
 *
 * The marker takes an optional reason after the colon; the reason is not
 * validated, it's for human context. Use it ONLY for direct quotations of
 * someone else's writing — not to silence the gate on the owner's own prose.
 *
 * Usage:
 *   node scripts/check-prose.mjs            # scan src/content/**
 *   npm run check:prose
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "src", "content");
const SCAN_EXTENSIONS = new Set([".mdx", ".md"]);
// Agent-facing directory instructions (e.g. src/content/CLAUDE.md) are not
// published prose and are excluded from the gate.
const EXCLUDE_BASENAMES = new Set(["CLAUDE.md"]);

const EM_DASH = "—";
const EN_DASH = "–";

const IGNORE_MARKER = /prose-lint-ignore(?::\s*([^*>\n]+))?/;

/** Recursively collect files with a matching extension under a directory. */
function collectFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectFiles(full));
    } else if (SCAN_EXTENSIONS.has(extname(entry.name)) && !EXCLUDE_BASENAMES.has(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

/** Build a short excerpt around a character index for the failure message. */
function excerpt(line, index, radius = 40) {
  const start = Math.max(0, index - radius);
  const end = Math.min(line.length, index + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < line.length ? "…" : "";
  return `${prefix}${line.slice(start, end).trim()}${suffix}`;
}

function scanFile(filePath) {
  const relPath = relative(ROOT, filePath);
  const text = readFileSync(filePath, "utf8");
  const lines = text.split("\n");

  const failures = [];
  const advisories = { enDash: [] };

  lines.forEach((line, i) => {
    const lineNo = i + 1;
    const hasIgnoreMarker = IGNORE_MARKER.test(line);

    let idx = line.indexOf(EM_DASH);
    while (idx !== -1) {
      if (!hasIgnoreMarker) {
        failures.push({
          file: relPath,
          line: lineNo,
          column: idx + 1,
          excerpt: excerpt(line, idx),
        });
      }
      idx = line.indexOf(EM_DASH, idx + 1);
    }

    // Advisory only: en dash used as a sentence break (surrounded by spaces,
    // e.g. "the plan - and the risk - held"). Hyphenated ranges like
    // "10-20" or "2024-2025" do not match because they lack surrounding
    // spaces around the dash.
    let enIdx = line.indexOf(EN_DASH);
    while (enIdx !== -1) {
      const before = line[enIdx - 1];
      const after = line[enIdx + 1];
      if (before === " " && after === " " && !hasIgnoreMarker) {
        advisories.enDash.push({
          file: relPath,
          line: lineNo,
          column: enIdx + 1,
          excerpt: excerpt(line, enIdx),
        });
      }
      enIdx = line.indexOf(EN_DASH, enIdx + 1);
    }
  });

  return { failures, advisories };
}

function main() {
  const files = collectFiles(CONTENT_DIR);

  if (files.length === 0) {
    console.warn(`check-prose: no content files found under ${relative(ROOT, CONTENT_DIR)}`);
    process.exit(0);
  }

  const allFailures = [];
  const allEnDashAdvisories = [];

  for (const file of files) {
    const { failures, advisories } = scanFile(file);
    allFailures.push(...failures);
    allEnDashAdvisories.push(...advisories.enDash);
  }

  if (allEnDashAdvisories.length > 0) {
    console.warn(
      `\n[advisory] ${allEnDashAdvisories.length} en dash (U+2013) sentence-break use(s) found (not a failure):`
    );
    for (const a of allEnDashAdvisories) {
      console.warn(`  ${a.file}:${a.line}:${a.column}  "${a.excerpt}"`);
    }
    console.warn(
      "  If any of these are being used like an em dash, consider a comma, colon, semicolon, or parentheses instead.\n"
    );
  }

  if (allFailures.length > 0) {
    console.error(
      `\ncheck-prose: FAILED — ${allFailures.length} em dash (—, U+2014) occurrence(s) found in src/content/.\n`
    );
    console.error(
      "The em dash is the owner's single most-named AI tell; this site's standing rule is zero em dashes in prose.\n"
    );
    for (const f of allFailures) {
      console.error(`  ${f.file}:${f.line}:${f.column}`);
      console.error(`    "${f.excerpt}"`);
    }
    console.error(
      "\nFix: replace each em dash with parentheses, a colon, a semicolon, or a comma, whichever reads most naturally.\n" +
        "If this is a DIRECT QUOTATION of someone else's writing that must preserve their em dash, add an inline\n" +
        "escape-hatch marker on the same line instead of editing the quote:\n" +
        "  MDX/JSX comment:  {/* prose-lint-ignore: quote */}\n" +
        "  HTML comment:     <!-- prose-lint-ignore: quote -->\n"
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `check-prose: OK — scanned ${files.length} file(s) under src/content/, 0 em dashes found.`
  );
}

main();
