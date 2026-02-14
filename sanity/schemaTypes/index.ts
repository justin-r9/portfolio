import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { photo } from './photo'
import { milestone } from './milestone'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, photo, milestone],
}
