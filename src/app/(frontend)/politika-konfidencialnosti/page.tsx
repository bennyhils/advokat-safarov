import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'
import type { SiteSettings } from '@/lib/settings'

export async function generateMetadata() {
  return { title: 'Политика конфиденциальности' }
}

export default async function PrivacyPage() {
  const payload = await payloadClient()
  const settings = (await payload.findGlobal({ slug: 'settings' })) as SiteSettings

  return (
    <Section>
      <Eyebrow>152-ФЗ</Eyebrow>
      <Title>Политика конфиденциальности</Title>
      <div className="prose-site mt-8 max-w-3xl space-y-4">
        <p>
          {settings.siteName} ({settings.lawyerName}) обрабатывает персональные данные посетителей сайта
          в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>
        <p>
          Оставляя заявку, вы сообщаете имя и номер телефона, чтобы мы могли связаться с вами по вопросу
          юридической консультации. Данные не продаются третьим лицам и используются только для ответа на
          обращение.
        </p>
        <p>
          Оператор: {settings.lawyerName}. {settings.address ? `Адрес: ${settings.address}.` : ''}{' '}
          {settings.email ? `Email: ${settings.email}.` : ''} {settings.phone ? `Телефон: ${settings.phone}.` : ''}
        </p>
        <p>
          Вы можете запросить уточнение, блокирование или удаление своих данных, направив обращение по
          указанным контактам.
        </p>
      </div>
    </Section>
  )
}
