import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { getCliClient } = require('@sanity/cli');
const rootDir = process.cwd();

const readEnv = () => {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) return {};

  return Object.fromEntries(
    fs
      .readFileSync(envPath, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separatorIndex = line.indexOf('=');
        return [line.slice(0, separatorIndex), line.slice(separatorIndex + 1)];
      }),
  );
};

const env = readEnv();
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID || env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || env.SANITY_STUDIO_DATASET || env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error('Missing Sanity projectId or dataset. Add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to .env.local.');
}

const client = getCliClient({ apiVersion: '2026-05-22', projectId, dataset });

client
  .patch('homePage')
  .unset(['footer.credit'])
  .commit()
  .then(() => console.log(JSON.stringify({ removed: 'homePage.footer.credit' }, null, 2)))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
