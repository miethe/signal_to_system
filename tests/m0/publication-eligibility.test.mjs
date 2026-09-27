import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { isPublishable } from '../../src/lib/publication.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const dist = path.join(root, 'dist');

// ---------------------------------------------------------------------------
// The rule itself
// ---------------------------------------------------------------------------

test('draft posts are ineligible for static emission', () => {
  assert.equal(isPublishable({ data: { status: 'draft' } }), false);
});

test('published and evergreen posts remain eligible', () => {
  assert.equal(isPublishable({ data: { status: 'published' } }), true);
  assert.equal(isPublishable({ data: { status: 'evergreen' } }), true);
});

test('unknown or missing status fails closed', () => {
  assert.equal(isPublishable({ data: { status: 'scheduled' } }), false);
  assert.equal(isPublishable({ data: {} }), false);
  assert.equal(isPublishable({}), false);
  assert.equal(isPublishable(undefined), false);
});

test('fixture records are rejected in production builds and allowed in dev', () => {
  const fixture = { data: { status: 'published', isFixture: true } };
  assert.equal(isPublishable(fixture, { production: true }), false);
  assert.equal(isPublishable(fixture, { production: false }), true);
  assert.equal(isPublishable({ data: { status: 'draft', isFixture: true } }, { production: false }), false);
});

test('NODE_ENV=production rejects fixtures when no override is given', () => {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    assert.equal(isPublishable({ data: { status: 'published', isFixture: true } }), false);
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  }
});

test('an Array#filter index in the options slot is ignored', () => {
  const entries = [{ data: { status: 'published' } }, { data: { status: 'draft' } }];
  assert.equal(entries.filter(isPublishable).length, 1);
});

// ---------------------------------------------------------------------------
// One shared gate: every posts/stories read goes through it
// ---------------------------------------------------------------------------

/** Named predicates allowed in place of `isPublishable`, each built on it. */
const DERIVED_PREDICATES = new Map([
  // Counts the entry being rendered even in a dev preview; see the component.
  ['src/components/content/SeriesWayfinding.astro', new Set(['eligibleOrSelf'])],
]);

function sourceFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (full === path.join(root, 'src', 'content')) continue;
      out.push(...sourceFiles(full));
    } else if (/\.(astro|ts|tsx|mjs|js|jsx)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

test('every getCollection("posts"|"stories") call in src/ filters through isPublishable', () => {
  const offenders = [];
  let calls = 0;
  for (const file of sourceFiles(path.join(root, 'src'))) {
    const source = readFileSync(file, 'utf8');
    const rel = path.relative(root, file).split(path.sep).join('/');
    const imported = /import\s*\{[^}]*\bisPublishable\b[^}]*\}\s*from\s*['"][^'"]*publication\.mjs['"]/.test(source);
    for (const match of source.matchAll(/getCollection\(\s*(['"])(posts|stories)\1\s*(?:,\s*([^)]*?))?\s*\)/g)) {
      calls += 1;
      const predicate = (match[3] ?? '').trim();
      const allowed = predicate === 'isPublishable' || DERIVED_PREDICATES.get(rel)?.has(predicate);
      if (!allowed || !imported) offenders.push(`${rel}: getCollection('${match[2]}'${predicate ? `, ${predicate}` : ''})`);
    }
  }
  assert.ok(calls > 0, 'expected to find getCollection calls under src/');
  assert.deepEqual(offenders, [], `posts/stories must be read through isPublishable:\n${offenders.join('\n')}`);
});

// ---------------------------------------------------------------------------
// Built output: no ineligible entry reaches any public artifact.
// Runs after `npm run build`, like the other dist-reading m0 tests;
// `npm run test:publication-gate` injects a draft post and a fixture post,
// builds, and runs this file against that build.
// ---------------------------------------------------------------------------

const ROUTE_BASE = { posts: 'essays', stories: 'dev-stories' };

function frontmatter(file) {
  const match = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

/**
 * Entries whose frontmatter makes them ineligible for a production build.
 * Deliberately an independent oracle, NOT isPublishable(): if the gate
 * regressed, asking the gate which entries to look for would hide the leak.
 */
function ineligibleEntries() {
  const entries = [];
  for (const [collection, base] of Object.entries(ROUTE_BASE)) {
    const dir = path.join(root, 'src', 'content', collection);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).filter((n) => /\.mdx?$/.test(n))) {
      const fm = frontmatter(path.join(dir, name));
      const status = fm.match(/^status:\s*['"]?([\w-]+)/m)?.[1];
      const isFixture = /^isFixture:\s*true\s*$/m.test(fm);
      const id = (fm.match(/^slug:\s*['"]?([^'"\n]+)/m)?.[1]?.trim() ?? name.replace(/\.mdx?$/, '')).toLowerCase();
      if (!['published', 'evergreen'].includes(status) || isFixture) {
        entries.push({ collection, id, url: `/${base}/${id}/` });
      }
    }
  }
  return entries;
}

function distFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...distFiles(full));
    else if (/\.(html|xml|json|txt)$/.test(name)) out.push(full);
  }
  return out;
}

test('ineligible entries produce no HTML, feed item, search row, sitemap entry or OG image', { skip: !existsSync(path.join(dist, 'index.html')) }, () => {
  const blocked = ineligibleEntries();
  const leaks = [];
  for (const entry of blocked) {
    const base = ROUTE_BASE[entry.collection];
    for (const candidate of [path.join(dist, base, entry.id), path.join(dist, 'og', base, `${entry.id}.png`)]) {
      if (existsSync(candidate)) leaks.push(`${entry.url}: ${path.relative(root, candidate)} was built`);
    }
  }
  if (blocked.length) {
    for (const file of distFiles(dist)) {
      const text = readFileSync(file, 'utf8');
      for (const entry of blocked) {
        if (text.includes(entry.url)) leaks.push(`${entry.url}: referenced by ${path.relative(root, file)}`);
      }
    }
  }
  assert.deepEqual(leaks, []);

  // The aggregate artifacts the gate covers exist, so absence above means something.
  for (const artifact of ['rss.xml', 'search.json', 'sitemap-0.xml']) {
    assert.ok(existsSync(path.join(dist, artifact)), `dist/${artifact} missing`);
  }
});
