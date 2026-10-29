import { useState } from 'react'
import { CITIES, REGIONS, type CityId } from '../_lib/rules'

export function AppHeader({ icon, dateLabel, dark }: { icon: string; dateLabel: string; dark: boolean }) {
  return (
    <header className="flex items-center justify-between gap-3 pt-2">
      <h1
        className={`text-[22px] font-extrabold tracking-tight ${dark ? 'text-white drop-shadow' : 'text-gray-900'}`}
      >
        오늘 뭐 입지? <span aria-hidden="true">{icon}</span>
      </h1>
      <p className={`text-sm font-medium ${dark ? 'text-white/90' : 'text-gray-700'}`}>{dateLabel}</p>
    </header>
  )
}

export function CityBar({
  cityId,
  disabled,
  onChange,
  onRefresh,
}: {
  cityId: CityId
  disabled: boolean
  onChange: (id: CityId) => void
  onRefresh: () => void
}) {
  const [turns, setTurns] = useState(0)

  return (
    <div className={`flex items-center gap-2 transition-opacity ${disabled ? 'opacity-50' : ''}`}>
      <div className="relative flex-1">
        <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
          📍
        </span>
        <select
          aria-label="도시 선택"
          value={cityId}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value as CityId)}
          className="h-12 w-full cursor-pointer appearance-none rounded-2xl bg-white/85 pl-11 pr-10 text-base font-semibold text-gray-900 shadow-[0_4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED] disabled:cursor-not-allowed"
        >
          {REGIONS.map((region) => {
            const citiesInRegion = CITIES.filter((c) => c.region === region)
            if (citiesInRegion.length === 0) return null
            return (
              <optgroup key={region} label={`── ${region} ──`}>
                {citiesInRegion.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500"
        >
          ▼
        </span>
      </div>
      <button
        type="button"
        aria-label="현재 도시 날씨 새로고침"
        disabled={disabled}
        onClick={() => {
          setTurns((t) => t + 1)
          onRefresh()
        }}
        className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/85 text-xl font-bold text-[#2F80ED] shadow-[0_4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED] disabled:cursor-not-allowed"
      >
        <span
          aria-hidden="true"
          className="block transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${turns * 360}deg)` }}
        >
          ↻
        </span>
      </button>
    </div>
  )
}
