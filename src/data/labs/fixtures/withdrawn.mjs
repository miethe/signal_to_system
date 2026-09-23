import { smallFixture } from './_bundle.mjs';

export default smallFixture({
  id: 'synthetic-withdrawn-example',
  releaseId: 'synthetic-withdrawn-example-r1',
  title: 'Synthetic: Withdrawn Example',
  approvedAt: '2026-05-01T00:00:00.000Z',
  withdrawn: { approvedAt: '2026-05-20T00:00:00.000Z', reason: 'Synthetic fixture: exercises the withdrawal notice.' },
});
