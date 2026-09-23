/**
 * Labs site entry — the one place pages ask for Labs.
 *
 * Production gating (M3b): a production build reads ONLY the real snapshot
 * store (src/data/labs/releases/). The synthetic fixtures are loaded only in
 * `astro dev` or when the build runs with S2S_LABS_FIXTURES=1 (a local
 * preview build, never the deploy workflow). With no approved real release,
 * /labs/ renders its honest "first Lab in preparation" state and no Lab
 * routes, capsules or claim pages are emitted.
 */
import type { LabCatalog, LabView } from './types';
import { loadLabCatalog } from './load.mjs';

export function labFixturesEnabled(): boolean {
  return Boolean(import.meta.env.DEV) || process.env.S2S_LABS_FIXTURES === '1';
}

let cached: Promise<LabCatalog> | undefined;

export function getLabCatalog(): Promise<LabCatalog> {
  cached ??= loadLabCatalog({ includeFixtures: labFixturesEnabled() }) as Promise<LabCatalog>;
  return cached;
}

export async function getLab(publicId: string): Promise<LabView | undefined> {
  return (await getLabCatalog()).labs.find((lab) => lab.investigation.publicId === publicId);
}
