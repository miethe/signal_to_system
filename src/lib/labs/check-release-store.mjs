import { loadLabCatalog, readReleaseStore, releaseStoreRoot } from './load.mjs';

/**
 * Build-time check over the committed release store: every release directory must be complete and
 * must either render or be a withdrawal tombstone. The renderer fails closed by omitting a rejected
 * release; the build must fail loudly on the same input, so a digest mismatch or a partial release
 * never ships as a silently missing page.
 */
export async function checkReleaseStore({ root = releaseStoreRoot } = {}) {
  const problems = [];
  const sources = await readReleaseStore({ root, problems });
  const { rejected } = await loadLabCatalog({ sources });
  return [...problems, ...rejected];
}
