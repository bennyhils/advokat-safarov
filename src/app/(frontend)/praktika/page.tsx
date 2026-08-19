import Link from 'next/link'

import { Eyebrow, Section, Title } from '@/components/Section'
import { payloadClient } from '@/lib/cms'

export async function generateMetadata() {
  return { title: 'Практика' }
}

export default async function CasesPage() {
  const payload = await payloadClient()
  const cases = await payload.find({
    collection: 'cases',
    where: { published: { equals: true } },
    sort: '-updatedAt',
    limit: 50,
  })

  return (
    <Section>
      <Eyebrow>Дела</Eyebrow>
      <Title>Судебная практика</Title>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cases.docs.map((item) => (
          <Link
            key={item.id}
            href={`/praktika/${item.slug}`}
            className="rounded-2xl border border-line bg-panel p-6 hover:border-gold/50"
          >
            {item.result ? <div className="text-sm text-gold">{item.result}</div> : null}
            <h2 className="mt-3 font-serif text-2xl text-cream">{item.title}</h2>
            {item.excerpt ? <p className="mt-3 text-muted">{item.excerpt}</p> : null}
          </Link>
        ))}
      </div>
    </Section>
  )
}
