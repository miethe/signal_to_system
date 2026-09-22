import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => (
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]
  )));
  return nested.flat();
}

function toRoute(file) {
  const output = relative('dist', file).replaceAll('\\', '/');
  if (output === 'index.html') return '/';
  if (output.endsWith('/index.html')) return `/${output.slice(0, -10)}`;
  return /\.(html|xml|json)$/.test(output) ? `/${output}` : null;
}

const routeList = (await walk('dist')).map(toRoute).filter(Boolean).sort();
const snapshotPath = 'tests/m0/routes.snapshot.json';

if (process.argv.includes('--write')) {
  await writeFile(snapshotPath, `${JSON.stringify({ routes: routeList }, null, 2)}\n`);
  console.log(`Wrote route snapshot (${routeList.length} routes).`);
} else {
  const manifest = JSON.parse(await readFile('docs/project_plans/s2s-v2/migration-manifest.json', 'utf8'));
  const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
  const manifestRoutes = manifest.routes.map(({ path }) => path).sort();
  assert.equal(new Set(manifestRoutes).size, manifestRoutes.length, 'manifest has duplicate paths');
  assert.deepEqual(routeList, manifestRoutes, 'built routes differ from migration manifest');
  assert.deepEqual(routeList, snapshot.routes.slice().sort(), 'built routes differ from route snapshot');
  console.log(`Route snapshot passed (${routeList.length} routes).`);
}
