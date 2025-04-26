import { defineField } from 'sanity'

export const bannerType = defineField({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Banner Description',
      type: 'text',
      description: 'Optional description for the banner',
      validation: (Rule) => Rule.max(200).warning('Description should be less than 200 characters'),
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true, // Allow user to crop and focus on the image
      },
      validation: (Rule) => Rule.required().error('Image is required'),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional URL the banner links to',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort banners in the carousel',
      validation: (Rule) => Rule.min(1).max(100).error('Order should be between 1 and 100'),
    },
  ],
})
