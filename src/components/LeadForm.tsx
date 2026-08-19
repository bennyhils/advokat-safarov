'use client'

import { useState, type FormEvent } from 'react'

import { formatPhoneInput } from '@/lib/phone'

export function LeadForm({ source }: { source?: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const res = await fetch('/zayavka', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        comment,
        consent,
        source: source || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      }),
    })
    const data = (await res.json().catch(() => null)) as { error?: string } | null
    if (!res.ok) {
      setStatus('error')
      setError(data?.error || 'Не удалось отправить заявку')
      return
    }
    setStatus('ok')
    setName('')
    setPhone('')
    setComment('')
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-gold/40 bg-panel p-8 text-center">
        <div className="font-serif text-3xl text-gold-2">Заявка отправлена</div>
        <p className="mt-3 text-muted">Перезвоним на указанный номер в ближайшее время.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" id="zayavka">
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Имя</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          className="rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none focus:border-gold"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Телефон</span>
        <input
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value, phone))}
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (999) 123-45-67"
          className="rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none focus:border-gold"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Коротко о ситуации</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Не обязательно, но так консультация будет точнее"
          className="resize-y rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none focus:border-gold"
        />
      </label>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          Согласен на обработку персональных данных согласно{' '}
          <a className="text-gold-2 underline" href="/politika-konfidencialnosti">
            политике конфиденциальности
          </a>
        </span>
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-gold-2 disabled:opacity-60"
      >
        {status === 'loading' ? 'Отправляем…' : 'Жду звонка'}
      </button>
    </form>
  )
}
