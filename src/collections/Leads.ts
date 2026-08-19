import type { CollectionConfig } from 'payload'

import { notifyLeadTelegram } from '../lib/telegram'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['name', 'phone', 'status', 'createdAt'],
    group: 'Заявки',
    description: 'Заявки с сайта. Клиент оставляет номер — вам приходит уведомление.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон клиента',
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Комментарий',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Страница',
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'Перезвонили', value: 'called' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Закрыта', value: 'done' },
      ],
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          await notifyLeadTelegram(req.payload, doc)
        }
      },
    ],
  },
}
