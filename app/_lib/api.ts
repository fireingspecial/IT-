import { type CityId, type WeatherData } from './rules'
import { buildForecastUrl, parseForecast, ruleComment } from './weather-shared'

const WEATHER_TIMEOUT_MS = 10_000
// 서버 최악 처리 시간(날씨 5초 + Gemini 4.5초)보다 길어야 응답을 버리지 않는다.
const AI_TIMEOUT_MS = 10_000

export class OfflineError extends Error {}

// 바깥 signal이 이미 abort된 경우에도 즉시 취소되도록 연결한다.
function linkAbort(outer: AbortSignal, controller: AbortController): () => void {
  if (outer.aborted) {
    controller.abort()
    return () => {}
  }
  const onAbort = () => controller.abort()
  outer.addEventListener('abort', onAbort)
  return () => outer.removeEventListener('abort', onAbort)
}

export async function fetchWeather(cityId: CityId, signal: AbortSignal): Promise<WeatherData> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), WEATHER_TIMEOUT_MS)
  const unlink = linkAbort(signal, controller)

  try {
    const res = await fetch(buildForecastUrl(cityId), {
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return parseForecast(await res.json())
  } catch (err) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) throw new OfflineError()
    throw err
  } finally {
    clearTimeout(timer)
    unlink()
  }
}

type AiMockHint = { data: WeatherData; forceFail?: boolean }

/**
 * `GET /api/comment?city={id}`를 호출하고, 서버 오류·네트워크 오류 시 규칙 기반 문구로 대체한다.
 */
export type AiComment = { text: string; source: 'ai' | 'fallback' }

export async function fetchAiComment(
  cityId: CityId,
  signal: AbortSignal,
  hint?: AiMockHint,
): Promise<AiComment | null> {
  if (hint?.forceFail) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS)
  const unlink = linkAbort(signal, controller)
  try {
    const res = await fetch(`/api/comment?city=${encodeURIComponent(cityId)}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      if (typeof json.comment === 'string' && json.comment) {
        return { text: json.comment, source: json.source === 'ai' ? 'ai' : 'fallback' }
      }
    }
  } catch {
    if (signal.aborted) return null
    // 네트워크 오류·타임아웃: 아래 규칙 기반 문구로 대체
  } finally {
    clearTimeout(timer)
    unlink()
  }
  return hint?.data ? { text: ruleComment(cityId, hint.data), source: 'fallback' } : null
}

const KST = 'Asia/Seoul'

export function formatHeaderDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: KST,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return `${get('month')}월 ${get('day')}일 (${get('weekday')})`
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: KST,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}
