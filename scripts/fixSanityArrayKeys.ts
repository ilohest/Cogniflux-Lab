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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

const keyFrom = (pathParts: string[], index: number, item: Record<string, unknown>) => {
  const hint = item._ref || item.label || item.title || item.name || item.question || item.href || item.number || index;
  return slugify([...pathParts, String(hint)].join('-')) || `item-${index}`;
};

const addKeys = (value: unknown, pathParts: string[] = []): unknown => {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return item;
      }

      const record = item as Record<string, unknown>;
      return addKeys(
        {
          _key: typeof record._key === 'string' && record._key ? record._key : keyFrom(pathParts, index, record),
          ...record,
        },
        [...pathParts, String(index)],
      );
    });
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        addKeys(entryValue, [...pathParts, entryKey]),
      ]),
    );
  }

  return value;
};

const stripSystemFields = (document: Record<string, unknown>) => {
  const { _createdAt, _updatedAt, _rev, ...rest } = document;
  return rest;
};

const run = async () => {
  const documents = await client.fetch<Array<Record<string, unknown>>>(
    '*[_id in ["homePage", "siteSettings"] || _type in ["testimonial", "faqItem"]]',
  );

  const transaction = client.transaction();

  documents.forEach((document) => {
    transaction.createOrReplace(stripSystemFields(addKeys(document) as Record<string, unknown>));
  });

  await transaction.commit();

  console.log(JSON.stringify({ repairedDocuments: documents.length }, null, 2));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
