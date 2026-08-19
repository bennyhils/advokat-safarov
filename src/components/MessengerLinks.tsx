import { maxHref, telHref, tgHref, waHref } from '@/lib/phone'
import type { SiteSettings } from '@/lib/settings'

type Variant = 'row' | 'stack'

export function MessengerLinks({
  settings,
  variant = 'row',
}: {
  settings: SiteSettings
  variant?: Variant
}) {
  const phone = settings.phone || ''
  const wa = settings.whatsapp || phone
  const tg = settings.telegram || phone
  const links = [
    wa ? { href: waHref(wa), label: 'WhatsApp' } : null,
    { href: maxHref(settings.max), label: 'Max' },
    tg ? { href: tgHref(tg), label: 'Telegram' } : null,
  ].filter(Boolean) as { href: string; label: string }[]

  if (!links.length && !phone) {
    return null
  }

  const wrap = variant === 'stack' ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2'

  return (
    <div className={wrap}>
      {phone && variant === 'stack' ? (
        <a
          href={telHref(phone)}
          className="rounded-full border border-gold/50 bg-ink-2 px-4 py-2 text-center text-sm text-gold-2"
        >
          Позвонить
        </a>
      ) : null}
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="rounded-full border border-gold/30 bg-panel px-4 py-2 text-center text-sm text-cream/90 hover:border-gold/60 hover:text-gold-2"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}
