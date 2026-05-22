export default {
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'href', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};
