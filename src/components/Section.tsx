import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-[0.22em] text-gold">{children}</div>
  )
}

export function Title({ children }: { children: ReactNode }) {
  return <h2 className="mt-3 font-serif text-4xl leading-tight text-cream sm:text-5xl">{children}</h2>
}
