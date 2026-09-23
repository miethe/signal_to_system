import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => (
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]
  )))).flat();
}

const files = (await walk('dist')).filter((file) => file.endsWith('.html'));
const missing = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/_astro/') || value === '/brand/apple-touch-icon.png' || value.startsWith('/categories/')) continue;
    // A server maps a percent-encoded URL to the decoded file name
    // (e.g. /dev-stories/orchestrator/Fable%205/ -> "Fable 5/").
    let pathname = value.split(/[?#]/, 1)[0];
    try { pathname = decodeURIComponent(pathname); } catch { /* keep raw */ }
    if (!pathname) continue;
    const candidates = [join('dist', pathname), join('dist', pathname, 'index.html'), join('dist', `${pathname}.html`)];
    try {
      await Promise.any(candidates.map((candidate) => access(candidate)));
    } catch {
      missing.push(`${relative('dist', file)} -> ${value}`);
    }
  }
}
assert.deepEqual(missing, [], `Broken internal links:\n${missing.join('\n')}`);
console.log(`Internal link check passed (${files.length} HTML files).`);
