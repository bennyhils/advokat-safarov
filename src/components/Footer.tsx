import Link from 'next/link'

import { MessengerLinks } from '@/components/MessengerLinks'
import { formatPhone, telHref } from '@/lib/phone'
import { nav, type SiteSettings } from '@/lib/settings'

export function Footer({ settings }: { settings: SiteSettings }) {
  const phone = settings.phone || ''

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl text-gold-2">{settings.siteName}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {settings.lawyerName}
            {settings.lawyerTitle ? ` — ${settings.lawyerTitle}` : ''}
          </p>
          {settings.regNumber ? (
            <p className="mt-2 text-xs text-muted">Рег. № {settings.regNumber}</p>
          ) : null}
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Навигация</div>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-cream/80 hover:text-gold-2">
                {item.label}
              </Link>
            ))}
            <Link href="/politika-konfidencialnosti" className="text-cream/80 hover:text-gold-2">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Контакты</div>
          <div className="mt-4 space-y-3 text-sm text-cream/80">
            {phone ? (
              <a className="block whitespace-nowrap hover:text-gold-2" href={telHref(phone)}>
                {formatPhone(phone)}
              </a>
            ) : null}
            <MessengerLinks settings={settings} />
            {settings.email ? (
              <a className="block hover:text-gold-2" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            ) : null}
            {settings.address ? <p className="whitespace-pre-wrap">{settings.address}</p> : null}
            {settings.workingHours ? <p>{settings.workingHours}</p> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-center text-xs text-muted">
        Информация на сайте не является публичной офертой. Не заменяет консультацию адвоката.
      </div>
    </footer>
  )
}
