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
                    { title: 'Automation', value: 'Automation' },
                    { title: 'Data Analysis', value: 'Data Analysis' },
                    // Add other categories as needed or make it a free string if preferred, 
                    // but blueprint implies specific categorization.
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
    ],
})
