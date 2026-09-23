import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateReleaseGate } from '../../src/lib/projection/gate.mjs';
import { releases } from '../../src/data/labs/fixtures/index.mjs';
import { labBundleSchema } from '../../src/lib/labs/schema.mjs';
import { loadLabCatalog } from '../../src/lib/labs/load.mjs';

const privatePattern = /(node_|tree_|ws_|req_|\/Users\/|\/home\/|10\.\d|192\.168)/;

test('synthetic releases exercise their intended gate states', () => {
  const results = releases.map(({ manifest, receipts, records }) => evaluateReleaseGate(manifest, receipts, records));
  assert.deepEqual(results[0].errors, []);
  assert.deepEqual(results[1].errors, []);
  assert.deepEqual(results[2].errors.filter((error) => error.startsWith('withdrawn:')), ['withdrawn:synthetic-withdrawn-example']);
  assert.ok(results[3].errors.length > 0);
});

test('fixture payloads parse and contain no private identifiers', () => {
  for (const release of releases) {
    assert.equal(labBundleSchema.safeParse(release.bundle).success, true);
    assert.equal(privatePattern.test(JSON.stringify(release)), false);
  }
});

test('fixture catalog preserves Labs, tombstone, and rejected release', async () => {
  const catalog = await loadLabCatalog({ includeFixtures: true });
  assert.deepEqual(catalog.labs.map((lab) => lab.investigation.publicId), ['synthetic-queue-latency', 'synthetic-annotation-guidelines']);
  assert.deepEqual(catalog.tombstones.map((item) => item.publicId), ['synthetic-withdrawn-example']);
  assert.deepEqual(catalog.rejected.map((item) => item.releaseId), ['synthetic-gate-rejected-r1']);
  const lab = catalog.labs[0];
  assert.deepEqual(lab.claims.map((item) => item.status), ['supported-within-scope', 'mixed', 'contradicted', 'unresolved', 'unreviewed']);
  assert.deepEqual(lab.claims.map((item) => item.type), ['run-claim', 'run-claim', 'source-assertion', 'inference', 'speculation']);
  assert.equal(lab.claims[3].receipts.length, 0);
  assert.equal(lab.claims[4].receipts.length, 0);
  assert.equal(lab.evidence.find((item) => item.id === 'E5').access, 'denied');
  assert.equal(lab.sources.find((item) => item.id === 'S4').href, undefined);
  assert.equal(lab.sources.find((item) => item.id === 'S5').access, 'denied');
  assert.equal(lab.figures[0].chart.type, 'scatter');
  assert.equal(lab.figures[0].chart.series[0].points.length, 60);
  assert.ok(lab.figures[0].chart.fit);
  assert.equal(lab.figures[1].chart.type, 'line');
  assert.equal(lab.figures[1].chart.series[0].points.length, 10);
  assert.equal(lab.figures[2].chart, null);
  assert.equal(lab.figureData.F1.id, 'A3');
  assert.equal(lab.figureData.F2, null);
  assert.deepEqual(lab.artifacts.map((item) => item.id), ['A1', 'A2', 'A3', 'A5']);
  assert.equal(lab.method.fields.length, 10);
  assert.equal(lab.reproduce.packageArtifactId, 'A5');
  assert.ok(lab.timeline.some((item) => item.kind === 'correction'));
  assert.ok(lab.timeline.some((item) => item.kind === 'release'));
  assert.equal(lab.report.conclusion.bounded, true);
});
