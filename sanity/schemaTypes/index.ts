import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { photo } from './photo'
import { post } from './post'
import { milestone } from './milestone'
import { book } from './book'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, photo, post, milestone, book],
}
