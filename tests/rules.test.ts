import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getOutfitStyles, recommend, type WeatherData } from '../app/_lib/rules.ts'

const base: WeatherData = {
  code: 0, temp: 20, feels: 20, humidity: 50, precipitation: 0,
  wind: 5, max: 22, min: 18, pop: 0, uv: 3,
}
const rec = (over: Partial<WeatherData>) => recommend({ ...base, ...over })
const has = (badges: string[], word: string) => badges.some((b) => b.includes(word))

// [체감온도, 경계 바로 아래 값, 구간 이름(casual), 이름 아래 구간과 달라야 함]
const bands: [number, string][] = [
  [28, '시원한 데일리'],
  [23, '캐주얼 썸머'],
  [17, '맨투맨 & 데님'],
  [12, '자켓 & 가디건 레이어드'],
  [5, '숏패딩 & 코트'],
]

test('체감온도 구간 경계: 경계값은 윗 구간, 1도 낮으면 아랫 구간', () => {
  for (const [min, name] of bands) {
    assert.equal(getOutfitStyles(min).casual.name, name, `${min}℃`)
    assert.notEqual(getOutfitStyles(min - 1).casual.name, name, `${min - 1}℃`)
  }
})

test('4℃ 이하는 헤비 롱패딩, 방한 소품 포함', () => {
  for (const f of [4, 0, -15]) {
    const o = getOutfitStyles(f).casual
    assert.equal(o.name, '헤비 롱패딩 무장')
    assert.ok(o.items.includes('헤비 롱패딩'))
    assert.match(o.details.acc ?? '', /장갑/)
  }
})

test('모든 구간·스타일이 비어 있지 않은 코디를 가진다', () => {
  for (let f = -20; f <= 40; f++) {
    for (const mode of ['casual', 'formal', 'sporty'] as const) {
      const o = getOutfitStyles(f)[mode]
      assert.ok(o.name && o.items.length > 0, `${f}℃ ${mode}`)
    }
  }
})

test('우산 배지: 강수확률 60 이상 또는 비 코드는 필수', () => {
  assert.ok(has(rec({ pop: 70 }).badges, '우산 필수'))
  assert.ok(has(rec({ pop: 60 }).badges, '우산 필수'))
  assert.ok(has(rec({ code: 65, pop: 0 }).badges, '우산 필수'))
  assert.ok(has(rec({ code: 95, pop: 0 }).badges, '우산 필수'))
})

test('우산 배지: 30~59는 접이식, 29 이하는 없음', () => {
  assert.ok(has(rec({ pop: 59 }).badges, '접이식'))
  assert.ok(has(rec({ pop: 40 }).badges, '접이식'))
  assert.ok(has(rec({ pop: 30 }).badges, '접이식'))
  assert.ok(!has(rec({ pop: 29 }).badges, '우산'))
  assert.ok(!has(rec({ pop: null }).badges, '우산'))
})

test('우산 필수일 때 캐릭터 신발은 부츠, 손에는 우산', () => {
  const r = rec({ code: 65, pop: 80 })
  assert.equal(r.styles.casual.character.shoes, '🥾')
  assert.equal(r.styles.casual.character.hand, '☂️')
  assert.ok(r.weatherTips.length > 0)
})

test('눈: 미끄럼 배지, 장갑, 부츠', () => {
  const r = rec({ code: 73, temp: -5, feels: -5 })
  assert.ok(has(r.badges, '미끄럼'))
  assert.equal(r.styles.casual.character.hand, '🧤')
  assert.equal(r.styles.casual.character.shoes, '🥾')
})

test('바람 배지: 30 이상에서 생성 (35 포함)', () => {
  const r = rec({ wind: 35 })
  assert.ok(has(r.badges, '바람 강해요'))
  assert.ok(r.weatherTips.some((t) => t.includes('방풍')))
  assert.ok(has(rec({ wind: 30 }).badges, '바람 강해요'))
  assert.ok(!has(rec({ wind: 29 }).badges, '바람'))
})

test('일교차 배지: 차이 10 이상 (22/10 포함)', () => {
  assert.ok(has(rec({ max: 22, min: 10 }).badges, '일교차'))
  assert.ok(has(rec({ max: 20, min: 10 }).badges, '일교차'))
  assert.ok(!has(rec({ max: 19, min: 10 }).badges, '일교차'))
  assert.ok(!has(rec({ max: null, min: 10 }).badges, '일교차'))
})

test('자외선 배지와 볼캡: 6 이상 (7 포함)', () => {
  const r = rec({ uv: 7 })
  assert.ok(has(r.badges, '자외선'))
  assert.equal(r.styles.casual.character.hat, '🧢')
  assert.ok(has(rec({ uv: 6 }).badges, '자외선'))
  assert.ok(!has(rec({ uv: 5 }).badges, '자외선'))
})

test('측정값이 모두 null이어도 예외 없이 추천한다', () => {
  const r = recommend({
    code: null, temp: null, feels: null, humidity: null, precipitation: null,
    wind: null, max: null, min: null, pop: null, uv: null,
  })
  assert.deepEqual(r.badges, [])
  assert.ok(r.outfit.items.length > 0)
})

test('체감온도가 없으면 기온으로 대체', () => {
  assert.equal(rec({ feels: null, temp: 30 }).feels, 30)
})
