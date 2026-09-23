import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function files(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]))).flat();
  } catch { return []; }
}
const distFiles = await files('dist');
const content = await Promise.all(distFiles.map((file) => readFile(file, 'utf8').catch(() => '')));
if (content.some((value) => value.includes('data-lab-fixture') || value.includes('"synthetic":true'))) process.exitCode = 1;
const releases = (await readdir('src/data/labs/releases', { withFileTypes: true })).filter((entry) => entry.isDirectory());
const labs = (await readdir('dist/labs', { withFileTypes: true }).catch(() => [])).filter((entry) => entry.isDirectory());
if (!releases.length && labs.length) process.exitCode = 1;
if (process.exitCode) console.error('Labs production check failed');
else console.log('Labs production check passed');
