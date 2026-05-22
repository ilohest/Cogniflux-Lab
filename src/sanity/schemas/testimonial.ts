export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'role', title: 'Role', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'color',
      title: 'Card color',
      type: 'string',
      description: 'Use an approved brand hex value only.',
      options: {
        list: [
          { title: 'Orange', value: '#F6B875' },
          { title: 'Coral', value: '#F7A092' },
          { title: 'Peach', value: '#F7D3BA' },
          { title: 'Clay', value: '#D2A084' },
          { title: 'Sand', value: '#F3D9AA' },
          { title: 'Teal', value: '#80D2C8' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
};
