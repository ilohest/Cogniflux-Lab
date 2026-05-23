import fs from 'node:fs';
import path from 'node:path';
import { defineCliConfig } from 'sanity/cli';

const readEnv = () => {
  const envPath = path.join(process.cwd(), '.env.local');
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
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || env.SANITY_STUDIO_DATASET || env.VITE_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
