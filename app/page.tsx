'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AppFooter } from './_components/app-footer'
import { BagCard, MiniInfo } from './_components/bag-and-info'
import { ErrorView, LoadingView, OfflineView } from './_components/state-views'
import { ThemeBackground, type BackgroundTheme } from './_components/theme-background'
import { AppHeader, CityBar } from './_components/top-bar'
import { WardrobeCard, type AiState } from './_components/wardrobe-card'
import { WeatherStage } from './_components/weather-stage'
import { fetchAiComment, fetchWeather, formatHeaderDate, formatTime, OfflineError } from './_lib/api'
import {
  DARK_THEMES,
  DEFAULT_CITY,
  getCity,
  isCityId,
  recommend,
  type CityId,
  type Recommendation,
  type WeatherData,
} from './_lib/rules'

const STORAGE_KEY = 'wearToday.city'

type Status = 'loading' | 'success' | 'error' | 'offline'
type MockMode = 'loading' | 'error' | 'offline' | 'ai-fail' | null

type Result = {
  requestId: number
  cityId: CityId
  data: WeatherData
  rec: Recommendation
  entrance: 'open' | 'jump'
  updatedAt: string
}

type DevConfig = { mock: MockMode; preview: WeatherData | null }

function readDevConfig(): DevConfig {
  const sp = new URLSearchParams(window.location.search)
  const mockParam = sp.get('mock')
  const mock: MockMode =
    mockParam === 'loading' || mockParam === 'error' || mockParam === 'offline' || mockParam === 'ai-fail'
      ? mockParam
      : null

  if (sp.get('weather') === null) return { mock, preview: null }

  const n = (key: string): number | null => {
    const raw = sp.get(key)
    if (raw === null || raw.trim() === '') return null
    const value = Number(raw)
    return Number.isFinite(value) ? value : null
  }
  const feels = n('feels') ?? n('temp') ?? 15
  return {
    mock,
    preview: {
      code: n('weather'),
      temp: n('temp') ?? feels,
      feels,
      humidity: null,
      precipitation: null,
      wind: n('wind'),
      max: n('max'),
      min: n('min'),
      pop: n('pop'),
      uv: n('uv'),
    },
  }
}

function readStoredCity(): CityId {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isCityId(stored) ? stored : DEFAULT_CITY
  } catch {
    return DEFAULT_CITY
  }
}

function storeCity(id: CityId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {}
}

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(REDUCED_QUERY)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  )
}

export default function Page() {
  const [cityId, setCityId] = useState<CityId>(DEFAULT_CITY)
  const [status, setStatus] = useState<Status>('loading')
  const [result, setResult] = useState<Result | null>(null)
  const [ai, setAi] = useState<AiState>({ status: 'pending' })
  const [dateLabel, setDateLabel] = useState('')
  const reducedMotion = useReducedMotion()

  const requestRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)
  const configRef = useRef<DevConfig>({ mock: null, preview: null })

  const load = useCallback(async (id: CityId, entrance: 'open' | 'jump') => {
    const requestId = ++requestRef.current
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setStatus('loading')

    const { mock, preview } = configRef.current
    if (mock === 'loading') return

    try {
      if (mock === 'offline' || !navigator.onLine) throw new OfflineError()
      if (mock === 'error') {
        await new Promise((r) => setTimeout(r, 600))
        throw new Error('mock error')
      }
      const data = preview ?? (await fetchWeather(id, controller.signal))
      if (requestId !== requestRef.current) return
      const now = new Date()
      setDateLabel(formatHeaderDate(now))
      setAi({ status: 'pending' })
      setResult({ requestId, cityId: id, data, rec: recommend(data), entrance, updatedAt: formatTime(now) })
      setStatus('success')
    } catch (err) {
      if (requestId !== requestRef.current) return
      setStatus(err instanceof OfflineError ? 'offline' : 'error')
    }
  }, [])

  useEffect(() => {
    configRef.current = readDevConfig()
    const initial = readStoredCity()
    setCityId(initial)
    setDateLabel(formatHeaderDate(new Date()))
    load(initial, 'open')
    return () => abortRef.current?.abort()
  }, [load])

  useEffect(() => {
    if (!result) return
    const controller = new AbortController()
    fetchAiComment(result.cityId, controller.signal, {
      data: result.data,
      forceFail: configRef.current.mock === 'ai-fail',
    }).then((res) => {
      if (controller.signal.aborted || result.requestId !== requestRef.current) return
      setAi(res ? { status: 'done', text: res.text, source: res.source } : { status: 'failed' })
    })
    return () => controller.abort()
  }, [result])

  const handleCityChange = (id: CityId) => {
    setCityId(id)
    storeCity(id)
    load(id, 'open')
  }

  const theme: BackgroundTheme =
    status === 'success' || status === 'loading'
      ? (result?.rec.condition.theme ?? 'default')
      : 'default'
  const dark = theme !== 'default' && DARK_THEMES.includes(theme)
  const showResult = status === 'success' && result

  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden">
      <ThemeBackground theme={theme} />
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-4 px-4 pb-6 pt-3">
        <AppHeader icon={showResult ? result.rec.outfit.icon : '👕'} dateLabel={dateLabel} dark={dark} />
        <CityBar
          cityId={cityId}
          disabled={status === 'loading'}
          onChange={handleCityChange}
          onRefresh={() => load(cityId, 'jump')}
        />

        {status === 'loading' && <LoadingView />}
        {status === 'error' && <ErrorView onRetry={() => load(cityId, 'open')} />}
        {status === 'offline' && <OfflineView onRetry={() => load(cityId, 'open')} />}
        {showResult && (
          <>
            <WeatherStage data={result.data} rec={result.rec} />
            <WardrobeCard
              key={result.requestId}
              rec={result.rec}
              entrance={result.entrance}
              ai={ai}
              reducedMotion={reducedMotion}
              cityName={getCity(result.cityId).name}
              dateLabel={dateLabel}
            />
            <BagCard badges={result.rec.badges} />
            <MiniInfo data={result.data} />
          </>
        )}

        <AppFooter updatedAt={showResult ? result.updatedAt : (result?.updatedAt ?? null)} dark={dark} />
      </main>
    </div>
  )
}
