import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { evaluateReleaseGate } from '../projection/gate.mjs';
import { labBundleSchema } from './schema.mjs';

const root = new URL('../../data/labs/releases/', import.meta.url);
const isApproved = (records, kind, publicId, version) => records.some((record) => record.kind === kind && record.publicId === publicId && record.version === version && record.lifecycle === 'approved');
async function readStore() {
  try {
    const entries = await readdir(fileURLToPath(root), { withFileTypes: true });
    const sources = await Promise.all(entries.filter((entry) => entry.isDirectory()).map(async ({ name }) => {
      try {
        const dir = new URL(`${name}/`, root);
        const values = await Promise.all(['manifest.json', 'receipts.json', 'records.json', 'lab.json'].map(async (file) => JSON.parse(await readFile(new URL(file, dir), 'utf8'))));
        return { manifest: values[0], receipts: values[1], records: values[2], bundle: values[3], fixture: false };
      } catch { return null; }
    }));
    return sources.filter(Boolean);
  } catch { return []; }
}
export async function loadLabCatalog({ includeFixtures = false, sources } = {}) {
  const inputs = sources ?? [
    ...await readStore(),
    ...(includeFixtures
      ? (await import('../../data/labs/fixtures/index.mjs')).releases.map((source) => ({ ...source, fixture: true }))
      : []),
  ];
  const labs = [], tombstones = [], rejected = [];
  for (const source of inputs) {
    const gate = evaluateReleaseGate(source.manifest, source.receipts, source.records);
    if (gate.errors.length) {
      if (gate.errors.every((error) => error.startsWith('withdrawn:'))) {
        const entry = source.manifest.records.find((record) => record.kind === 'lab-investigation');
        const receipt = source.receipts.find((item) => item.action === 'withdraw' && item.publicId === entry?.publicId);
        if (entry && receipt) tombstones.push({ publicId: entry.publicId, version: entry.version, state: 'withdrawn', withdrawnAt: receipt.approvedAt, ...(receipt.reason ? { reason: receipt.reason } : {}), synthetic: source.fixture, href: `/labs/${entry.publicId}/` });
        else rejected.push({ releaseId: source.manifest.releaseId, errors: gate.errors });
      } else rejected.push({ releaseId: source.manifest.releaseId, errors: gate.errors });
      continue;
    }
    const parsed = labBundleSchema.safeParse(source.bundle);
    if (!parsed.success) { rejected.push({ releaseId: source.manifest.releaseId, errors: parsed.error.issues.map((issue) => `schema:${issue.message}`) }); continue; }
    const bundle = parsed.data;
    if (bundle.releaseId !== source.manifest.releaseId) { rejected.push({ releaseId: source.manifest.releaseId, errors: ['release-id-mismatch'] }); continue; }
    if (bundle.synthetic !== source.fixture) { rejected.push({ releaseId: source.manifest.releaseId, errors: ['synthetic-mismatch'] }); continue; }
    const missing = !isApproved(source.records, 'lab-investigation', bundle.investigation.publicId, bundle.investigation.version) ? 'investigation' : !isApproved(source.records, 'lab-report', bundle.report.publicId, bundle.report.version) ? 'report' : bundle.claims.find((claim) => !isApproved(source.records, 'rf-claim', claim.publicId, claim.version))?.publicId;
    if (missing) { rejected.push({ releaseId: source.manifest.releaseId, errors: [`missing-approved-${missing}`] }); continue; }
    const artifacts = bundle.artifacts.filter((item) => isApproved(source.records, 'lab-artifact', item.publicId, item.version));
    const byId = new Map(artifacts.map((item) => [item.id, item]));
    const release = source.receipts.find((item) => item.action === 'release' && item.kind === 'lab-report' && item.publicId === bundle.report.publicId && item.version === bundle.report.version);
    if (!release) { rejected.push({ releaseId: source.manifest.releaseId, errors: ['missing-report-release-receipt'] }); continue; }
    const timeline = [...bundle.timeline, { kind: 'release', date: release.approvedAt.slice(0, 10), label: 'Released', version: bundle.report.version }].sort((a, b) => a.date.localeCompare(b.date));
    labs.push({ ...bundle, artifacts, timeline, figureData: Object.fromEntries(bundle.figures.map((item) => [item.id, item.dataArtifactId ? byId.get(item.dataArtifactId) ?? null : null])), counts: { claims: bundle.claims.length, evidence: bundle.evidence.length, sources: bundle.sources.length, figures: bundle.figures.length, artifacts: artifacts.length }, href: `/labs/${bundle.investigation.publicId}/` });
  }
  labs.sort((a, b) => b.investigation.updatedAt.localeCompare(a.investigation.updatedAt));
  return { labs, tombstones, rejected, fixtures: Boolean(includeFixtures) };
}
