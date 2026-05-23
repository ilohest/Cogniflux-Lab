import type { StructureResolver } from 'sanity/structure';

const singletonTypes = ['homePage', 'siteSettings'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cogniflux Lab content')
    .items([
      S.listItem()
        .title('Home page')
        .schemaType('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Site settings')
        .schemaType('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faqItem').title('FAQ items'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletonTypes.includes(id) && !['testimonial', 'faqItem'].includes(id) : true;
      }),
    ]);
