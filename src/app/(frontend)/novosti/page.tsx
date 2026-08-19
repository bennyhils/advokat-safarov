import Link from 'next/link'

import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'

export async function generateMetadata() {
  return { title: 'Новости' }
}

function formatDate(value?: string | null) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PostsPage() {
  const payload = await payloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { published: { equals: true } },
    sort: '-publishedAt',
    limit: 50,
  })

  return (
    <Section>
      <Eyebrow>Публикации</Eyebrow>
      <Title>Новости и комментарии</Title>
      <div className="mt-10 grid gap-8">
        {posts.docs.map((item) => (
          <Link key={item.id} href={`/novosti/${item.slug}`} className="border-b border-line pb-8">
            <div className="text-xs uppercase tracking-[0.16em] text-gold">
              {formatDate(item.publishedAt)}
            </div>
            <h2 className="mt-2 font-serif text-3xl text-cream">{item.title}</h2>
            {item.excerpt ? <p className="mt-3 max-w-3xl text-muted">{item.excerpt}</p> : null}
          </Link>
        ))}
      </div>
    </Section>
  )
}
