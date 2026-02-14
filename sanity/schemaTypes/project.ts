import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Web Design', value: 'Web Design' },
                    { title: 'Graphic Design', value: 'Graphic Design' },
                ],
            },
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'completed' },
                    { title: 'Pending', value: 'pending' },
                    { title: 'Coming Soon', value: 'Coming Soon' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'], // Exclude exif and location
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'liveSiteUrl',
            title: 'Live Site URL',
            type: 'url',
        }),
        defineField({
            name: 'sourceCodeUrl',
            title: 'Source Code URL',
            type: 'url',
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),

    ],
})
