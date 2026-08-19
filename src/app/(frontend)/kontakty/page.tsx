import { LeadForm } from '@/components/LeadForm'
import { MessengerLinks } from '@/components/MessengerLinks'
import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'
import { formatPhone, telHref } from '@/lib/phone'
import type { SiteSettings } from '@/lib/settings'

export async function generateMetadata() {
  return { title: 'Контакты' }
}

export default async function ContactsPage() {
  const payload = await payloadClient()
  const settings = (await payload.findGlobal({ slug: 'settings' })) as SiteSettings
  const phone = settings.phone || ''

  return (
    <Section>
      <Eyebrow>Связаться</Eyebrow>
      <Title>Контакты и заявка</Title>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-lg">
          {phone ? (
            <a className="block text-gold-2" href={telHref(phone)}>
              {formatPhone(phone)}
            </a>
          ) : null}
          <MessengerLinks settings={settings} />
          {settings.email ? (
            <a className="block hover:text-gold-2" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
          ) : null}
          {settings.address ? <p className="whitespace-pre-wrap text-muted">{settings.address}</p> : null}
          {settings.workingHours ? <p className="text-muted">{settings.workingHours}</p> : null}
          {settings.reviewsUrl ? (
            <a
              className="block text-sm text-gold-2"
              href={settings.reviewsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Отзывы на 2ГИС →
            </a>
          ) : null}
          {settings.yandexMap ? (
            <div
              className="mt-6 overflow-hidden rounded-2xl border border-line [&_iframe]:h-72 [&_iframe]:w-full"
              dangerouslySetInnerHTML={{ __html: settings.yandexMap }}
            />
          ) : null}
        </div>
        <div className="rounded-3xl border border-line bg-ink-2 p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Оставить номер</h2>
          <p className="mt-2 mb-6 text-sm text-muted">
            Перезвоним или напишем в WhatsApp, Max или Telegram.
          </p>
          <LeadForm source="/kontakty" />
        </div>
      </div>
    </Section>
  )
}
