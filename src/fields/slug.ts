import type { Field } from 'payload'

import { slugify } from '../lib/slug'

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  label: 'Адрес страницы',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Латиницей, например: ugolovnye-dela. Если пусто — соберётся из названия.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) {
          return slugify(value)
        }
        if (data?.title) {
          return slugify(String(data.title))
        }
        return value
      },
    ],
  },
}
