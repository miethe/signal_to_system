import { smallFixture } from './_bundle.mjs';

const release = smallFixture({
  id: 'synthetic-queue-latency',
  releaseId: 'synthetic-queue-latency-r1',
  title: 'Synthetic: Queue Depth and Review Latency',
  approvedAt: '2026-08-01T00:00:00.000Z',
});
release.bundle.investigation.version = '1.1.0';
release.bundle.investigation.methodProfile = 'computational-experiment';
release.bundle.investigation.domains = ['Systems', 'Queueing theory', 'Software engineering', 'Statistics', 'Operations research', 'Human factors', 'Simulation', 'Developer tooling'];
release.bundle.investigation.publishedAt = '2026-07-20';
release.bundle.investigation.updatedAt = '2026-08-01';
release.bundle.investigation.readMinutes = 9;
release.bundle.report.version = '1.1.0';
release.bundle.report.conclusion = { bounded: true, confidence: 'moderate', statement: 'In the simulator, each additional queued change adds about 3.2 minutes of median review latency across depths 1 to 40.', uncertainty: '95% interval 2.8 to 3.6 min per change across 30 seeds; behaviour above depth 40 was not simulated.', scope: 'Synthetic simulator only, depths 1 to 40, single reviewer pool.' };
release.bundle.report.reproduction = 'local-rerun';

export default release;
