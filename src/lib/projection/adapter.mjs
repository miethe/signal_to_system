import { evaluateReleaseGate } from './gate.mjs';

/** Store-agnostic read contract; a real snapshot backend plugs in later. */
export class ProjectionAdapter {
  catalog() { throw new Error('ProjectionAdapter.catalog must be implemented'); }
  getRecord(_publicId) { throw new Error('ProjectionAdapter.getRecord must be implemented'); }
  getLifecycle(_publicId) { throw new Error('ProjectionAdapter.getLifecycle must be implemented'); }
  getDependencies(_publicId) { throw new Error('ProjectionAdapter.getDependencies must be implemented'); }
  getReleaseManifest() { throw new Error('ProjectionAdapter.getReleaseManifest must be implemented'); }
}

export class FixtureProjectionAdapter extends ProjectionAdapter {
  constructor({ manifest, receipts, records }) {
    super(); this.manifest = manifest;
    this.records = evaluateReleaseGate(manifest, receipts, records).publishable;
  }
  catalog() { return this.records.map(({ publicId, kind, version, lifecycle }) => ({ publicId, kind, version, lifecycle })); }
  getRecord(publicId) { return this.records.find((record) => record.publicId === publicId) ?? null; }
  getLifecycle(publicId) { return this.getRecord(publicId)?.lifecycle ?? null; }
  getDependencies(publicId) { return this.getRecord(publicId)?.dependencies ?? []; }
  getReleaseManifest() { return this.records.length ? this.manifest : null; }
}
