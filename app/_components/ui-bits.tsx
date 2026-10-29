import type { ReactNode } from 'react'
import type { Character } from '../_lib/rules'

export const ACCENT = '#2F80ED'
export const SUBTLE = '#6B7280'

export function Card({
  children,
  className = '',
  as: Tag = 'section',
  label,
}: {
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
  label?: string
}) {
  return (
    <Tag
      aria-label={label}
      className={`rounded-2xl bg-white/85 p-5 text-gray-900 shadow-[0_4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md ${className}`}
    >
      {children}
    </Tag>
  )
}

export function CharacterFigure({
  character,
  headOverride,
  prop,
  size = 44,
}: {
  character: Character
  headOverride?: string
  prop?: string | null
  size?: number
}) {
  const hand = prop === undefined ? character.hand : prop
  return (
    <div
      aria-hidden="true"
      className="flex select-none flex-col items-center leading-none"
      style={{ fontSize: size }}
    >
      {character.hat && <span className="-mb-3 block">{character.hat}</span>}
      <span className="block">{headOverride ?? character.head}</span>
      <span className="relative -mt-1 block">
        {character.top}
        {hand && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 pl-0.5" style={{ fontSize: size * 0.8 }}>
            {hand}
          </span>
        )}
      </span>
      <span className="-mt-1 block">{character.bottom}</span>
      <span className="-mt-2 block" style={{ fontSize: size * 0.8 }}>
        {character.shoes}
      </span>
    </div>
  )
}

export function WardrobeDoors({ className = '', lock = false }: { className?: string; lock?: boolean }) {
  return (
    <div aria-hidden="true" className={`relative flex h-full w-full overflow-hidden rounded-xl ${className}`}>
      <div className="wood relative flex flex-1 items-center justify-end border-r border-[#6e4219] pr-2">
        {!lock && <span className="text-sm text-amber-100">◉</span>}
      </div>
      <div className="wood relative flex flex-1 items-center justify-start pl-2">
        {!lock && <span className="text-sm text-amber-100">◉</span>}
      </div>
      {lock && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">🔒</span>
      )}
    </div>
  )
}

export function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="날씨 다시 불러오기"
      className="mt-4 rounded-full px-6 py-2.5 text-base font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED]"
      style={{ backgroundColor: ACCENT }}
    >
      다시 시도
    </button>
  )
}
