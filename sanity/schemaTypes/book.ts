import { defineField, defineType } from 'sanity'

export const book = defineType({
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Reading', value: 'Reading' },
                    { title: 'Read', value: 'Read' },
                    { title: 'To Read', value: 'To Read' },
                ],
            },
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
