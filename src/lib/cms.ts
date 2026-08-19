import { getPayload } from 'payload'

import config from '@payload-config'

export async function payloadClient() {
  return getPayload({ config: await config })
}

export type MediaRef = {
  url?: string | null
  alt?: string | null
  filename?: string | null
} | number | null | undefined

export function mediaUrl(media: MediaRef): string | null {
  if (!media || typeof media === 'number') {
    return null
  }
  return media.url || null
}

export function mediaAlt(media: MediaRef, fallback = ''): string {
  if (!media || typeof media === 'number') {
    return fallback
  }
  return media.alt || fallback
}
