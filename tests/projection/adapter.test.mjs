import test from 'node:test';
import assert from 'node:assert/strict';
import { FixtureProjectionAdapter, ProjectionAdapter } from '../../src/lib/projection/adapter.mjs';
import { manifest, receipts, records } from '../../src/lib/projection/fixtures/synthetic-approved.mjs';

test('fixture adapter returns only gate-approved records', () => { const adapter = new FixtureProjectionAdapter({ manifest, receipts, records }); assert.equal(adapter.catalog().length, 1); assert.equal(adapter.getRecord('missing'), null); assert.equal(adapter.getLifecycle(records[0].publicId), 'approved'); assert.deepEqual(adapter.getDependencies(records[0].publicId), []); assert.equal(adapter.getReleaseManifest().releaseId, manifest.releaseId); });
test('base adapter declares every store-agnostic method', () => { const adapter = new ProjectionAdapter(); for (const method of ['catalog', 'getRecord', 'getLifecycle', 'getDependencies', 'getReleaseManifest']) assert.throws(() => adapter[method]()); });
test('invalid fixture release exposes no records or manifest', () => { const adapter = new FixtureProjectionAdapter({ manifest, receipts: [], records }); assert.deepEqual(adapter.catalog(), []); assert.equal(adapter.getRecord(records[0].publicId), null); assert.equal(adapter.getReleaseManifest(), null); });
