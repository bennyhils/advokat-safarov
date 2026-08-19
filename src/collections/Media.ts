import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Файл',
    plural: 'Фото и файлы',
  },
  admin: {
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Подпись / alt',
      defaultValue: '',
    },
  ],
  upload: true,
}
