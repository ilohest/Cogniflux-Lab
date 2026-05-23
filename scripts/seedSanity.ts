import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fallbackHomePage } from '../src/sanity/fallbackContent.ts';
import type { FAQItem, SanityImageAsset, Testimonial } from '../src/types/sanity.ts';

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
    .replace(/^-+|-+$/g, '');

const key = (...parts: Array<string | number | undefined>) =>
  parts
    .filter((part) => part !== undefined && part !== '')
    .map((part) => slugify(String(part)))
    .join('-');

const imageCache = new Map<string, Promise<SanityImageAsset>>();

const toImage = (source: SanityImageAsset | string, alt: string): Promise<SanityImageAsset> => {
  if (typeof source !== 'string') {
    return Promise.resolve(source);
  }

  if (!imageCache.has(source)) {
    imageCache.set(
      source,
      (async () => {
        const relativePath = source.replace(/^\//, '');
        const filePath = path.join(rootDir, 'public', relativePath.replace(/^photos\//, 'photos/'));
        const filename = path.basename(filePath);

        if (!fs.existsSync(filePath)) {
          throw new Error(`Missing local image: ${filePath}`);
        }

        const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename });

        return {
          _type: 'image',
          asset: {
            _ref: asset._id,
          },
          alt,
        };
      })(),
    );
  }

  return imageCache.get(source)!;
};

const testimonialId = (item: Testimonial) => `testimonial-${slugify(item.name)}`;
const faqId = (item: FAQItem, index: number) => `faq-${String(index + 1).padStart(2, '0')}-${slugify(item.question)}`;
const linkWithKey = (item: { label: string; href: string }, index: number) => ({
  _key: key(index, item.label),
  ...item,
});

const run = async () => {
  const page = fallbackHomePage;

  const testimonials = page.testimonials.items.map((item) => ({
    _id: testimonialId(item),
    _type: 'testimonial',
    quote: item.quote,
    name: item.name,
    role: item.role,
    color: item.color,
  }));

  const faqItems = page.faq.items.map((item, index) => ({
    _id: faqId(item, index),
    _type: 'faqItem',
    question: item.question,
    answer: item.answer,
  }));

  const heroImage = await toImage(page.hero.image, 'Cogniflux Lab training studio');
  const fullWidthImage = await toImage(page.fullWidthImage, 'Cogniflux Lab movement training');
  const bookingImage = await toImage(page.booking.image, 'Lokahi Holistic Studio');
  const practiceSteps = await Promise.all(
    page.practiceSteps.map(async (step) => ({
      ...step,
      image: await toImage(step.image, `${step.title} exercise`),
    })),
  );

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    nav: page.nav.map(linkWithKey),
    headerCta: page.headerCta,
    hero: {
      ...page.hero,
      image: heroImage,
    },
    intro: page.intro,
    openLab: page.openLab,
    practiceSteps: practiceSteps.map((step, index) => ({
      _key: key('practice', step.number, step.title),
      ...step,
    })),
    fullWidthImage,
    audience: page.audience,
    testimonials: {
      eyebrow: page.testimonials.eyebrow,
      title: page.testimonials.title,
      items: testimonials.map((item) => ({
        _key: key(item._id),
        _type: 'reference',
        _ref: item._id,
      })),
    },
    booking: {
      ...page.booking,
      image: bookingImage,
    },
    faq: {
      eyebrow: page.faq.eyebrow,
      title: page.faq.title,
      items: faqItems.map((item) => ({
        _key: key(item._id),
        _type: 'reference',
        _ref: item._id,
      })),
    },
    finalCta: page.finalCta,
    footer: {
      ...page.footer,
      columns: page.footer.columns.map((column, index) => ({
        _key: key('footer-column', index, column.title),
        ...column,
        links: column.links.map(linkWithKey),
      })),
      legalLinks: page.footer.legalLinks.map(linkWithKey),
    },
  };

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Cogniflux Lab',
    seo: page.seo,
    socialLinks: (page.footer.columns.find((column) => column.title === 'Follow us')?.links || []).map(linkWithKey),
  };

  const transaction = client.transaction();

  testimonials.forEach((item) => transaction.createOrReplace(item));
  faqItems.forEach((item) => transaction.createOrReplace(item));
  transaction.createOrReplace(siteSettings);
  transaction.createOrReplace(homePage);

  await transaction.commit();

  console.log(
    JSON.stringify(
      {
        homePage: homePage._id,
        siteSettings: siteSettings._id,
        testimonials: testimonials.length,
        faqItems: faqItems.length,
        images: imageCache.size,
      },
      null,
      2,
    ),
  );
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
