import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { releases } from '../../src/data/labs/fixtures/index.mjs';
import { checkReleaseStore } from '../../src/lib/labs/check-release-store.mjs';

const [approved, , withdrawn, gateRejected] = releases;

/** Write releases into a temporary store as the pipeline would: real (non-fixture) bundles, four files each. */
async function store(entries) {
  const dir = await mkdtemp(join(tmpdir(), 's2s-release-store-'));
  for (const { name, source, files = {} } of entries) {
    const release = join(dir, name);
    await mkdir(release);
    const values = { 'manifest.json': source.manifest, 'receipts.json': source.receipts, 'records.json': source.records, 'lab.json': { ...source.bundle, synthetic: false }, ...files };
    for (const [file, value] of Object.entries(values)) if (value !== undefined) await writeFile(join(release, file), typeof value === 'string' ? value : JSON.stringify(value));
  }
  return { dir, root: pathToFileURL(`${dir}/`) };
}

async function check(entries) {
  const { dir, root } = await store(entries);
  try { return await checkReleaseStore({ root }); } finally { await rm(dir, { recursive: true, force: true }); }
}

test('an absent or empty store passes', async () => {
  assert.deepEqual(await checkReleaseStore({ root: pathToFileURL(join(tmpdir(), 's2s-release-store-absent/')) }), []);
  assert.deepEqual(await check([]), []);
});

test('an approved release and a withdrawal tombstone pass', async () => {
  assert.deepEqual(await check([{ name: 'approved', source: approved }, { name: 'withdrawn', source: withdrawn }]), []);
});

test('a digest-mismatched release fails the check with the gate reason', async () => {
  const source = structuredClone(approved);
  source.records[0].summary = 'altered after approval';
  assert.deepEqual(await check([{ name: 'tampered', source }]), [{ releaseId: approved.manifest.releaseId, errors: [`digest-mismatch:${source.records[0].publicId}`] }]);
});

test('a gate-rejected release fails the check', async () => {
  const problems = await check([{ name: 'rejected', source: gateRejected }]);
  assert.equal(problems.length, 1);
  assert.equal(problems[0].releaseId, gateRejected.manifest.releaseId);
  assert.ok(problems[0].errors.length > 0);
});

test('an incomplete or unparsable release directory fails the check instead of being skipped', async () => {
  const problems = await check([
    { name: 'missing-lab', source: approved, files: { 'lab.json': undefined } },
    { name: 'bad-json', source: approved, files: { 'records.json': '{not json' } },
  ]);
  assert.deepEqual(problems.sort((a, b) => a.releaseId.localeCompare(b.releaseId)), [
    { releaseId: 'bad-json', errors: ['unreadable-release-file:records.json'] },
    { releaseId: 'missing-lab', errors: ['unreadable-release-file:lab.json'] },
  ]);
});

test('the build check script passes on the committed store', () => {
  execFileSync(process.execPath, ['scripts/check-projection-gate.mjs'], { stdio: 'pipe' });
});
