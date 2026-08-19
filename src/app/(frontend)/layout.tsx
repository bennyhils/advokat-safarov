import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Cormorant_Garamond, Manrope } from 'next/font/google'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FloatingContacts } from '@/components/FloatingContacts'
import { payloadClient } from '@/lib/cms'

import './styles.css'

const serif = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
})

const sans = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
})

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await payloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })

  return {
    title: {
      default: settings.seoTitle || settings.siteName,
      template: `%s — ${settings.siteName}`,
    },
    description: settings.seoDescription || undefined,
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: settings.siteName,
      title: settings.seoTitle || settings.siteName,
      description: settings.seoDescription || undefined,
      images: [{ url: '/safarov.jpg', width: 800, height: 800, alt: settings.lawyerName || settings.siteName }],
    },
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const payload = await payloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })

  return (
    <html lang="ru">
      <body className={`${serif.variable} ${sans.variable} bg-ink text-cream antialiased`}>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <FloatingContacts settings={settings} />
      </body>
    </html>
  )
}
