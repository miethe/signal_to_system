import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateReleaseGate } from '../../src/lib/projection/gate.mjs';
import { manifest, receipts, records } from '../../src/lib/projection/fixtures/synthetic-approved.mjs';

const gate = (m = manifest, r = receipts, p = records) => evaluateReleaseGate(structuredClone(m), structuredClone(r), structuredClone(p));
test('publishes the synthetic approved projection', () => assert.equal(gate().publishable.length, 1));
test('fails closed without a receipt', () => assert.deepEqual(gate(manifest, [], records).publishable, []));
test('fails closed for a withdrawn record', () => assert.deepEqual(gate(manifest, [...receipts, { ...receipts[0], action: 'withdraw' }], records).publishable, []));
test('fails closed for a digest mismatch', () => { const altered = structuredClone(records); altered[0].summary = 'altered'; assert.deepEqual(gate(manifest, receipts, altered).publishable, []); });
test('fails closed for a dangling dependency', () => { const altered = structuredClone(records); altered[0].dependencies = ['missing-record']; assert.deepEqual(gate(manifest, receipts, altered).publishable, []); });
test('fails closed for the wrong release approver', () => { const altered = structuredClone(receipts); altered[0].approver = 'agent:metis'; assert.deepEqual(gate(manifest, altered, records).publishable, []); });
test('requires reason and follow-up report for a Metis withdrawal', () => { const altered = [...receipts, { ...receipts[0], action: 'withdraw', approver: 'agent:metis' }]; assert.deepEqual(gate(manifest, altered, records).publishable, []); });
test('fails closed for schema-invalid input and private identifiers', () => { assert.deepEqual(gate({}).publishable, []); const altered = structuredClone(records); altered[0].summary = 'node_01SECRET'; assert.deepEqual(gate(manifest, receipts, altered).publishable, []); });
