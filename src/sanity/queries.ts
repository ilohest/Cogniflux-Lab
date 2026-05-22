import { hasSanityConfig, sanityClient } from './client';
import { fallbackHomePage } from './fallbackContent';
import type { HomePageData } from '../types/sanity';

const homePageQuery = `*[_type == "homePage"][0]{
  seo,
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

export const getHomePage = async (): Promise<HomePageData> => {
  if (!hasSanityConfig) {
    return fallbackHomePage;
  }

  try {
    const page = await sanityClient.fetch<HomePageData | null>(homePageQuery);
    return page || fallbackHomePage;
  } catch {
    return fallbackHomePage;
  }
};
