import { LeadForm } from '@/components/LeadForm'
import { MediaImg } from '@/components/MediaImg'
import { MessengerLinks } from '@/components/MessengerLinks'
import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'
import { formatPhone, telHref } from '@/lib/phone'
import type { SiteSettings } from '@/lib/settings'

export async function generateMetadata() {
  return { title: 'Об адвокате' }
}

export default async function AboutPage() {
  const payload = await payloadClient()
  const settings = (await payload.findGlobal({ slug: 'settings' })) as SiteSettings

  return (
    <Section>
      <Eyebrow>Новосибирск</Eyebrow>
      <Title>{settings.lawyerName}</Title>
      <p className="mt-3 text-gold-2">{settings.lawyerTitle}</p>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        <MediaImg
          media={settings.photo}
          alt={settings.lawyerName}
          className="h-[480px] w-full rounded-3xl object-cover object-top"
        />
        <div>
          <p className="prose-site">{settings.aboutText}</p>
          {settings.regNumber ? (
            <p className="mt-4 text-sm text-muted">Регистрационный номер: {settings.regNumber}</p>
          ) : null}
          {settings.orgName ? <p className="mt-1 text-sm text-muted">{settings.orgName}</p> : null}
          {settings.chamberUrl ? (
            <a
              href={settings.chamberUrl}
              className="mt-3 inline-block text-sm text-gold-2"
              target="_blank"
              rel="noreferrer"
            >
              Карточка в Адвокатской палате НСО →
            </a>
          ) : null}
          {settings.phone ? (
            <a href={telHref(settings.phone)} className="mt-6 block text-gold-2">
              {formatPhone(settings.phone)}
            </a>
          ) : null}
          <div className="mt-4">
            <MessengerLinks settings={settings} />
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-xl rounded-3xl border border-line bg-ink-2 p-6">
        <h2 className="font-serif text-3xl">Записаться на консультацию</h2>
        <p className="mt-2 mb-6 text-sm text-muted">Оставьте номер телефона.</p>
        <LeadForm source="/ob-advokate" />
      </div>
    </Section>
  )
}
