import test from 'node:test';
import assert from 'node:assert/strict';
import { digestProjection, evaluateReleaseGate } from '../../src/lib/projection/gate.mjs';
import { manifest, receipts, records } from '../../src/lib/projection/fixtures/synthetic-approved.mjs';

const gate = (m = manifest, r = receipts, p = records, options = {}) => evaluateReleaseGate(structuredClone(m), structuredClone(r), structuredClone(p), options);
const assertClosed = (m = manifest, r = receipts, p = records, options = {}) => assert.deepEqual(gate(m, r, p, options).publishable, []);

function labFixture() {
  // Lab producers must use this schema insertion order before digestProjection().
  const record = {
    publicId: 'lab-report-001', kind: 'lab-report', version: '1.0.0', lifecycle: 'approved',
    sourceRefs: ['wiki:report:lab-report@1.0.0'], dependencies: [],
    destinations: ['https://example.invalid/lab-report'], summary: 'Approved Lab report.',
  };
  record.digest = digestProjection({ ...record, digest: undefined });
  const labManifest = {
    schemaVersion: '1', releaseId: 'lab-release-001',
    records: [{ publicId: record.publicId, kind: record.kind, version: record.version, digest: record.digest }],
  };
  const labReceipts = [{ schemaVersion: '1', action: 'release', publicId: record.publicId, kind: record.kind, version: record.version, digest: record.digest, approver: 'human:nick', approvedAt: '2026-09-22T00:00:00.000Z', sourceRefs: record.sourceRefs }];
  return { record, labManifest, labReceipts };
}
test('publishes the synthetic approved projection', () => assert.equal(gate().publishable.length, 1));
test('fails closed without a receipt', () => assert.deepEqual(gate(manifest, [], records).publishable, []));
test('fails closed for a withdrawn record', () => assert.deepEqual(gate(manifest, [...receipts, { ...receipts[0], action: 'withdraw' }], records).publishable, []));
test('fails closed for a digest mismatch', () => { const altered = structuredClone(records); altered[0].summary = 'altered'; assert.deepEqual(gate(manifest, receipts, altered).publishable, []); });
test('fails closed for a dangling dependency', () => { const altered = structuredClone(records); altered[0].dependencies = ['missing-record']; assert.deepEqual(gate(manifest, receipts, altered).publishable, []); });
test('fails closed for the wrong release approver', () => { const altered = structuredClone(receipts); altered[0].approver = 'agent:metis'; assert.deepEqual(gate(manifest, altered, records).publishable, []); });
test('requires reason and follow-up report for a Metis withdrawal', () => { const altered = [...receipts, { ...receipts[0], action: 'withdraw', approver: 'agent:metis' }]; assert.deepEqual(gate(manifest, altered, records).publishable, []); });
test('fails closed for schema-invalid input and private identifiers', () => { assertClosed({}); const altered = structuredClone(records); altered[0].summary = 'node_01SECRET'; assertClosed(manifest, receipts, altered); });
test('publishes an approved Lab record for every additive Lab kind', () => {
  for (const kind of ['lab-investigation', 'lab-report', 'lab-experiment', 'lab-artifact', 'lab-film']) {
    const { record, labManifest, labReceipts } = labFixture();
    record.kind = kind;
    record.digest = digestProjection({ ...record, digest: undefined });
    labManifest.records[0] = { publicId: record.publicId, kind, version: record.version, digest: record.digest };
    labReceipts[0] = { ...labReceipts[0], kind, digest: record.digest };
    assert.equal(gate(labManifest, labReceipts, [record]).publishable.length, 1);
  }
});
test('fails closed for an unapproved Lab record', () => { const { record, labManifest } = labFixture(); assertClosed(labManifest, [], [record]); });
test('keeps canonical Lab digests stable only for the required fixed key order', () => {
  const { record } = labFixture();
  const canonical = { publicId: record.publicId, kind: record.kind, version: record.version, lifecycle: record.lifecycle, sourceRefs: record.sourceRefs, dependencies: record.dependencies, destinations: record.destinations, summary: record.summary, digest: undefined };
  assert.equal(digestProjection(canonical), record.digest);
  assert.notEqual(digestProjection({ kind: canonical.kind, publicId: canonical.publicId, ...canonical }), record.digest);
});
test('fails closed for LAN addresses and absolute home paths', () => {
  const material = [
    ['10', '1', '2', '3'].join('.'), ['172', '16', '0', '1'].join('.'), ['192', '168', '1', '1'].join('.'),
    ['/', 'Users', 'person', 'file'].join('/').replace('//', '/'), ['/', 'home', 'person', 'file'].join('/').replace('//', '/'),
  ];
  for (const value of material) {
    const altered = structuredClone(records); altered[0].summary = value; assertClosed(manifest, receipts, altered);
  }
});
test('fails closed for a caller-supplied denied workspace identifier', () => { assertClosed(manifest, receipts, records, { denied: ['synthetic-claim-001'] }); });
test('fails closed for private-only fields in public records', () => {
  for (const field of ['reviews', 'workspace', 'unresolvedReferences']) {
    const altered = structuredClone(records); altered[0][field] = 'private'; assertClosed(manifest, receipts, altered);
  }
});
test('fails closed when a supplied private release-sidecar digest differs', () => {
  const sidecarDigest = `sha256:${'a'.repeat(64)}`;
  const sidecarManifest = { ...manifest, releaseSidecarDigest: sidecarDigest };
  assertClosed(sidecarManifest, receipts, records);
  assertClosed(sidecarManifest, receipts, records, { releaseSidecarDigest: `sha256:${'b'.repeat(64)}` });
  assert.equal(gate(sidecarManifest, receipts, records, { releaseSidecarDigest: sidecarDigest }).publishable.length, 1);
});
