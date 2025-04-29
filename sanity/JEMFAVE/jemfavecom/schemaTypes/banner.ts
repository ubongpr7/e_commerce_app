import { defineType } from "sanity"

const banner = defineType({
  name: "banner",
  title: "Advert Banners",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping
      },
    },
    {
      name: "link",
      title: "Link",
      type: "url", // Allows clickable links
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Use this to control the display order",
    },
  ],
})

export default banner
