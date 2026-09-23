import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const dist = path.join(root, 'dist');
const itemTags = (xml) => [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => [...match[1].matchAll(/<([\w:]+)(?:\s[^>]*)?>/g)].map((tag) => tag[1]));
test('aggregate RSS retains its established item field set', { skip: !existsSync(path.join(dist, 'rss.xml')) }, () => {
  for (const tags of itemTags(readFileSync(path.join(dist, 'rss.xml'), 'utf8'))) assert.deepEqual([...new Set(tags)].sort(), ['category', 'description', 'guid', 'link', 'pubDate', 'title']);
});
test('search index retains established fields for each item type', { skip: !existsSync(path.join(dist, 'search.json')) }, () => {
  const index = JSON.parse(readFileSync(path.join(dist, 'search.json'), 'utf8'));
  const expected = { post: ['category', 'contentType', 'date', 'excerpt', 'featured', 'readTime', 'tags', 'title', 'type', 'url'], project: ['category', 'contentType', 'date', 'excerpt', 'featured', 'readTime', 'tags', 'title', 'type', 'url'], story: ['category', 'date', 'excerpt', 'featured', 'readTime', 'tags', 'title', 'type', 'url'] };
  // Serialized shape as published at 28c2e57: stories set contentType to undefined, so JSON omits it.
  for (const item of index) assert.deepEqual(Object.keys(item).sort(), expected[item.type]);
});
test('format feeds are RSS and only link to built routes', { skip: !existsSync(path.join(dist, 'feeds')) }, () => {
  for (const file of readdirSync(path.join(dist, 'feeds')).filter((name) => name.endsWith('.xml'))) {
    const xml = readFileSync(path.join(dist, 'feeds', file), 'utf8'); assert.match(xml, /<rss version="2.0"/);
    for (const link of [...xml.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => new URL(match[1]).pathname).filter((p) => p !== '/')) assert.ok(existsSync(path.join(dist, link, 'index.html')), `${file}: ${link} is not a built route`);
  }
});
