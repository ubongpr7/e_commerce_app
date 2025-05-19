import { Rule } from 'sanity'

export default {
  name: 'school',
  type: 'document',
  title: 'School',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'School Name',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
}
