import { evaluateReleaseGate } from '../src/lib/projection/index.mjs';
import * as fixture from '../src/lib/projection/fixtures/synthetic-approved.mjs';
import { checkReleaseStore } from '../src/lib/labs/check-release-store.mjs';

// Positive control: the gate must still publish its synthetic approved fixture.
const control = evaluateReleaseGate(fixture.manifest, fixture.receipts, fixture.records);
if (!control.publishable.length) {
  console.error(`Projection release gate failed its positive control: ${control.errors.join(', ')}`);
  process.exit(1);
}

// Every committed release must pass the gate (or be a withdrawal tombstone). An empty store passes.
const problems = await checkReleaseStore();
if (problems.length) {
  for (const { releaseId, errors } of problems) console.error(`Projection release gate rejected ${releaseId}: ${errors.join(', ')}`);
  process.exit(1);
}
