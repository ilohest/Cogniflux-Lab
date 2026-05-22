export default {
  name: 'practiceStep',
  title: 'Practice step',
  type: 'object',
  fields: [
    { name: 'number', title: 'Number', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'body',
      title: 'Body paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'dark', title: 'Dark card', type: 'boolean', initialValue: false },
  ],
};
