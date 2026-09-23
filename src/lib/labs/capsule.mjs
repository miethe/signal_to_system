export const CAPSULE_SCOPES = ['orientation', 'evidence', 'reproduction'];

const join = (site, path) => `${site.replace(/\/$/, '')}${path}`;
const clean = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));

export function buildCapsule(lab, scope, { site }) {
  if (!CAPSULE_SCOPES.includes(scope)) throw new Error(`Unknown capsule scope: ${scope}`);
  const { investigation: i, report: r } = lab;
  const capsule = {
    schemaVersion: '1', scope, capsuleId: `${i.publicId}@${i.version}/${scope}`,
    canonicalUrl: join(site, lab.href), htmlIsCanonical: true,
    permissions: { execute: false, install: false, publish: false }, synthetic: lab.synthetic,
    investigation: { publicId: i.publicId, version: i.version, title: i.title, question: i.question, methodProfile: i.methodProfile, contribution: i.contribution, domains: i.domains, publishedAt: i.publishedAt, updatedAt: i.updatedAt, license: i.license },
    conclusion: { ...r.conclusion }, largestLimitation: r.largestLimitation, limitations: r.limitations,
    review: r.review, reproduction: r.reproduction,
  };
  if (scope === 'orientation') Object.assign(capsule, {
    whyItMatters: i.whyItMatters, summary: r.summary,
    claims: lab.claims.map(({ label, statement, status, confidence }) => ({ label, statement, status, confidence })),
    sections: [{ label: 'Overview', url: join(site, lab.href) }, { label: 'Claims', url: `${join(site, lab.href)}claims/` }, { label: 'Resources', url: `${join(site, lab.href)}resources/` }, ...CAPSULE_SCOPES.flatMap((name) => [{ label: `${name} JSON capsule`, url: `${join(site, lab.href)}capsule/${name}.json` }, { label: `${name} Markdown capsule`, url: `${join(site, lab.href)}capsule/${name}.md` }])],
  });
  if (scope === 'evidence') Object.assign(capsule, {
    claims: lab.claims.map((claim) => clean({ publicId: claim.publicId, version: claim.version, label: claim.label, type: claim.type, statement: claim.statement, scope: claim.scope, status: claim.status, confidence: claim.confidence, uncertainty: claim.uncertainty, checkedAt: claim.checkedAt, limitations: claim.limitations, receipts: claim.receipts.map(({ kind, date }) => ({ kind, date })), evidence: claim.evidence.map(({ evidenceId, relation }) => { const item = lab.evidence.find((candidate) => candidate.id === evidenceId); return clean({ id: evidenceId, relation, kind: item?.kind, access: item?.access, title: item?.access === 'denied' ? undefined : item?.title }); }), resolutionUrl: `${join(site, lab.href)}claims/${claim.label.toLowerCase()}/${claim.version}/` })),
    sources: lab.sources.map((source) => source.access === 'denied' ? { id: source.id, access: 'denied' } : clean({ id: source.id, kind: source.kind, access: source.access, title: source.title, publisher: source.publisher, period: source.period, href: source.href, license: source.license, version: source.version })),
    figures: lab.figures.map((figure) => { const artifact = lab.figureData[figure.id]; return { id: figure.id, title: figure.title, classification: figure.classification, reviewed: figure.reviewed, uncertainty: figure.uncertainty, dataArtifact: artifact ? { publicId: artifact.publicId, version: artifact.version, digest: artifact.digest } : null }; }),
  });
  if (scope === 'reproduction') Object.assign(capsule, { method: { profile: lab.method.profile, fields: lab.method.fields, deviations: lab.method.deviations, failures: lab.method.failures }, reproduce: lab.reproduce, artifacts: lab.artifacts.map(({ publicId, version, digest, id, kind, title, mediaType, bytes, license, href }) => ({ publicId, version, digest, id, kind, title, mediaType, bytes, license, href })) });
  if (JSON.stringify(capsule).length > 65536) throw new Error('Capsule exceeds size bound; use a narrower scope.');
  return capsule;
}

const escape = (value) => String(value).replace(/\\/g, '\\\\').replace(/([*_`\[\]<>])/g, '\\$1').replace(/^#/gm, '\\#');
export function capsuleMarkdown(capsule) {
  const out = [`# ${escape(capsule.investigation.title)}`, `Canonical: ${escape(capsule.canonicalUrl)}`, 'Permissions: execute=false; install=false; publish=false', '', '## Conclusion', escape(capsule.conclusion.statement), `Uncertainty: ${escape(capsule.conclusion.uncertainty)}`, `Scope: ${escape(capsule.conclusion.scope)}`, '', '## Largest limitation', escape(capsule.largestLimitation), '', '## Limitations', ...capsule.limitations.map((item) => `- ${escape(item)}`)];
  if (capsule.claims) { out.push('', '## Claims'); for (const item of capsule.claims) { out.push(`- ${escape(item.label)} — ${escape(item.status)}: ${escape(item.statement)}`); if (item.scope) out.push(`  - Scope: ${escape(item.scope)}`); if (item.uncertainty) out.push(`  - Uncertainty: ${escape(item.uncertainty)}`); for (const limitation of item.limitations ?? []) out.push(`  - Limitation: ${escape(limitation)}`); } }
  if (capsule.sources) out.push('', '## Sources', ...capsule.sources.map((source) => source.access === 'denied' ? `- ${escape(source.id)} — denied` : `- ${escape(source.id)} — ${escape(source.title ?? source.kind)}`));
  if (capsule.figures) out.push('', '## Figures', ...capsule.figures.map((item) => `- ${escape(item.id)} — ${escape(item.title)}`));
  if (capsule.artifacts) out.push('', '## Artifacts', ...capsule.artifacts.map((item) => `- ${escape(item.id)} — ${escape(item.title)}`));
  if (capsule.reproduce) { out.push('', '## Reproduction'); for (const step of capsule.reproduce.steps) { out.push(`- ${escape(step.label)}`); if (step.command) out.push('```text', escape(step.command), '```'); } }
  return `${out.join('\n')}\n`;
}
