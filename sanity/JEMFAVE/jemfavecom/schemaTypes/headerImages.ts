// schemas/headerImages.ts

export default {
    name: "headerImages",
    title: "Header Images",
    type: "document",
    fields: [
        {
            name: "mobileImage",
            title: "Mobile Header Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "mobileLink",
            title: "Mobile Image Link",
            type: "url",
        },
        {
            name: "mobileTitle",
            title: "Mobile Image Title",
            type: "string",
        },
        {
            name: "desktopImage",
            title: "Desktop Header Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "desktopLink",
            title: "Desktop Image Link",
            type: "url",
        },
        {
            name: "desktopTitle",
            title: "Desktop Image Title",
            type: "string",
        },
    ],
};
