import { useMemo } from 'react'
import type { ThemeKey } from '../_lib/rules'

export type BackgroundTheme = ThemeKey | 'default'

const GRADIENTS: Record<BackgroundTheme, string> = {
  default: 'linear-gradient(180deg, #9fd3f7 0%, #e6f4fd 100%)',
  clear: 'linear-gradient(180deg, #74bff3 0%, #fff1a8 100%)',
  partly: 'linear-gradient(180deg, #88c6f0 0%, #ffffff 100%)',
  cloudy: 'linear-gradient(180deg, #7f92a8 0%, #dde2e8 100%)',
  fog: 'linear-gradient(180deg, #c3c9d2 0%, #ffffff 100%)',
  drizzle: 'linear-gradient(180deg, #2a3c69 0%, #7d8ea6 100%)',
  rain: 'linear-gradient(180deg, #1b2a52 0%, #66778f 100%)',
  snow: 'linear-gradient(180deg, #c9b8f0 0%, #ffffff 100%)',
  storm: 'linear-gradient(180deg, #0e1834 0%, #565d6c 100%)',
}

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function useParticles(count: number, seed: number) {
  return useMemo(() => {
    const rand = seeded(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      delay: rand() * -6,
      speed: rand(),
      size: rand(),
    }))
  }, [count, seed])
}

function Rain({ count, dense }: { count: number; dense: boolean }) {
  const drops = useParticles(count, dense ? 7 : 3)
  return (
    <>
      {drops.map((d) => (
        <span
          key={d.id}
          className="anim-rain absolute top-0 block w-px rounded-full bg-white/60"
          style={{
            left: `${d.left}%`,
            height: dense ? 18 + d.size * 14 : 10 + d.size * 8,
            opacity: dense ? 0.7 : 0.45,
            animationDuration: `${dense ? 0.7 + d.speed * 0.5 : 1.4 + d.speed * 0.8}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </>
  )
}

function Snow() {
  const flakes = useParticles(32, 11)
  return (
    <>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="anim-snow absolute top-0 block text-white"
          style={{
            left: `${f.left}%`,
            fontSize: 10 + f.size * 14,
            opacity: 0.85,
            textShadow: '0 0 4px rgba(120,100,200,0.5)',
            animationDuration: `${7 + f.speed * 6}s`,
            animationDelay: `${f.delay * 2}s`,
          }}
        >
          {f.id % 3 === 0 ? '·' : '❄'}
        </span>
      ))}
    </>
  )
}

function Clouds({ count }: { count: number }) {
  const clouds = [
    { top: '8%', size: 72, duration: 60, delay: -10, opacity: 0.9 },
    { top: '26%', size: 52, duration: 80, delay: -45, opacity: 0.75 },
    { top: '48%', size: 88, duration: 95, delay: -70, opacity: 0.6 },
  ].slice(0, count)
  return (
    <>
      {clouds.map((c, i) => (
        <span
          key={i}
          className="anim-cloud absolute left-0 block"
          style={{
            top: c.top,
            fontSize: c.size,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          ☁️
        </span>
      ))}
    </>
  )
}

function Clear() {
  const sparkles = [
    { top: '12%', left: '18%', delay: 0 },
    { top: '30%', left: '72%', delay: 0.8 },
    { top: '55%', left: '10%', delay: 1.5 },
    { top: '68%', left: '84%', delay: 0.4 },
    { top: '40%', left: '40%', delay: 1.9 },
    { top: '84%', left: '30%', delay: 1.1 },
  ]
  return (
    <>
      <span className="anim-spin-slow absolute -right-10 top-16 block text-[120px] leading-none opacity-90">
        ☀️
      </span>
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="anim-twinkle absolute block text-lg text-amber-50"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
        >
          ✦
        </span>
      ))}
    </>
  )
}

function Fog() {
  const bands = [
    { top: '15%', duration: 9, delay: 0 },
    { top: '40%', duration: 12, delay: -3 },
    { top: '65%', duration: 10, delay: -6 },
  ]
  return (
    <>
      {bands.map((b, i) => (
        <span
          key={i}
          className="anim-fog absolute -left-[10%] block h-16 w-[120%] rounded-full bg-white/55 blur-xl"
          style={{ top: b.top, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </>
  )
}

function Effects({ theme }: { theme: BackgroundTheme }) {
  switch (theme) {
    case 'clear':
      return <Clear />
    case 'partly':
      return <Clouds count={2} />
    case 'cloudy':
      return <Clouds count={3} />
    case 'fog':
      return <Fog />
    case 'drizzle':
      return <Rain count={22} dense={false} />
    case 'rain':
      return <Rain count={40} dense />
    case 'snow':
      return <Snow />
    case 'storm':
      return (
        <>
          <Rain count={36} dense />
          <span className="anim-lightning absolute inset-0 block bg-white" />
        </>
      )
    default:
      return null
  }
}

export function ThemeBackground({ theme }: { theme: BackgroundTheme }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {(Object.keys(GRADIENTS) as BackgroundTheme[]).map((key) => (
        <div
          key={key}
          className="absolute inset-0 transition-opacity duration-[400ms] ease-out"
          style={{ backgroundImage: GRADIENTS[key], opacity: key === theme ? 1 : 0 }}
        />
      ))}
      <div className="fx-layer pointer-events-none absolute inset-0 overflow-hidden">
        <Effects theme={theme} />
      </div>
    </div>
  )
}
