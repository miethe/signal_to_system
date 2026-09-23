import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const contentDir = path.join(repoRoot, 'src/content');
const postFormats = new Set(['essay', 'field-note', 'guide', 'companion']);

function frontmatter(file) {
  const text = readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, path.relative(repoRoot, file) + ': missing frontmatter');
  return Object.fromEntries(
    match[1]
      .split('\n')
      .filter((line) => /^[A-Za-z][\w-]*:\s*/.test(line))
      .map((line) => {
        const separator = line.indexOf(':');
        return [line.slice(0, separator), line.slice(separator + 1).trim().replace(/^["']|["']$/g, '')];
      }),
  );
}

function entries(collection) {
  const dir = path.join(contentDir, collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => path.join(dir, file));
}

test('every post names an explicit supported writing format', () => {
  for (const file of entries('posts')) {
    const data = frontmatter(file);
    assert.ok(data.format, path.relative(repoRoot, file) + ': missing format');
    assert.ok(postFormats.has(data.format), path.relative(repoRoot, file) + ': unsupported format ' + data.format);
  }
});

test('every story has its type and explicit automated provenance', () => {
  for (const file of entries('stories')) {
    const data = frontmatter(file);
    assert.ok(data.storyType, path.relative(repoRoot, file) + ': missing storyType');
    assert.ok(['true', 'false'].includes(data.automated), path.relative(repoRoot, file) + ': automated must be boolean');
  }
});

test('reviewedAt is only recorded alongside reviewed: true', () => {
  const dir = path.join(repoRoot, 'src/content/stories');
  for (const f of readdirSync(dir).filter((n) => /\.mdx?$/.test(n))) {
    const text = readFileSync(path.join(dir, f), 'utf8');
    const fm = (text.match(/^---\n([\s\S]*?)\n---/) ?? [, ''])[1];
    if (/^reviewedAt:/m.test(fm)) {
      assert.match(fm, /^reviewed:\s*true\s*$/m, `${f}: reviewedAt without reviewed: true`);
    }
  }
});
