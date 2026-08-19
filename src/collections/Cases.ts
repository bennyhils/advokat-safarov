import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Дело',
    plural: 'Практика',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'result', 'published', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название дела',
      required: true,
    },
    slugField,
    {
      name: 'result',
      type: 'text',
      label: 'Результат (коротко)',
      admin: { description: 'Например: «Оправдательный приговор» или «Взыскано 1 200 000 ₽»' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Подробности',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
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
