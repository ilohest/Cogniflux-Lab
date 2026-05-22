import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'cognifluxLab',
  title: 'Cogniflux Lab',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
