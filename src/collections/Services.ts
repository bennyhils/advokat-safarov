import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'published', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    slugField,
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Полный текст',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: { position: 'sidebar' },
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
