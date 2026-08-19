import type { Metadata } from 'next'
import Link from 'next/link'

import { LeadForm } from '@/components/LeadForm'
import { MediaImg } from '@/components/MediaImg'
import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await payloadClient()
  const found = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = found.docs[0]
  return { title: doc?.title || 'Услуга' }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await payloadClient()
  const found = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
  })
  const doc = found.docs[0]
  if (!doc) {
    return (
      <Section>
        <Title>Страница не найдена</Title>
        <Link href="/uslugi" className="mt-6 inline-block text-gold-2">
          Ко всем услугам
        </Link>
      </Section>
    )
  }

  return (
    <Section>
      <Link href="/uslugi" className="text-sm text-gold-2">
        ← Все услуги
      </Link>
      <Eyebrow>Услуга</Eyebrow>
      <Title>{doc.title}</Title>
      {doc.image ? (
        <MediaImg media={doc.image} alt={doc.title} className="mt-8 max-h-[420px] w-full rounded-3xl object-cover" />
      ) : null}
      {doc.content || doc.excerpt ? (
        <p className="prose-site mt-8 max-w-3xl">{doc.content || doc.excerpt}</p>
      ) : null}
      <div className="mt-14 max-w-xl rounded-3xl border border-line bg-ink-2 p-6">
        <h2 className="font-serif text-3xl text-cream">Обсудить эту услугу</h2>
        <p className="mt-2 mb-6 text-sm text-muted">Оставьте номер — перезвоним.</p>
        <LeadForm source={`/uslugi/${slug}`} />
      </div>
    </Section>
  )
}
