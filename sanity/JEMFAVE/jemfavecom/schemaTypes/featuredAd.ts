// schemas/featuredAd.ts
import { defineType } from 'sanity';

export default defineType({
    name: 'featuredAd',
    title: 'Featured Ad',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'link',
            title: 'Ad Link',
            type: 'url',
            validation: Rule => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
        },
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
        },
    ],
});
