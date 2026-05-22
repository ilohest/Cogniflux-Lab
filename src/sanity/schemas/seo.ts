export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
  ],
};
