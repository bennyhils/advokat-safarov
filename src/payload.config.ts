import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Cases } from './collections/Cases'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'
import { seedIfNeeded } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.SERVER_URL || 'http://localhost:3000'

function csrfOrigins(url: string) {
  const origins = [url]
  try {
    const parsed = new URL(url)
    if (parsed.hostname.startsWith('www.')) {
      origins.push(`${parsed.protocol}//${parsed.hostname.slice(4)}`)
    } else {
      origins.push(`${parsed.protocol}//www.${parsed.hostname}`)
    }
  } catch {
    /* ignore invalid SERVER_URL */
  }
  return origins
}

export default buildConfig({
  serverURL,
  csrf: csrfOrigins(serverURL),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Админка',
    },
    timezones: {
      defaultTimezone: 'Asia/Novosibirsk',
    },
  },
  i18n: {
    supportedLanguages: { ru },
    fallbackLanguage: 'ru',
  },
  collections: [Leads, Services, Cases, Posts, Reviews, Media, Users],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-env',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./advokat-nsk.db',
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    await seedIfNeeded(payload)
  },
})
