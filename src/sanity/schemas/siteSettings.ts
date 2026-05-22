export default {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    { name: 'title', title: 'Site title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'seo', title: 'Default SEO', type: 'seo' },
    {
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'url' },
          ],
        },
      ],
    },
  ],
};
