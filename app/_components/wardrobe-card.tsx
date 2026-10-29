import { useEffect, useRef, useState } from 'react'
import {
  TAP_PHRASES,
  type Recommendation,
  type StyleMode,
  type StyleOutfit,
} from '../_lib/rules'
import { ShareButton } from './share-button'
import { ACCENT, Card, CharacterFigure } from './ui-bits'

export type AiState = { status: 'pending' } | { status: 'failed' } | { status: 'done'; text: string; source: 'ai' | 'fallback' }

function useTypewriter(text: string | null, instant: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!text) return
    if (instant) {
      setCount(text.length)
      return
    }
    setCount(0)
    const chars = Array.from(text)
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= chars.length) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [text, instant])
  return text ? Array.from(text).slice(0, count).join('') : ''
}

const STYLE_TABS: { id: StyleMode; label: string; icon: string }[] = [
  { id: 'casual', label: '데일리 캐주얼', icon: '👕' },
  { id: 'formal', label: '출근·모던', icon: '👔' },
  { id: 'sporty', label: '스포티·편안', icon: '🧢' },
]

export function WardrobeCard({
  rec,
  entrance,
  ai,
  reducedMotion,
  cityName,
  dateLabel,
}: {
  cityName: string
  dateLabel: string
  rec: Recommendation
  entrance: 'open' | 'jump'
  ai: AiState
  reducedMotion: boolean
}) {
  const [selectedStyle, setSelectedStyle] = useState<StyleMode>('casual')
  const [tapPhrase, setTapPhrase] = useState<string | null>(null)
  const [tapCount, setTapCount] = useState(0)
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (tapTimer.current) clearTimeout(tapTimer.current)
  }, [])

  const currentOutfit: StyleOutfit = rec.styles[selectedStyle] ?? rec.styles.casual

  const aiText = ai.status === 'done' ? ai.text : null
  const typed = useTypewriter(aiText, reducedMotion)

  const handleTap = () => {
    const phrase = TAP_PHRASES[Math.floor(Math.random() * TAP_PHRASES.length)]
    setTapPhrase(phrase)
    setTapCount((c) => c + 1)
    if (tapTimer.current) clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => setTapPhrase(null), 1500)
  }

  const fullText = tapPhrase ?? (aiText ? `${aiText} (${currentOutfit.comment})` : currentOutfit.comment)
  const visibleText = tapPhrase ?? (aiText ? typed : currentOutfit.comment)

  const charAnim = tapPhrase
    ? 'anim-char-shake'
    : tapCount > 0
      ? ''
      : entrance === 'open'
      ? 'anim-char-rise'
      : 'anim-char-jump'

  return (
    <Card label="오늘의 옷장" className="flex flex-col items-center">
      {/* 스타일 전환 세그먼트 버튼 */}
      <div className="mb-4 flex w-full rounded-2xl bg-gray-100/90 p-1 shadow-inner">
        {STYLE_TABS.map((tab) => {
          const isActive = selectedStyle === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSelectedStyle(tab.id)
                setTapPhrase(null)
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 말풍선 */}
      <div className="bubble-tail relative w-full rounded-2xl bg-white px-4 py-3 text-center shadow-[0_2px_10px_rgba(15,23,42,0.1)]">
        <p className="sr-only" aria-live="polite">
          {fullText}
        </p>
        <p aria-hidden="true" className="min-h-6 text-base font-medium leading-relaxed text-gray-900">
          {visibleText}
          {ai.status === 'pending' && !tapPhrase && (
            <span className="anim-dots ml-1.5 inline-block font-bold tracking-widest text-gray-500">• • •</span>
          )}
        </p>
        {aiText && !tapPhrase && (
          <p className="mt-1 text-right text-xs font-bold" style={{ color: ACCENT }}>
            {ai.status === 'done' && ai.source === 'ai' ? '✨ AI 한마디' : '💬 오늘의 한마디'}
          </p>
        )}
      </div>

      {/* 옷장 캐릭터 뷰 */}
      <div className="relative mt-5 flex h-[232px] w-full max-w-[220px] items-center justify-center rounded-xl bg-[#f5ede3] [perspective:800px]">
        <button
          type="button"
          aria-label="캐릭터 입지 - 터치하면 반응해요"
          onClick={handleTap}
          className="rounded-2xl px-6 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED]"
        >
          <span key={`${entrance}-${selectedStyle}-${tapCount}`} className={`block ${charAnim}`}>
            <CharacterFigure
              character={currentOutfit.character}
              headOverride={tapPhrase ? '😆' : undefined}
            />
          </span>
        </button>

        {entrance === 'open' && (
          <div aria-hidden="true" className="wardrobe-door pointer-events-none absolute inset-0 flex">
            <div className="anim-door-left wood flex flex-1 items-center justify-end rounded-l-xl border-r border-[#6e4219] pr-2 [backface-visibility:hidden]">
              <span className="text-sm text-amber-100">◉</span>
            </div>
            <div className="anim-door-right wood flex flex-1 items-center justify-start rounded-r-xl pl-2 [backface-visibility:hidden]">
              <span className="text-sm text-amber-100">◉</span>
            </div>
          </div>
        )}
      </div>

      {/* 코디 핵심 키워드 */}
      <div className="mt-4 w-full border-t border-gray-200 pt-3">
        <p className="text-center text-sm sm:text-base text-gray-900">
          <span className="font-extrabold text-[#2F80ED]">[{currentOutfit.name}]</span>{' '}
          <span className="font-semibold">{currentOutfit.items.join(' · ')}</span>
        </p>

        {/* 상세 의상 조합 카드 */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs sm:text-sm">
          {currentOutfit.details.outer && (
            <div className="col-span-2 flex items-center justify-between rounded-xl bg-amber-50/70 px-3 py-2 border border-amber-200/60">
              <span className="font-bold text-amber-900">🧥 아우터</span>
              <span className="text-gray-800 font-medium text-right">{currentOutfit.details.outer}</span>
            </div>
          )}
          <div className="flex flex-col gap-0.5 rounded-xl bg-gray-50 p-2.5 border border-gray-200/70">
            <span className="font-bold text-gray-600">👕 상의</span>
            <span className="text-gray-900 font-medium leading-snug">{currentOutfit.details.top}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-xl bg-gray-50 p-2.5 border border-gray-200/70">
            <span className="font-bold text-gray-600">👖 하의</span>
            <span className="text-gray-900 font-medium leading-snug">{currentOutfit.details.bottom}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-xl bg-gray-50 p-2.5 border border-gray-200/70">
            <span className="font-bold text-gray-600">👟 신발</span>
            <span className="text-gray-900 font-medium leading-snug">{currentOutfit.details.shoes}</span>
          </div>
          {currentOutfit.details.acc && (
            <div className="flex flex-col gap-0.5 rounded-xl bg-gray-50 p-2.5 border border-gray-200/70">
              <span className="font-bold text-gray-600">✨ 포인트/소품</span>
              <span className="text-gray-900 font-medium leading-snug">{currentOutfit.details.acc}</span>
            </div>
          )}
        </div>

        {/* 날씨 맞춤 코디 팁 배너 */}
        {rec.weatherTips && rec.weatherTips.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {rec.weatherTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-xl bg-blue-50/80 p-2.5 text-xs sm:text-[13px] font-medium text-blue-900 border border-blue-200/50"
              >
                <span className="text-sm">💡</span>
                <span className="leading-tight">{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ShareButton cityName={cityName} dateLabel={dateLabel} rec={rec} outfit={currentOutfit} />
    </Card>
  )
}
