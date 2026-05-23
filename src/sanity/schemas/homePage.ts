import { LimitedTestimonialsInput } from '../components/LimitedTestimonialsInput';

export default {
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    {
      name: 'nav',
      title: 'Navigation links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Anchor or URL', type: 'string' },
          ],
        },
      ],
    },
    { name: 'headerCta', title: 'Header CTA', type: 'cta' },
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        { name: 'body', title: 'Body', type: 'text', rows: 3 },
        { name: 'cta', title: 'CTA', type: 'cta' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 3 },
        { name: 'body', title: 'Body paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }] },
      ],
    },
    {
      name: 'openLab',
      title: 'Open Lab explanation',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        { name: 'body', title: 'Body', type: 'text', rows: 4 },
      ],
    },
    { name: 'practiceSteps', title: 'Practice steps', type: 'array', of: [{ type: 'practiceStep' }], validation: (Rule: any) => Rule.min(1) },
    { name: 'fullWidthImage', title: 'Full-width image', type: 'image', options: { hotspot: true } },
    {
      name: 'audience',
      title: 'Who this is for',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        { name: 'body', title: 'Body paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }] },
        { name: 'note', title: 'Final note', type: 'text', rows: 2 },
      ],
    },
    {
      name: 'testimonials',
      title: 'Testimonials section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
          validation: (Rule: any) => Rule.max(10),
          components: {
            input: LimitedTestimonialsInput,
          },
        },
      ],
    },
    {
      name: 'booking',
      title: 'Booking',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'body', title: 'Body', type: 'text', rows: 2 },
        { name: 'cta', title: 'CTA', type: 'cta' },
        { name: 'waitlistTitle', title: 'Waitlist title', type: 'string' },
        { name: 'waitlistBody', title: 'Waitlist body', type: 'text', rows: 2 },
        { name: 'waitlistCta', title: 'Waitlist button label', type: 'string' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        {
          name: 'location',
          title: 'Location',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'address', title: 'Address', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        { name: 'items', title: 'FAQ items', type: 'array', of: [{ type: 'reference', to: [{ type: 'faqItem' }] }] },
      ],
    },
    {
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'text', rows: 2 },
        { name: 'cta', title: 'CTA', type: 'cta' },
      ],
    },
    { name: 'footer', title: 'Footer', type: 'footer' },
  ],
  preview: {
    prepare() {
      return {
        title: 'Cogniflux Lab landing page',
        subtitle: 'Home page content',
      };
    },
  },
};
