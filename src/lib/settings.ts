export type SiteSettings = {
  siteName: string
  lawyerName: string
  lawyerTitle?: string | null
  phone: string
  whatsapp?: string | null
  telegram?: string | null
  max?: string | null
  email?: string | null
  address?: string | null
  workingHours?: string | null
  yandexMap?: string | null
  orgName?: string | null
  chamberUrl?: string | null
  reviewsUrl?: string | null
  regNumber?: string | null
  photo?: { url?: string | null; alt?: string | null } | number | null
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroSubtitle?: string | null
  aboutText?: string | null
  stats?: { id?: string | null; value: string; label: string }[] | null
  advantages?: { id?: string | null; title: string; text?: string | null }[] | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export const nav = [
  { href: '/uslugi', label: 'Услуги' },
  { href: '/praktika', label: 'Практика' },
  { href: '/novosti', label: 'Новости' },
  { href: '/ob-advokate', label: 'Об адвокате' },
  { href: '/kontakty', label: 'Контакты' },
]
