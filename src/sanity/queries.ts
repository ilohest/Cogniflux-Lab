import { hasSanityConfig, sanityClient } from './client';
import { fallbackHomePage } from './fallbackContent';
import type { HomePageData } from '../types/sanity';

const homePageQuery = `*[_type == "homePage"][0]{
  "seo": *[_type == "siteSettings"][0].seo,
  nav,
  headerCta,
  hero,
  intro,
  openLab,
  practiceSteps[] {
    number,
    title,
    body,
    image,
    dark
  },
  fullWidthImage,
  audience,
  testimonials {
    eyebrow,
    title,
    "items": items[]->{
      quote,
      name,
      role,
      color
    }
  },
  booking,
  faq {
    eyebrow,
    title,
    "items": items[]->{
      question,
      answer
    }
  },
  finalCta,
  footer
}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeWithFallback = <T>(fallback: T, value: unknown): T => {
  if (Array.isArray(fallback)) {
    return Array.isArray(value) && value.length > 0 ? (value as T) : fallback;
  }

  if (isRecord(fallback)) {
    const source = isRecord(value) ? value : {};

    return Object.fromEntries(
      Object.entries(fallback).map(([key, fallbackValue]) => [key, mergeWithFallback(fallbackValue, source[key])]),
    ) as T;
  }

  return value === undefined || value === null || value === '' ? fallback : (value as T);
};

export const getHomePage = async (): Promise<HomePageData> => {
  if (!hasSanityConfig) {
    return fallbackHomePage;
  }

  try {
    const page = await sanityClient.fetch<HomePageData | null>(homePageQuery);
    return page ? mergeWithFallback(fallbackHomePage, page) : fallbackHomePage;
  } catch {
    return fallbackHomePage;
  }
};
