import Link from 'next/link'

import { payloadClient } from '@/lib/cms'
import { Eyebrow, Section, Title } from '@/components/Section'

export async function generateMetadata() {
  return { title: 'Услуги' }
}

export default async function ServicesPage() {
  const payload = await payloadClient()
  const services = await payload.find({
    collection: 'services',
    where: { published: { equals: true } },
    sort: 'order',
    limit: 50,
  })

  return (
    <Section>
      <Eyebrow>Новосибирск</Eyebrow>
      <Title>Услуги адвоката</Title>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {services.docs.map((item) => (
          <Link
            key={item.id}
            href={`/uslugi/${item.slug}`}
            className="rounded-2xl border border-line bg-panel p-6 hover:border-gold/50"
          >
            <h2 className="font-serif text-2xl text-cream">{item.title}</h2>
            {item.excerpt ? <p className="mt-3 text-muted">{item.excerpt}</p> : null}
          </Link>
        ))}
      </div>
    </Section>
  )
}
