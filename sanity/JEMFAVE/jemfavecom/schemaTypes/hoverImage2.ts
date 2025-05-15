// ./schemas/hoverImage1.ts
import { defineType } from 'sanity';

export default defineType({
  name: 'hoverImage2',
  title: 'Hover Image 2',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    },
  ],
});
