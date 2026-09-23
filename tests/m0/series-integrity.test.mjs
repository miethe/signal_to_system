import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findSeries, inSeries, seriesKey, seriesMembers } from '../../src/lib/series.mjs';

// Source-level checks (no dist/ needed). Guards the M2 series bug: posts and
// stories that named a series by its display title counted 0 parts, because
// every consumer compared the raw value against the collection id.

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const contentDir = path.join(repoRoot, 'src/content');

function frontmatterField(file, field) {
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return undefined;
  const line = fm[1].split('\n').find((l) => l.startsWith(`${field}:`));
  if (!line) return undefined;
  return line.slice(field.length + 1).trim().replace(/^["']|["']$/g, '');
}

const mdx = (dir) =>
  readdirSync(path.join(contentDir, dir))
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => path.join(contentDir, dir, f));

const seriesIds = readdirSync(path.join(contentDir, 'series'))
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ''));

test('every series frontmatter value is an existing series id (not a title)', () => {
  for (const file of [...mdx('posts'), ...mdx('stories')]) {
    const value = frontmatterField(file, 'series');
    if (!value) continue;
    assert.ok(
      seriesIds.includes(value),
      `${path.relative(repoRoot, file)}: series "${value}" is not a series id (${seriesIds.join(', ')})`,
    );
  }
});

const fixtures = [
  { id: 'ai-workflows', data: { title: 'AI Workflows' } },
  { id: 'governed-agentic-sdlc', data: { title: 'Governed Agentic SDLC' } },
];

test('findSeries resolves an id or a legacy display title', () => {
  assert.equal(findSeries('ai-workflows', fixtures)?.id, 'ai-workflows');
  assert.equal(findSeries('AI Workflows', fixtures)?.id, 'ai-workflows');
  assert.equal(findSeries('Governed Agentic SDLC', fixtures)?.id, 'governed-agentic-sdlc');
  assert.equal(findSeries('nope', fixtures), undefined);
  assert.equal(findSeries(undefined, fixtures), undefined);
});

test('seriesMembers groups title- and id-keyed entries and orders them', () => {
  const e = (id, series, seriesOrder, date = '2026-01-01') => ({ id, data: { series, seriesOrder, date } });
  const members = seriesMembers('ai-workflows', [
    e('b', 'AI Workflows', 2),
    e('a', 'ai-workflows', 1),
    e('z', 'ai-workflows', undefined, '2026-02-01'),
    e('y', 'ai-workflows', undefined, '2026-01-15'),
    e('other', 'governed-agentic-sdlc', 1),
    e('none', undefined, 1),
  ]);
  assert.deepEqual(members.map((m) => m.id), ['a', 'b', 'y', 'z']);
  assert.equal(inSeries(e('x', undefined), 'ai-workflows'), false);
  assert.equal(seriesKey('  I Let Claude Build My App '), 'i-let-claude-build-my-app');
});
