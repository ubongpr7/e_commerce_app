import { defineConfig } from 'sanity'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Your Project Title',
  projectId: 'your_project_id',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
