import { defineField, defineType } from 'sanity'

export const photo = defineType({
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'], // Exclude exif and location
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
    ],
})
