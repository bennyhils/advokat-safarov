import { NextResponse } from 'next/server'

import { payloadClient } from '@/lib/cms'
import { formatPhone, isValidRuPhone } from '@/lib/phone'

const hits = new Map<string, { count: number; ts: number }>()

function clientIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
}

function rateLimited(ip: string) {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now - rec.ts > 10 * 60 * 1000) {
    hits.set(ip, { count: 1, ts: now })
    return false
  }
  rec.count += 1
  return rec.count > 8
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много заявок. Позвоните напрямую.' }, { status: 429 })
  }

  const body = (await req.json().catch(() => null)) as {
    name?: string
    phone?: string
    comment?: string
    source?: string
    consent?: boolean
  } | null

  if (!body?.consent) {
    return NextResponse.json(
      { error: 'Нужно согласие на обработку персональных данных.' },
      { status: 400 },
    )
  }

  const phone = (body.phone || '').trim()
  if (!isValidRuPhone(phone)) {
    return NextResponse.json({ error: 'Укажите телефон в формате +7 (999) 123-45-67' }, { status: 400 })
  }

  const payload = await payloadClient()
  await payload.create({
    collection: 'leads',
    data: {
      name: (body.name || '').trim().slice(0, 120) || undefined,
      phone: formatPhone(phone),
      comment: (body.comment || '').trim().slice(0, 2000) || undefined,
      source: (body.source || '').trim().slice(0, 300) || undefined,
      status: 'new',
    },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}
