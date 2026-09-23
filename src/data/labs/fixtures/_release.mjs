import { digestProjection } from '../../../lib/projection/index.mjs';

export function buildRelease({ releaseId, bundle, recordSpecs, approvedAt, approve = true, withdraw }) {
  const records = recordSpecs.map(({ publicId, kind, version, lifecycle = 'approved', sourceRefs, dependencies = [], summary }) => {
    const record = { publicId, kind, version, lifecycle, sourceRefs, dependencies, destinations: [`https://example.invalid/labs/${publicId}`], summary };
    return { ...record, digest: digestProjection({ ...record, digest: undefined }) };
  });
  const manifest = { schemaVersion: '1', releaseId, records: records.map(({ publicId, kind, version, digest }) => ({ publicId, kind, version, digest })) };
  const receipts = approve ? records.map((record) => ({ schemaVersion: '1', action: 'release', publicId: record.publicId, kind: record.kind, version: record.version, digest: record.digest, approver: 'human:nick', approvedAt, sourceRefs: record.sourceRefs })) : [];
  if (withdraw) {
    const record = records.find(({ kind }) => kind === 'lab-investigation');
    receipts.push({ schemaVersion: '1', action: 'withdraw', publicId: record.publicId, kind: record.kind, version: record.version, digest: record.digest, approver: 'human:nick', approvedAt: withdraw.approvedAt, sourceRefs: record.sourceRefs, reason: withdraw.reason });
  }
  return { manifest, receipts, records, bundle, fixture: true };
}
