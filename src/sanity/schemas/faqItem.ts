export default {
  name: 'faqItem',
  title: 'FAQ item',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
  ],
};
