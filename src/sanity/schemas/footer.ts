export default {
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'email', title: 'Email', type: 'email', validation: (Rule: any) => Rule.required() },
    {
      name: 'columns',
      title: 'Link columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
                    { name: 'href', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    },
    { name: 'credit', title: 'Credit', type: 'string' },
  ],
};
