import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildForecastUrl, parseForecast, ruleComment } from '../app/_lib/weather-shared.ts'

const full = {
  current: {
    temperature_2m: 10, apparent_temperature: 7.5, relative_humidity_2m: 60,
    precipitation: 0, weather_code: 3, wind_speed_10m: 12,
  },
  daily: {
    temperature_2m_max: [14], temperature_2m_min: [5],
    precipitation_probability_max: [20], uv_index_max: [4],
  },
}

test('parseForecast: 정상 응답 변환', () => {
  const d = parseForecast(full)
  assert.equal(d.feels, 7.5)
  assert.equal(d.max, 14)
  assert.equal(d.pop, 20)
})

test('parseForecast: 체감온도가 없으면 기온으로 대체', () => {
  const d = parseForecast({ ...full, current: { ...full.current, apparent_temperature: null } })
  assert.equal(d.feels, 10)
})

test('parseForecast: 기온 정보가 전혀 없으면 오류', () => {
  assert.throws(() => parseForecast({ current: { weather_code: 1 }, daily: {} }))
  assert.throws(() => parseForecast(null))
})

test('parseForecast: daily가 배열이 아니거나 비어도 null로 처리', () => {
  const d = parseForecast({ current: full.current, daily: { temperature_2m_max: 'x', uv_index_max: [] } })
  assert.equal(d.max, null)
  assert.equal(d.uv, null)
})

test('buildForecastUrl: 도시 좌표와 KST 시간대 포함', () => {
  const u = new URL(buildForecastUrl('seoul'))
  assert.equal(u.hostname, 'api.open-meteo.com')
  assert.equal(u.searchParams.get('timezone'), 'Asia/Seoul')
  assert.ok(Number.isFinite(Number(u.searchParams.get('latitude'))))
})

test('ruleComment: 기온 팁과 결측 처리', () => {
  const w = parseForecast(full)
  assert.ok(ruleComment('seoul', { ...w, feels: 30 }).includes('💧'))
  assert.ok(ruleComment('seoul', { ...w, feels: 0 }).includes('🔥'))
  assert.ok(!/💧|🔥/.test(ruleComment('seoul', { ...w, feels: 15 })))
  const none = ruleComment('seoul', { ...w, feels: null, temp: null })
  assert.ok(none.length > 0 && !/💧|🔥/.test(none))
})
