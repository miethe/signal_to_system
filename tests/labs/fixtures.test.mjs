import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateReleaseGate } from '../../src/lib/projection/gate.mjs';
import { releases } from '../../src/data/labs/fixtures/index.mjs';

const privatePattern = /(node_|tree_|ws_|req_|\/Users\/|\/home\/|10\.\d|192\.168)/;

test('synthetic releases exercise their intended gate states', () => {
  const results = releases.map(({ manifest, receipts, records }) => evaluateReleaseGate(manifest, receipts, records));
  assert.deepEqual(results[0].errors, []);
  assert.deepEqual(results[1].errors, []);
  assert.deepEqual(results[2].errors.filter((error) => error.startsWith('withdrawn:')), ['withdrawn:synthetic-withdrawn-example']);
  assert.ok(results[3].errors.length > 0);
});

test('fixture payloads contain no private identifiers', () => {
  for (const release of releases) assert.equal(privatePattern.test(JSON.stringify(release)), false);
});
