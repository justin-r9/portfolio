import { defineField, defineType } from 'sanity'

export const milestone = defineType({
    name: 'milestone',
    title: 'Milestone',
    type: 'document',
    fields: [
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string', // Using string for flexibility (e.g., "2020-2024")
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
})
