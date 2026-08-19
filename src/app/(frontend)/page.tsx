import Link from 'next/link'

import { LeadForm } from '@/components/LeadForm'
import { MediaImg } from '@/components/MediaImg'
import { MessengerLinks } from '@/components/MessengerLinks'
import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'
import { formatPhone, telHref } from '@/lib/phone'
import type { SiteSettings } from '@/lib/settings'

const steps = [
  { n: '01', t: 'Заявка или звонок', d: 'Оставляете номер или звоните сами — коротко описываете ситуацию.' },
  { n: '02', t: 'Консультация', d: 'Разбираем факты, документы и перспективы. Говорим, имеет ли смысл идти дальше.' },
  { n: '03', t: 'Договор', d: 'Фиксируем задачу, сроки и стоимость. Без сюрпризов в процессе.' },
  { n: '04', t: 'Работа по делу', d: 'Следствие, суд, переговоры — вы в курсе каждого шага.' },
  { n: '05', t: 'Результат', d: 'Доводим до решения и, если нужно, контролируем исполнение.' },
]

export default async function HomePage() {
  const payload = await payloadClient()
  const settings = (await payload.findGlobal({ slug: 'settings' })) as SiteSettings
  const [services, cases, reviews, posts] = await Promise.all([
    payload.find({ collection: 'services', where: { published: { equals: true } }, sort: 'order', limit: 6 }),
    payload.find({ collection: 'cases', where: { published: { equals: true } }, limit: 3, sort: '-updatedAt' }),
    payload.find({ collection: 'reviews', where: { published: { equals: true } }, limit: 3, sort: '-updatedAt' }),
    payload.find({ collection: 'posts', where: { published: { equals: true } }, limit: 3, sort: '-publishedAt' }),
  ])

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <Eyebrow>{settings.heroEyebrow || 'Адвокат в Новосибирске'}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-cream sm:text-6xl">
            {settings.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{settings.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakty#zayavka"
              className="rounded-full bg-gold px-6 py-3 font-semibold text-ink hover:bg-gold-2"
            >
              Оставить номер
            </Link>
            {settings.phone ? (
              <a
                href={telHref(settings.phone)}
                className="rounded-full border border-gold/50 px-6 py-3 text-gold-2"
              >
                Позвонить {formatPhone(settings.phone)}
              </a>
            ) : null}
          </div>
          <div className="mt-5">
            <MessengerLinks settings={settings} />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold/20" />
          <MediaImg
            media={settings.photo}
            alt={settings.lawyerName}
            className="relative h-[420px] w-full rounded-[1.6rem] object-cover object-top sm:h-[520px]"
          />
          <div className="absolute right-6 bottom-6 max-w-xs rounded-2xl border border-gold/30 bg-ink/80 p-4 backdrop-blur">
            <div className="font-serif text-xl text-gold-2">{settings.lawyerName}</div>
            <div className="mt-1 text-sm text-muted">{settings.lawyerTitle}</div>
          </div>
        </div>
      </section>

      {settings.stats?.length ? (
        <div className="border-y border-line bg-ink-2">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
            {settings.stats.map((item) => (
              <div key={item.label}>
                <div className="font-serif text-4xl text-gold-2">{item.value}</div>
                <div className="mt-2 text-sm text-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Section>
        <Eyebrow>Почему обращаются</Eyebrow>
        <Title>Спокойная и понятная защита</Title>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(settings.advantages || []).map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="font-serif text-2xl text-cream">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Практика</Eyebrow>
            <Title>Услуги адвоката</Title>
          </div>
          <Link href="/uslugi" className="hidden text-sm text-gold-2 sm:block">
            Все услуги →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.docs.map((item) => (
            <Link
              key={item.id}
              href={`/uslugi/${item.slug}`}
              className="group rounded-2xl border border-line bg-ink-2 p-6 transition hover:border-gold/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl text-cream group-hover:text-gold-2">{item.title}</h3>
                <span className="text-gold">→</span>
              </div>
              {item.excerpt ? <p className="mt-3 text-sm leading-relaxed text-muted">{item.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Как идём по делу</Eyebrow>
        <Title>Пять шагов до понятного результата</Title>
        <div className="mt-10 grid gap-5 md:grid-cols-5">
          {steps.map((step) => (
            <article key={step.n} className="border-t border-gold/40 pt-4">
              <div className="font-serif text-2xl text-gold">{step.n}</div>
              <h3 className="mt-3 text-cream">{step.t}</h3>
              <p className="mt-2 text-sm text-muted">{step.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Дела</Eyebrow>
            <Title>Судебная практика</Title>
          </div>
          <Link href="/praktika" className="hidden text-sm text-gold-2 sm:block">
            Все дела →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.docs.map((item) => (
            <Link
              key={item.id}
              href={`/praktika/${item.slug}`}
              className="rounded-2xl border border-line bg-panel p-6 hover:border-gold/50"
            >
              {item.result ? <div className="text-sm text-gold">{item.result}</div> : null}
              <h3 className="mt-3 font-serif text-2xl text-cream">{item.title}</h3>
              {item.excerpt ? <p className="mt-3 text-sm text-muted">{item.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Клиенты</Eyebrow>
            <Title>Отзывы</Title>
          </div>
          {settings.reviewsUrl ? (
            <a
              href={settings.reviewsUrl}
              className="hidden text-sm text-gold-2 sm:block"
              target="_blank"
              rel="noreferrer"
            >
              Отзывы на 2ГИС →
            </a>
          ) : null}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.docs.map((item) => (
            <article key={item.id} className="rounded-2xl border border-line bg-ink-2 p-6">
              <p className="text-cream/90">«{item.text}»</p>
              <div className="mt-5 text-sm text-gold-2">{item.author}</div>
              {item.source ? <div className="text-xs text-muted">{item.source}</div> : null}
            </article>
          ))}
          {settings.reviewsUrl ? (
            <a
              href={settings.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-between rounded-2xl border border-gold/30 bg-panel p-6 hover:border-gold/60"
            >
              <div>
                <div className="text-sm text-gold">2ГИС</div>
                <h3 className="mt-3 font-serif text-2xl text-cream">Смотреть отзывы на карточке</h3>
                <p className="mt-3 text-sm text-muted">
                  Актуальные оценки и комментарии клиентов — в 2ГИС.
                </p>
              </div>
              <span className="mt-6 text-sm text-gold-2">Открыть 2ГИС →</span>
            </a>
          ) : null}
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Публикации</Eyebrow>
            <Title>Новости и комментарии</Title>
          </div>
          <Link href="/novosti" className="hidden text-sm text-gold-2 sm:block">
            Все новости →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.docs.map((item) => (
            <Link key={item.id} href={`/novosti/${item.slug}`} className="group">
              <h3 className="font-serif text-2xl text-cream group-hover:text-gold-2">{item.title}</h3>
              {item.excerpt ? <p className="mt-3 text-sm text-muted">{item.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-28">
        <div className="grid items-start gap-10 rounded-[2rem] border border-gold/25 bg-ink-2 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Заявка</Eyebrow>
            <Title>Оставьте номер — перезвоним</Title>
            <p className="mt-4 max-w-md text-muted">
              Перезвоним или напишем в WhatsApp, Max или Telegram.
            </p>
            {settings.phone ? (
              <a href={telHref(settings.phone)} className="mt-6 inline-block text-gold-2">
                Или позвоните: {formatPhone(settings.phone)}
              </a>
            ) : null}
          </div>
          <LeadForm source="/" />
        </div>
      </Section>
    </>
  )
}
