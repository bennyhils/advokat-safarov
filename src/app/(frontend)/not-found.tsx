import { Section, Title } from '@/components/Section'

export default function NotFound() {
  return (
    <Section>
      <Title>Страница не найдена</Title>
      <a href="/" className="mt-6 inline-block text-gold-2">
        На главную
      </a>
    </Section>
  )
}
