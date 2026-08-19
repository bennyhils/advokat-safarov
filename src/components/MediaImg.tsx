import { mediaAlt, mediaUrl, type MediaRef } from '@/lib/cms'

export function MediaImg({
  media,
  alt,
  className,
}: {
  media: MediaRef
  alt?: string
  className?: string
}) {
  const src = mediaUrl(media)
  if (!src) {
    return (
      <div className={`grid place-items-center bg-panel text-gold/50 ${className || ''}`}>
        <span className="font-serif text-4xl">С</span>
      </div>
    )
  }
  return (
    // Payload media URLs are local; skip next/image optimizer edge cases
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || mediaAlt(media)} className={className} />
  )
}
