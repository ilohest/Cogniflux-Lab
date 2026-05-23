export interface SanityImageAsset {
  _type?: 'image';
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface SEO {
  title: string;
  description: string;
}

export interface PracticeStep {
  number: string;
  title: string;
  body: string[];
  image: SanityImageAsset | string;
  dark?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface LocationInfo {
  label: string;
  name: string;
  address: string;
}

export interface HomePageData {
  seo: SEO;
  nav: FooterLink[];
  headerCta: CTA;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    cta: CTA;
    image: SanityImageAsset | string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string[];
  };
  openLab: {
    eyebrow: string;
    title: string;
    body: string;
  };
  practiceSteps: PracticeStep[];
  fullWidthImage: SanityImageAsset | string;
  audience: {
    eyebrow: string;
    title: string;
    body: string[];
    note: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  booking: {
    eyebrow: string;
    title: string;
    body: string;
    cta: CTA;
    waitlistTitle: string;
    waitlistBody: string;
    waitlistCta: string;
    image: SanityImageAsset | string;
    location: LocationInfo;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FAQItem[];
  };
  finalCta: {
    title: string;
    cta: CTA;
  };
  footer: {
    headline: string;
    email: string;
    columns: FooterColumn[];
    legalLinks: FooterLink[];
  };
}
