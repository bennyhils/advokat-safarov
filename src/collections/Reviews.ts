import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'source', 'published'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      label: 'Автор',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      label: 'Источник',
      admin: { description: 'Например: flamp.ru, Яндекс, письмо' },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст отзыва',
      required: true,
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
