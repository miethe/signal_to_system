import { createHash } from 'node:crypto';
import { z } from 'zod';

const sha256 = z.string().regex(/^sha256:[a-f0-9]{64}$/i, 'expected sha256 digest');
const publicId = z.string().regex(/^[a-z][a-z0-9-]{2,79}$/);
const exactVersion = z.string().regex(/^(?!latest$|main$|head$)[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/i);
const sourceRef = z.string().regex(/^(rf|skillmeat|wiki):[a-z][a-z0-9-]*:[a-zA-Z0-9._-]+@[A-Za-z0-9._-]+$/);
const safeUrl = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === 'https:' || url.protocol === 'http:';
}, 'expected http(s) URL');

export const lifecycleSchema = z.enum(['candidate', 'approved', 'withdrawn']);
export const projectionKindSchema = z.enum([
  'rf-claim', 'skillmeat-artifact', 'wiki-ref',
  'lab-investigation', 'lab-report', 'lab-experiment', 'lab-artifact', 'lab-film',
]);
export const projectionRecordSchema = z.object({
  publicId,
  kind: projectionKindSchema,
  version: exactVersion,
  digest: sha256,
  lifecycle: lifecycleSchema,
  sourceRefs: z.array(sourceRef).min(1),
  dependencies: z.array(publicId).default([]),
  destinations: z.array(safeUrl).default([]),
  summary: z.string().max(500).optional(),
}).strict();

export const releaseManifestSchema = z.object({
  schemaVersion: z.literal('1'),
  releaseId: publicId,
  records: z.array(z.object({ publicId, kind: projectionKindSchema, version: exactVersion, digest: sha256 }).strict()).min(1),
  // Optional private-release sidecar digest binds a Lab public release to its private source record.
  releaseSidecarDigest: sha256.optional(),
}).strict();

export const approvalReceiptSchema = z.object({
  schemaVersion: z.literal('1'), action: z.enum(['release', 'withdraw']), publicId,
  kind: projectionKindSchema, version: exactVersion, digest: sha256, approver: z.string(),
  approvedAt: z.string().datetime(), sourceRefs: z.array(sourceRef).min(1),
  reason: z.string().min(1).optional(), followUpReport: z.string().min(1).optional(),
}).strict().superRefine((receipt, context) => {
  if (receipt.action === 'release' && receipt.approver !== 'human:nick') context.addIssue({ code: 'custom', message: 'only human:nick may release' });
  if (receipt.action === 'withdraw' && !['human:nick', 'agent:metis'].includes(receipt.approver)) context.addIssue({ code: 'custom', message: 'withdrawal requires human:nick or agent:metis' });
  if (receipt.action === 'withdraw' && receipt.approver === 'agent:metis' && (!receipt.reason || !receipt.followUpReport)) context.addIssue({ code: 'custom', message: 'Metis withdrawal requires reason and followUpReport' });
});

/**
 * Return the SHA-256 identifier for exact serialized projection bytes.
 *
 * This intentionally preserves insertion order: Lab producers must emit the fixed schema order
 * (publicId through summary, with digest omitted) before calling this function.
 */
export function digestProjection(record) {
  return `sha256:${createHash('sha256').update(JSON.stringify(record)).digest('hex')}`;
}

const privateFieldNames = new Set(['reviews', 'workspace', 'unresolvedReferences']);
const privateMaterialPattern = /(?:^|[^a-z])(node_|tree_|ws_|req_|agentic-nuc|\/private\/|\.ssh\/|secrets?\.env|\/Users\/|\/home\/|(?<![\w.])(?:10\.(?:25[0-5]|2[0-4]\d|1?\d?\d)\.(?:25[0-5]|2[0-4]\d|1?\d?\d)\.(?:25[0-5]|2[0-4]\d|1?\d?\d)|172\.(?:1[6-9]|2\d|3[0-1])\.(?:25[0-5]|2[0-4]\d|1?\d?\d)\.(?:25[0-5]|2[0-4]\d|1?\d?\d)|192\.168\.(?:25[0-5]|2[0-4]\d|1?\d?\d)\.(?:25[0-5]|2[0-4]\d|1?\d?\d))(?![\w.]))/i;

function hasPrivateMaterial(value, denied = []) {
  const serialized = JSON.stringify(value);
  return privateMaterialPattern.test(serialized) || denied.some((identifier) => serialized.includes(identifier));
}

function hasPrivateFields(records) {
  return records.some((record) => Object.keys(record).some((key) => privateFieldNames.has(key)));
}

/** Fail-closed semantic release gate: an error makes every record unavailable. */
export function evaluateReleaseGate(manifestInput, receiptInputs, recordInputs, options = {}) {
  const manifest = releaseManifestSchema.safeParse(manifestInput);
  const receipts = z.array(approvalReceiptSchema).safeParse(receiptInputs);
  const records = z.array(projectionRecordSchema).safeParse(recordInputs);
  const denied = options.denied === undefined ? [] : options.denied;
  if (!manifest.success || !receipts.success || !records.success || !Array.isArray(denied)) return { publishable: [], errors: ['schema-invalid'] };
  if (hasPrivateFields(recordInputs) || hasPrivateMaterial({ manifest: manifest.data, receipts: receipts.data, records: records.data }, denied)) return { publishable: [], errors: ['private-material'] };
  if (manifest.data.releaseSidecarDigest && options.releaseSidecarDigest !== manifest.data.releaseSidecarDigest) return { publishable: [], errors: ['release-sidecar-mismatch'] };
  const declared = new Map(manifest.data.records.map((entry) => [entry.publicId, entry]));
  const byId = new Map(records.data.map((record) => [record.publicId, record]));
  const errors = [];
  if (declared.size !== manifest.data.records.length || byId.size !== records.data.length) errors.push('duplicate-public-id');
  for (const entry of manifest.data.records) {
    const record = byId.get(entry.publicId);
    if (!record || record.kind !== entry.kind || record.version !== entry.version || record.digest !== entry.digest) errors.push(`manifest-mismatch:${entry.publicId}`);
  }
  for (const record of records.data) {
    if (!declared.has(record.publicId)) errors.push(`undeclared-record:${record.publicId}`);
    if (record.lifecycle !== 'approved') errors.push(`not-approved:${record.publicId}`);
    for (const dependency of record.dependencies) if (!byId.has(dependency)) errors.push(`dangling-reference:${record.publicId}`);
    if (record.digest !== digestProjection({ ...record, digest: undefined })) errors.push(`digest-mismatch:${record.publicId}`);
    const matching = receipts.data.filter((receipt) => receipt.publicId === record.publicId && receipt.kind === record.kind && receipt.version === record.version && receipt.digest === record.digest);
    if (!matching.some((receipt) => receipt.action === 'release' && receipt.approver === 'human:nick')) errors.push(`unapproved:${record.publicId}`);
    if (matching.some((receipt) => receipt.action === 'withdraw')) errors.push(`withdrawn:${record.publicId}`);
  }
  return errors.length ? { publishable: [], errors } : { publishable: records.data, errors: [] };
}

