import { getCity, getCondition, type CityId, type WeatherData } from './rules.ts'

const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null

export function buildForecastUrl(cityId: CityId): string {
  const city = getCity(cityId)
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
    timezone: 'Asia/Seoul',
    forecast_days: '1',
  })
  return `https://api.open-meteo.com/v1/forecast?${params}`
}

// 체감온도(없으면 기온)조차 없으면 추천이 불가능하므로 오류로 처리한다.
export function parseForecast(json: unknown): WeatherData {
  const root = (json ?? {}) as { current?: Record<string, unknown>; daily?: Record<string, unknown> }
  const c = root.current ?? {}
  const d = root.daily ?? {}
  const first = (v: unknown) => num(Array.isArray(v) ? v[0] : null)
  const temp = num(c.temperature_2m)
  const data: WeatherData = {
    code: num(c.weather_code),
    temp,
    feels: num(c.apparent_temperature) ?? temp,
    humidity: num(c.relative_humidity_2m),
    precipitation: num(c.precipitation),
    wind: num(c.wind_speed_10m),
    max: first(d.temperature_2m_max),
    min: first(d.temperature_2m_min),
    pop: first(d.precipitation_probability_max),
    uv: first(d.uv_index_max),
  }
  if (data.feels == null) throw new Error('No temperature data')
  return data
}

// AI를 쓸 수 없을 때 서버·클라이언트가 함께 쓰는 규칙 기반 한마디.
export function ruleComment(cityId: CityId, weather: WeatherData): string {
  const cityName = getCity(cityId).name
  const { theme } = getCondition(weather.code)
  const feels = weather.feels ?? weather.temp

  const byTheme: Record<string, string> = {
    clear: `${cityName} 하늘이 맑고 쨍해요! 가볍고 산뜻한 옷차림으로 기분 좋은 하루 보내세요 ✨`,
    partly: `${cityName}엔 구름이 적당히 있어 나들이하기 쾌적한 날씨예요.`,
    cloudy: `${cityName}은 다소 흐려요. 밝은 톤의 옷으로 기분 전환해보는 건 어떨까요?`,
    fog: `${cityName}에 안개가 끼어 있어요. 시야가 흐리니 밝은 겉옷으로 안전하게 다녀요.`,
    drizzle: `${cityName}에 부슬부슬 이슬비가 내려요. 가벼운 방수 겉옷을 걸치면 딱 좋아요.`,
    rain: `${cityName}엔 비 소식이 있어요! 우산 꼭 챙기시고 빗물 조심하세요 ☂️`,
    snow: `${cityName}에 눈이 내려요! 미끄러지지 않게 든든한 방한화와 따뜻한 외투를 입으세요 ❄️`,
    storm: `${cityName}에 천둥번개가 쳐요. 가급적 실내 일정을 추천드려요 ⛈️`,
  }

  let text = byTheme[theme] ?? `${cityName} 오늘의 날씨에 맞춘 추천 코디를 확인해보세요!`
  if (feels != null) {
    const rounded = Math.round(feels)
    if (rounded >= 28) text += ' 물도 자주 챙겨 드세요 💧'
    else if (rounded <= 4) text += ' 핫팩 하나 챙기면 든든해요 🔥'
  }
  return text
}
