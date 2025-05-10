import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hoverImage2',
  title: 'Hover Image 2',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
  ],
})
