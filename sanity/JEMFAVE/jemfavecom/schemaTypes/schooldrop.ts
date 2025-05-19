import { defineType, defineField } from "sanity";

export default defineType({
    name: "schooldrop",
    title: "School Drop",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Full Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "abbreviation",
            title: "Abbreviation",
            type: "string",
            validation: (Rule) => Rule.required().max(10),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
