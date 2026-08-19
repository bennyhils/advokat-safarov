import { MessengerLinks } from '@/components/MessengerLinks'
import type { SiteSettings } from '@/lib/settings'

export function FloatingContacts({ settings }: { settings: SiteSettings }) {
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:bottom-6">
      <MessengerLinks settings={settings} variant="stack" />
    </div>
  )
}
