import { useEffect, useState } from 'react'
import { Card, CharacterFigure, RetryButton, SUBTLE, WardrobeDoors } from './ui-bits'

const LOADING_MESSAGES = ['날씨를 불러오는 중…', '옷장 뒤지는 중 🔍', '거울 앞에 서는 중 🪞']

function Bone({ className }: { className: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />
}

export function LoadingView() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % LOADING_MESSAGES.length), 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <Card as="div" className="flex flex-col items-center gap-3">
        <Bone className="h-6 w-24" />
        <Bone className="h-14 w-32" />
        <Bone className="h-4 w-44" />
        <div className="mt-2 w-full border-t border-gray-200 pt-4">
          <Bone className="h-10 w-full" />
        </div>
      </Card>

      <Card as="div" className="flex flex-col items-center">
        <div className="relative mt-10 h-[180px] w-[180px]">
          <div aria-hidden="true" className="motion-only absolute inset-x-0 -top-10 flex justify-center gap-6 text-3xl">
            {['🧦', '👕', '🧢'].map((item, i) => (
              <span key={item} className="anim-pop block" style={{ animationDelay: `${i * 0.6}s` }}>
                {item}
              </span>
            ))}
          </div>
          <div className="anim-rattle h-full w-full">
            <WardrobeDoors />
          </div>
        </div>
        <p role="status" className="mt-4 text-base font-medium" style={{ color: SUBTLE }}>
          {LOADING_MESSAGES[index]}
        </p>
      </Card>

      <Card as="div">
        <Bone className="h-5 w-32" />
        <div className="mt-3 flex gap-2">
          <Bone className="h-8 w-24" />
          <Bone className="h-8 w-28" />
        </div>
      </Card>

      <Card as="div" className="grid grid-cols-3 gap-3">
        <Bone className="h-10" />
        <Bone className="h-10" />
        <Bone className="h-10" />
      </Card>
    </div>
  )
}

export function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <Card label="오류" className="flex flex-col items-center py-8 text-center">
      <span aria-hidden="true" className="text-5xl">
        😵‍💫
      </span>
      <div className="mt-4 h-[150px] w-[140px]">
        <WardrobeDoors lock />
      </div>
      <p role="alert" className="mt-5 text-base leading-relaxed" style={{ color: SUBTLE }}>
        날씨 정보를 불러오지 못했어요.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <RetryButton onClick={onRetry} />
    </Card>
  )
}

export function OfflineView({ onRetry }: { onRetry: () => void }) {
  return (
    <Card label="오프라인" className="flex flex-col items-center py-8 text-center">
      <div className="anim-look-around">
        <CharacterFigure
          character={{ hat: null, head: '🤔', top: '👕', hand: '📡', bottom: '👖', shoes: '👟' }}
        />
      </div>
      <p role="alert" className="mt-5 text-base" style={{ color: SUBTLE }}>
        인터넷 연결을 확인해 주세요.
      </p>
      <RetryButton onClick={onRetry} />
    </Card>
  )
}
