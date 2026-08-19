import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контакты',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Телефон',
              required: true,
              defaultValue: '+7 (995) 568-89-99',
              admin: {
                description:
                  'Этот номер на сайте, в кнопке «Позвонить» и в WhatsApp / Telegram / Max, если отдельные поля пустые.',
              },
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp',
              admin: {
                description: 'Номер для WhatsApp. Если пусто — берётся основной телефон.',
              },
            },
            {
              name: 'max',
              type: 'text',
              label: 'Max',
              admin: {
                description:
                  'Ссылка на профиль Max (https://max.ru/u/...). Если пусто — кнопка открывает Max; напишите, когда будет персональная ссылка.',
              },
            },
            {
              name: 'telegram',
              type: 'text',
              label: 'Telegram',
              admin: {
                description: 'Username без @ или номер. Если пусто — чат по основному телефону.',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Адрес',
              defaultValue: 'г. Новосибирск',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Часы работы',
              defaultValue: 'пн–сб, 9:00–19:00',
            },
            {
              name: 'yandexMap',
              type: 'textarea',
              label: 'Код карты Яндекс',
              admin: {
                description: 'Вставьте iframe из конструктора карт Яндекса.',
              },
            },
            {
              name: 'orgName',
              type: 'text',
              label: 'Коллегия / организация',
            },
            {
              name: 'chamberUrl',
              type: 'text',
              label: 'Страница в адвокатской палате',
            },
            {
              name: 'reviewsUrl',
              type: 'text',
              label: 'Ссылка на отзывы (2ГИС)',
            },
          ],
        },
        {
          label: 'Сайт',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Название на сайте',
              required: true,
              defaultValue: 'Адвокат в Новосибирске',
            },
            {
              name: 'lawyerName',
              type: 'text',
              label: 'ФИО',
              required: true,
              defaultValue: 'Сафаров Руслан Исаевич',
            },
            {
              name: 'lawyerTitle',
              type: 'text',
              label: 'Должность / статус',
              defaultValue: 'Адвокат Адвокатской палаты Новосибирской области',
            },
            {
              name: 'regNumber',
              type: 'text',
              label: 'Регистрационный номер',
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'Фото адвоката',
            },
            {
              name: 'heroEyebrow',
              type: 'text',
              label: 'Надзаголовок',
              defaultValue: 'Адвокат в Новосибирске',
            },
            {
              name: 'heroTitle',
              type: 'textarea',
              label: 'Главный заголовок',
              defaultValue: 'Защищаем ваши права в суде, на следствии и в переговорах',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Подзаголовок',
              defaultValue:
                'Разберём ситуацию, оценим перспективы и предложим понятный план действий. Первичная консультация — по телефону.',
            },
            {
              name: 'aboutText',
              type: 'textarea',
              label: 'Текст «Об адвокате»',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Цифры на главной',
              fields: [
                { name: 'value', type: 'text', label: 'Значение', required: true },
                { name: 'label', type: 'text', label: 'Подпись', required: true },
              ],
            },
            {
              name: 'advantages',
              type: 'array',
              label: 'Преимущества',
              fields: [
                { name: 'title', type: 'text', label: 'Заголовок', required: true },
                { name: 'text', type: 'textarea', label: 'Текст' },
              ],
            },
          ],
        },
        {
          label: 'Заявки',
          fields: [
            {
              name: 'telegramNotify',
              type: 'checkbox',
              label: 'Присылать новые заявки в Telegram',
              defaultValue: false,
            },
            {
              name: 'telegramBotToken',
              type: 'text',
              label: 'Токен бота',
              admin: {
                description: 'Создайте бота через @BotFather и вставьте токен.',
              },
            },
            {
              name: 'telegramChatId',
              type: 'text',
              label: 'Chat ID',
              admin: {
                description: 'Куда слать заявки. Узнать ID можно у @userinfobot.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'Title',
              defaultValue: 'Адвокат в Новосибирске — консультация и защита в суде',
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Адвокат в Новосибирске: уголовные дела, семья, ДТП, наследство и бизнес. Консультация по телефону.',
            },
          ],
        },
      ],
    },
  ],
}
