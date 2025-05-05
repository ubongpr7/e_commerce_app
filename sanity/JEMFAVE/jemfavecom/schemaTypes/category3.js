export default {
    name: 'category3',
    title: 'Category3',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'link',
        title: 'Link URL',
        type: 'url',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https'],
        }),
      },
    ],
  };
  