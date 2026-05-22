import { createClient } from '@sanity/client';

export const hasSanityConfig = Boolean(
  import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_DATASET,
);

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-05-22',
  useCdn: true,
});
