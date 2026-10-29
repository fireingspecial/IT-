import { THRESHOLDS, type WeatherData } from '../_lib/rules'
import { ACCENT, Card, SUBTLE } from './ui-bits'

const BADGE_START_DELAY = 1.1

export function BagCard({ badges }: { badges: string[] }) {
  return (
    <Card label="오늘의 가방">
      <h2 className="text-lg font-bold text-gray-900">
        <span aria-hidden="true">🎒</span> 가방에 넣어요
      </h2>
      {badges.length === 0 ? (
        <p className="mt-3 text-base" style={{ color: SUBTLE }}>
          텅~ 특별히 챙길 건 없어요 🙂
        </p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {badges.map((badge, i) => {
            const tilt = i % 2 === 0 ? '-3deg' : '2deg'
            return (
              <li
                key={badge}
                className="anim-sticker rounded-xl border-2 border-dashed border-[#d9a521] bg-[#FFF4D6] px-3 py-1.5 text-sm font-bold text-[#5c3d00] shadow-sm"
                style={
                  {
                    '--tilt': tilt,
                    transform: `rotate(${tilt})`,
                    animationDelay: `${BADGE_START_DELAY + i * 0.15}s`,
                  } as React.CSSProperties
                }
              >
                {badge}
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}

export function MiniInfo({ data }: { data: WeatherData }) {
  const pop = data.pop == null ? null : Math.round(data.pop)
  const wind = data.wind == null ? null : Math.round(data.wind)
  const uv = data.uv == null ? null : Math.round(data.uv)

  const items = [
    { icon: '💧', label: '강수', value: pop == null ? '-' : `${pop}%`, hot: pop != null && pop >= THRESHOLDS.pop },
    {
      icon: '🌬',
      label: '풍속',
      value: wind == null ? '-' : `${wind} km/h`,
      hot: wind != null && wind >= THRESHOLDS.wind,
    },
    { icon: '☀️', label: 'UV', value: uv == null ? '-' : String(uv), hot: uv != null && uv >= THRESHOLDS.uv },
  ]

  return (
    <Card label="미니 정보" className="!px-2 !py-4">
      <dl className="grid grid-cols-3 divide-x divide-gray-200">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 px-1 text-center">
            <dt className="text-sm" style={{ color: SUBTLE }}>
              <span aria-hidden="true">{item.icon}</span> {item.label}
            </dt>
            <dd
              className={`text-base ${item.hot ? 'font-extrabold' : 'font-semibold text-gray-900'}`}
              style={item.hot ? { color: ACCENT } : undefined}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
