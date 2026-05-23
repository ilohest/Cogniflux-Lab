# Sanity setup for Cogniflux Lab

This project is built so the layout stays in Vue/Tailwind and Sanity only manages content.

## What Sanity controls

- SEO title and description
- navigation labels and links
- all headings and body text
- CTA labels and links
- hero, practice, booking, and full-width images
- testimonials
- FAQ items
- location information
- footer links

## What code controls

- layout
- spacing
- typography
- colors
- animations
- responsive behavior
- section order

## 1. Create or choose a Sanity project

In Sanity, create a project for Cogniflux Lab and use the `production` dataset.

Keep the project ID handy. It looks like a short random string.

## 2. Add local environment variables

Create `.env.local` at the project root:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

The `VITE_` variables are used by the Vue site.
The `SANITY_STUDIO_` variables are used by the Studio. They are optional in this project if the matching `VITE_` variables are already set.

## 3. Start the Studio

Use the project Node version first:

```bash
nvm use
```

```bash
npm run studio
```

The Studio uses the schemas in `src/sanity/schemas`.

## 4. Create content

Create one `Home page` document. This is the main editable document for the landing page.

Then create:

- `Testimonial` documents
- `FAQ item` documents

Reference those documents from the `Home page` document to control their order on the page.

## 5. Upload images

Images are editable in Sanity for:

- hero
- practice step cards
- full-width image
- booking section

The code controls the crop containers and proportions. Sanity only provides the chosen image.

## 6. Allow the site to read Sanity

In Sanity project settings, add CORS origins for:

- `http://localhost:5173`
- the final Vercel domain

The dataset should be publicly readable for this landing page. Do not expose a write token in frontend environment variables.

## 7. Deploy on Vercel

Add the same frontend variables in Vercel:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

If the Studio is deployed separately, also set:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Fallback behavior

Before Sanity is connected, the site renders `src/sanity/fallbackContent.ts`.

After Sanity is connected, `src/sanity/queries.ts` fetches the first `homePage` document and passes it to the Vue components.

If a Sanity document is only partially filled in, the frontend merges it with the fallback content so the page can still render while content entry is in progress.
