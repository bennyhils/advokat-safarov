export function digitsPhone(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (!digits) {
    return ''
  }
  // 8… → 7… (старый код выхода). Не дописывать ещё одну 7,
  // если она уже есть из маски «+7».
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  } else if (!digits.startsWith('7')) {
    digits = `7${digits}`
  }
  return digits.slice(0, 11)
}

export function isValidRuPhone(input: string): boolean {
  const digits = digitsPhone(input)
  return digits.length === 11 && digits.startsWith('7')
}

export function formatPhone(input: string): string {
  const digits = digitsPhone(input)
  if (digits.length !== 11) {
    return input.trim()
  }
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

export function formatPhoneInput(raw: string, previous = ''): string {
  let digits = digitsPhone(raw)
  const rawDigitCount = raw.replace(/\D/g, '').length
  const prevDigitCount = previous.replace(/\D/g, '').length
  // Backspace по скобке/дефису не уменьшает число цифр — иначе курсор застревает на «+7 (995)».
  if (previous && raw.length < previous.length && rawDigitCount === prevDigitCount && digits.length > 1) {
    digits = digits.slice(0, -1)
  }
  digits = digits.slice(0, 11)
  const rest = digits.startsWith('7') ? digits.slice(1) : digits
  let out = '+7'
  if (rest.length === 0) {
    return raw.replace(/\D/g, '') === '' ? '' : '+7'
  }
  out += ` (${rest.slice(0, Math.min(3, rest.length))}`
  if (rest.length >= 3) {
    out += ')'
  }
  if (rest.length > 3) {
    out += ` ${rest.slice(3, Math.min(6, rest.length))}`
  }
  if (rest.length > 6) {
    out += `-${rest.slice(6, Math.min(8, rest.length))}`
  }
  if (rest.length > 8) {
    out += `-${rest.slice(8, 10)}`
  }
  return out
}

export function telHref(phone: string): string {
  return `tel:+${digitsPhone(phone)}`
}

export function waHref(phone: string): string {
  return `https://wa.me/${digitsPhone(phone)}`
}

export function tgHref(usernameOrPhone: string): string {
  const value = usernameOrPhone.trim()
  if (/^https?:\/\//i.test(value) || value.startsWith('tg://')) {
    return value
  }
  const handle = value.replace(/^@/, '')
  if (/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(handle)) {
    return `https://t.me/${handle}`
  }
  return `tg://resolve?phone=${digitsPhone(value)}`
}

export function maxHref(profile?: string | null): string {
  const value = (profile || '').trim()
  if (!value) {
    return 'https://max.ru/'
  }
  if (/^https?:\/\//i.test(value)) {
    return value
  }
  const path = value.replace(/^\/+/, '')
  if (path.startsWith('u/') || path.startsWith('max.ru')) {
    return `https://${path.replace(/^https?:\/\//, '')}`
  }
  return `https://max.ru/u/${path.replace(/^@/, '')}`
}
