#!/usr/bin/env node
/**
 * Publication-gate probe (node_01M35CKM3JKBQNKDX6YWV4KRQE).
 *
 * Injects two synthetic posts into src/content/posts/ (a `status: draft`
 * post and a `status: published` post marked `isFixture: true`), runs a
 * production `astro build`, then runs tests/m0/publication-eligibility.test.mjs
 * against that dist/. The probe files are always removed afterwards.
 *
 * dist/ is left holding the probe build: re-run `npm run build` before
 * reading dist/ for anything else. Never run this against a deploy output.
 */
import { spawnSync } from 'node:child_process';
import { rmSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const postsDir = path.join(root, 'src', 'content', 'posts');

const frontmatter = (fields) => `---
title: "Publication gate probe"
excerpt: "Synthetic entry used by scripts/probe-publication-gate.mjs; must never be emitted."
date: 2026-01-01
readTime: "1 min"
contentType: essay
category: "Architecture"
tags:
  - "publication-gate-probe"
${fields}
---

Synthetic probe body.
`;

const probes = [
  { file: 'zz-publication-gate-probe-draft.mdx', body: frontmatter('status: draft') },
  { file: 'zz-publication-gate-probe-fixture.mdx', body: frontmatter('status: published\nisFixture: true') },
];

for (const probe of probes) {
  const target = path.join(postsDir, probe.file);
  if (existsSync(target)) throw new Error(`${target} already exists; refusing to overwrite`);
}

let status = 1;
try {
  for (const probe of probes) writeFileSync(path.join(postsDir, probe.file), probe.body);
  const run = (cmd, args) => spawnSync(cmd, args, { cwd: root, stdio: 'inherit' }).status ?? 1;
  status = run('npx', ['astro', 'build']);
  if (status === 0) status = run(process.execPath, ['--test', 'tests/m0/publication-eligibility.test.mjs']);
} finally {
  for (const probe of probes) rmSync(path.join(postsDir, probe.file), { force: true });
}

console.log(status === 0 ? '\nPublication-gate probe passed.' : '\nPublication-gate probe FAILED.');
process.exit(status);
