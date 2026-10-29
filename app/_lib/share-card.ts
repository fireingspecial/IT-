import type { Recommendation, StyleOutfit } from './rules'

const W = 1080
const H = 1350
const FONT = "system-ui, -apple-system, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif"
const EMOJI = "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'"

const GRADIENTS: Record<string, [string, string]> = {
  clear: ['#9fd3f7', '#e8f6ff'],
  default: ['#9fd3f7', '#e8f6ff'],
  partly: ['#a9d4f5', '#eef6fc'],
  cloudy: ['#b8c4d2', '#e6ebf1'],
  fog: ['#c4cbd3', '#eceff2'],
  snow: ['#c9def0', '#f4f9fd'],
  drizzle: ['#5b6b82', '#9aa8bd'],
  rain: ['#46556b', '#8796ad'],
  storm: ['#2f3a4d', '#6b7790'],
}

export type ShareCardInput = {
  cityName: string
  dateLabel: string
  rec: Recommendation
  outfit: StyleOutfit
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// 한글은 공백이 적어 글자 단위로 줄바꿈한다. 지정한 줄 수를 넘길 때만 마지막 줄을 말줄임한다.
function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const chars = Array.from(text)
  const lines: string[] = []
  let line = ''
  let i = 0
  for (; i < chars.length; i++) {
    const ch = chars[i]
    if (ctx.measureText(line + ch).width > maxWidth && line) {
      lines.push(line)
      if (lines.length === maxLines) break
      line = ch.trim() === '' ? '' : ch
    } else {
      line += ch
    }
  }
  if (i < chars.length) {
    // 남은 글자가 있으면 넘친 것: 마지막 줄을 말줄임으로 마무리
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.$/, '…')
  } else if (line) {
    lines.push(line)
  }
  return lines
}

// 긴 항목명은 글자 크기를 36 → 26px까지 줄여 한 줄에 맞추고, 그래도 넘치면 말줄임한다.
function fitLine(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): [string] {
  for (let size = 36; size >= 26; size -= 2) {
    ctx.font = `600 ${size}px ${FONT}`
    if (ctx.measureText(text).width <= maxWidth) return [text]
  }
  return [wrapLines(ctx, text, maxWidth, 1)[0] ?? '']
}

export async function renderShareCard({ cityName, dateLabel, rec, outfit }: ShareCardInput): Promise<Blob> {
  if (document.fonts?.ready) await document.fonts.ready
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas unsupported')

  const [c1, c2] = GRADIENTS[rec.condition.theme] ?? GRADIENTS.default
  const dark = ['drizzle', 'rain', 'storm'].includes(rec.condition.theme)
  const ink = dark ? '#ffffff' : '#1f2937'
  const sub = dark ? 'rgba(255,255,255,0.85)' : '#4b5563'

  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, c1)
  bg.addColorStop(1, c2)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  // 헤더
  ctx.fillStyle = ink
  ctx.font = `800 52px ${FONT}`
  ctx.fillText('오늘 뭐 입지?', 72, 118)
  ctx.fillStyle = sub
  ctx.font = `600 34px ${FONT}`
  ctx.fillText(`${cityName} · ${dateLabel}`, 72, 172)

  // 날씨 카드
  ctx.fillStyle = 'rgba(255,255,255,0.88)'
  roundRect(ctx, 72, 220, W - 144, 250, 40)
  ctx.fill()
  ctx.font = `120px ${EMOJI}`
  ctx.fillStyle = '#000'
  ctx.fillText(rec.condition.emoji, 120, 380)
  ctx.fillStyle = '#1f2937'
  ctx.font = `800 96px ${FONT}`
  ctx.fillText(`${Math.round(rec.feels)}°`, 320, 350)
  ctx.font = `600 34px ${FONT}`
  ctx.fillStyle = '#4b5563'
  ctx.fillText(`체감온도 · ${rec.condition.label}`, 322, 410)
  ctx.font = `90px ${EMOJI}`
  ctx.textAlign = 'right'
  ctx.fillText(rec.gaugeFace, W - 120, 360)
  ctx.textAlign = 'left'

  // 코디 카드
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  roundRect(ctx, 72, 510, W - 144, 600, 40)
  ctx.fill()
  ctx.font = `64px ${EMOJI}`
  ctx.fillStyle = '#000'
  ctx.fillText(outfit.icon, 112, 596)
  ctx.fillStyle = '#2F80ED'
  ctx.font = `800 46px ${FONT}`
  ctx.fillText(outfit.name, 200, 592)

  const rows: [string, string | undefined][] = [
    ['🧥 아우터', outfit.details.outer],
    ['👕 상의', outfit.details.top],
    ['👖 하의', outfit.details.bottom],
    ['👟 신발', outfit.details.shoes],
    ['✨ 소품', outfit.details.acc],
  ]
  let y = 668
  for (const [label, value] of rows) {
    if (!value) continue
    ctx.fillStyle = '#6b7280'
    ctx.font = `700 32px ${FONT}, ${EMOJI}`
    ctx.fillText(label, 112, y)
    ctx.fillStyle = '#111827'
    const [line] = fitLine(ctx, value, 560)
    ctx.textAlign = 'right'
    ctx.fillText(line, W - 112, y)
    ctx.textAlign = 'left'
    y += 64
  }

  // 한마디 / 팁
  ctx.fillStyle = '#374151'
  ctx.font = `600 32px ${FONT}`
  const note = rec.weatherTips[0] ?? outfit.comment
  wrapLines(ctx, `💡 ${note}`, W - 224, 2).forEach((l, i) => ctx.fillText(l, 112, y + 24 + i * 46))

  // 소지품 배지
  let bx = 72
  ctx.font = `700 32px ${FONT}, ${EMOJI}`
  for (const badge of rec.badges.slice(0, 4)) {
    const w = ctx.measureText(badge).width + 48
    if (bx + w > W - 72) break
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    roundRect(ctx, bx, 1144, w, 64, 32)
    ctx.fill()
    ctx.fillStyle = '#1f2937'
    ctx.fillText(badge, bx + 24, 1187)
    bx += w + 16
  }

  // 푸터
  ctx.fillStyle = sub
  ctx.font = `600 28px ${FONT}`
  ctx.fillText('날씨 데이터 Open-Meteo · 추천은 참고용이에요', 72, 1272)

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  )
}

export type ShareResult = 'shared' | 'downloaded' | 'cancelled'

export async function shareOrDownload(blob: Blob, filename: string): Promise<ShareResult> {
  const file = new File([blob], filename, { type: 'image/png' })
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: '오늘 뭐 입지?' })
      return 'shared'
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled'
      // 공유 실패 시 다운로드로 대체
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return 'downloaded'
}
