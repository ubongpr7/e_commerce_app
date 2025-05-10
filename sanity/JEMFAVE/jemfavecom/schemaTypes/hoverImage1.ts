import { defineType, defineField } from "sanity";

export default defineType({
  name: "hoverImage1",
  title: "Hover Image 1",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
  ],
});
