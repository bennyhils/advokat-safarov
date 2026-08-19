import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@payload-config'
import { SAFAROV, SAFAROV_REVIEWS } from '../content/safarov'

async function main() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'settings',
    data: SAFAROV,
    overrideAccess: true,
  })

  const existing = await payload.find({ collection: 'reviews', limit: 100, overrideAccess: true })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'reviews', id: doc.id, overrideAccess: true })
  }

  for (const review of SAFAROV_REVIEWS) {
    await payload.create({
      collection: 'reviews',
      data: { ...review, published: true },
      overrideAccess: true,
    })
  }

  payload.logger.info('Обновлены данные Сафарова Р. И.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
