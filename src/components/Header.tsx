import Link from 'next/link'

import { formatPhone, telHref } from '@/lib/phone'
import { nav, type SiteSettings } from '@/lib/settings'

export function Header({ settings }: { settings: SiteSettings }) {
  const phone = settings.phone || ''

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="min-w-0">
          <div className="font-serif text-xl leading-none text-gold-2 sm:text-2xl">
            {settings.siteName}
          </div>
          <div className="mt-1 truncate text-[11px] uppercase tracking-[0.18em] text-muted">
            {settings.lawyerTitle || 'Новосибирск'}
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-cream/80 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold-2">
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none text-sm text-gold-2">Меню</summary>
          <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-line bg-ink-2 p-3 shadow-xl">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-panel">
                {item.label}
              </Link>
            ))}
          </div>
        </details>

        <div className="flex shrink-0 items-center gap-3">
          {phone ? (
            <a
              href={telHref(phone)}
              className="hidden whitespace-nowrap text-sm font-medium text-gold-2 sm:block"
            >
              {formatPhone(phone)}
            </a>
          ) : null}
          <Link
            href="/kontakty#zayavka"
            className="rounded-full border border-gold/60 bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-2"
          >
            Консультация
          </Link>
        </div>
      </div>
    </header>
  )
}
