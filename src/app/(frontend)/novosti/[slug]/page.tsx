import type { Metadata } from 'next'
import Link from 'next/link'

import { MediaImg } from '@/components/MediaImg'
import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await payloadClient()
  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: found.docs[0]?.title || 'Новость' }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await payloadClient()
  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
  })
  const doc = found.docs[0]
  if (!doc) {
    return (
      <Section>
        <Title>Материал не найден</Title>
        <Link href="/novosti" className="mt-6 inline-block text-gold-2">
          К новостям
        </Link>
      </Section>
    )
  }

  const date = doc.publishedAt
    ? new Date(doc.publishedAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <Section>
      <Link href="/novosti" className="text-sm text-gold-2">
        ← Все новости
      </Link>
      <Eyebrow>{date || 'Публикация'}</Eyebrow>
      <Title>{doc.title}</Title>
      {doc.image ? (
        <MediaImg media={doc.image} alt={doc.title} className="mt-8 max-h-[460px] w-full rounded-3xl object-cover" />
      ) : null}
      <p className="prose-site mt-8 max-w-3xl">{doc.content || doc.excerpt}</p>
    </Section>
  )
}
