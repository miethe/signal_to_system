import { evaluateReleaseGate } from '../src/lib/projection/index.mjs';
import * as fixture from '../src/lib/projection/fixtures/synthetic-approved.mjs';

// Absence of a manifest is intentionally a no-op for the current site.
if (!process.env.S2S_PROJECTION_MANIFEST) process.exit(0);
const result = evaluateReleaseGate(fixture.manifest, fixture.receipts, fixture.records);
if (!result.publishable.length) {
  console.error(`Projection release gate failed: ${result.errors.join(', ')}`);
  process.exit(1);
}
