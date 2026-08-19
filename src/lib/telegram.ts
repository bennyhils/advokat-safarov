import type { Payload } from 'payload'

type LeadLike = {
  name?: string | null
  phone?: string | null
  comment?: string | null
  source?: string | null
}

export async function notifyLeadTelegram(payload: Payload, lead: LeadLike) {
  try {
    const settings = await payload.findGlobal({ slug: 'settings' })
    if (!settings.telegramNotify || !settings.telegramBotToken || !settings.telegramChatId) {
      return
    }

    const lines = [
      'Новая заявка с сайта',
      `Имя: ${lead.name || 'не указано'}`,
      `Телефон: ${lead.phone || '—'}`,
    ]
    if (lead.comment) {
      lines.push(`Комментарий: ${lead.comment}`)
    }
    if (lead.source) {
      lines.push(`Страница: ${lead.source}`)
    }

    await fetch(`https://api.telegram.org/bot${settings.telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: settings.telegramChatId,
        text: lines.join('\n'),
      }),
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Не удалось отправить заявку в Telegram')
  }
}
