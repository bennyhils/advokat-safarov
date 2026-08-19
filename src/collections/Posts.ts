import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'published'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    slugField,
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Анонс',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Текст',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Показывать на сайте',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
