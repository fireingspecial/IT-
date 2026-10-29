import { NextRequest, NextResponse } from 'next/server'
import { getCity, getCondition, isCityId, recommend, type CityId, type WeatherData } from '../../_lib/rules'
import { buildForecastUrl, parseForecast, ruleComment } from '../../_lib/weather-shared'

export const dynamic = 'force-dynamic'

type Source = 'ai' | 'fallback'

type CacheEntry = {
  comment: string
  source: Source
  expiresAt: number
}

// 1시간 단위 인메모리 캐시 (서버 재시작 전까지 유지, 쿼터 보호)
const commentCache = new Map<string, CacheEntry>()
// 같은 키로 동시에 들어온 요청은 하나의 생성 작업을 공유한다.
const inflight = new Map<string, Promise<CacheEntry | null>>()

const AI_TTL_MS = 60 * 60 * 1000 // AI 성공: 1시간
const FALLBACK_TTL_MS = 2 * 60 * 1000 // AI 실패(일시 장애 가능): 2분 뒤 재시도

function getKstHourKey(cityId: CityId): string {
  const kstString = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  }).format(new Date())
  return `${cityId}:${kstString}`
}

function pruneCache(now: number) {
  for (const [key, entry] of commentCache) {
    if (entry.expiresAt <= now) commentCache.delete(key)
  }
}

async function fetchCityWeather(cityId: CityId): Promise<WeatherData | null> {
  try {
    const res = await fetch(buildForecastUrl(cityId), {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    return parseForecast(await res.json())
  } catch {
    return null
  }
}

async function requestGeminiComment(
  cityId: CityId,
  weather: WeatherData,
  apiKey: string,
): Promise<string | null> {
  const cityName = getCity(cityId).name
  const condition = getCondition(weather.code)
  const feels = Math.round(weather.feels ?? weather.temp ?? 0)
  const outfitSummary = recommend(weather).outfit.items.join(', ')

  const prompt = `당신은 친절하고 센스 있는 날씨 코디 어시스턴트입니다.
도시: ${cityName}
날씨: ${condition.label}
체감기온: ${feels}도
추천의상: ${outfitSummary}

요구사항:
- 한국어 해요체(존댓말)로 딱 1문장, 공백 포함 45자 이내로 작성하세요.
- 이모지는 1~2개 포함하세요.
- 친근하고 활기차게 오늘 옷차림을 응원하는 멘트를 작성하세요.
- 따옴표나 추가 설명 없이 문장만 출력하세요.`

  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          // 한국어는 토큰을 많이 쓰므로 여유를 두고, 길이는 아래에서 따로 검사한다.
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
        signal: AbortSignal.timeout(4500),
      },
    )

    if (!res.ok) return null
    const data = await res.json()
    const candidate = data?.candidates?.[0]
    // 토큰 한도로 잘린 문장은 버린다.
    if (candidate?.finishReason === 'MAX_TOKENS') return null
    const text = candidate?.content?.parts?.[0]?.text?.trim()
    if (!text) return null
    // 불필요한 따옴표 및 개행 제거
    const cleaned = text.replace(/^["'`]|["'`]$/g, '').replace(/[\r\n]+/g, ' ').trim()
    return cleaned && cleaned.length <= 70 ? cleaned : null
  } catch {
    return null
  }
}

// 날씨 조회에 실패하면 null (캐시하지 않음)
async function generateComment(cityId: CityId): Promise<CacheEntry | null> {
  const weather = await fetchCityWeather(cityId)
  if (!weather) return null

  const geminiKey = process.env.GEMINI_API_KEY
  const aiComment = geminiKey ? await requestGeminiComment(cityId, weather, geminiKey) : null
  const now = Date.now()
  return aiComment
    ? { comment: aiComment, source: 'ai', expiresAt: now + AI_TTL_MS }
    : { comment: ruleComment(cityId, weather), source: 'fallback', expiresAt: now + FALLBACK_TTL_MS }
}

export async function GET(request: NextRequest) {
  const cityParam = new URL(request.url).searchParams.get('city')

  // 도시 파라미터 유효성 검증 (등록된 도시 외 요청 차단)
  if (!cityParam || !isCityId(cityParam)) {
    return NextResponse.json({ error: 'Invalid or missing city parameter' }, { status: 400 })
  }

  const cityId = cityParam as CityId
  const key = getKstHourKey(cityId)
  const now = Date.now()

  const cached = commentCache.get(key)
  if (cached && cached.expiresAt > now) {
    return NextResponse.json({ comment: cached.comment, source: cached.source, cached: true })
  }

  let pending = inflight.get(key)
  if (!pending) {
    pending = generateComment(cityId)
      .then((entry) => {
        if (entry) {
          pruneCache(Date.now())
          commentCache.set(key, entry)
        }
        return entry
      })
      .finally(() => inflight.delete(key))
    inflight.set(key, pending)
  }

  const entry = await pending
  if (!entry) {
    // 날씨를 못 가져온 경우 오류로 응답해 클라이언트가 자체 폴백을 쓰게 한다.
    return NextResponse.json({ comment: null, source: 'fallback' }, { status: 503 })
  }
  return NextResponse.json({ comment: entry.comment, source: entry.source, cached: false })
}
