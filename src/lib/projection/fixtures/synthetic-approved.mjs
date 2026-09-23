import { digestProjection } from '../index.mjs';

const baseRecord = {
  publicId: 'synthetic-claim-001', kind: 'rf-claim', version: '1.0.0', lifecycle: 'approved',
  sourceRefs: ['rf:claim:synthetic-claim@1.0.0'], dependencies: [],
  destinations: ['https://example.invalid/synthetic-claim'], summary: 'Synthetic fixture only.',
};
export const records = [{ ...baseRecord, digest: digestProjection({ ...baseRecord, digest: undefined }) }];
export const manifest = { schemaVersion: '1', releaseId: 'synthetic-release-001', records: records.map(({ publicId, kind, version, digest }) => ({ publicId, kind, version, digest })) };
export const receipts = [{ schemaVersion: '1', action: 'release', publicId: records[0].publicId, kind: records[0].kind, version: records[0].version, digest: records[0].digest, approver: 'human:nick', approvedAt: '2026-09-22T00:00:00.000Z', sourceRefs: records[0].sourceRefs }];
