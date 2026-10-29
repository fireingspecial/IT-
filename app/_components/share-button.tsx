'use client'

import { useState } from 'react'
import { renderShareCard, shareOrDownload, type ShareCardInput } from '../_lib/share-card'
import { ACCENT } from './ui-bits'

type Phase = 'idle' | 'working' | 'done' | 'error'

export function ShareButton(props: ShareCardInput) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [message, setMessage] = useState('')

  const onClick = async () => {
    if (phase === 'working') return
    setPhase('working')
    try {
      const blob = await renderShareCard(props)
      const result = await shareOrDownload(blob, `오늘뭐입지-${props.cityName}.png`)
      setMessage(result === 'downloaded' ? '이미지를 저장했어요' : result === 'shared' ? '공유했어요' : '')
      setPhase('done')
    } catch {
      setMessage('이미지를 만들지 못했어요. 다시 시도해 주세요.')
      setPhase('error')
    }
  }

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={onClick}
        disabled={phase === 'working'}
        className="h-12 w-full rounded-2xl text-sm font-bold text-white shadow-sm transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F80ED] disabled:opacity-60"
        style={{ backgroundColor: ACCENT }}
      >
        {phase === 'working' ? '카드 만드는 중…' : '📤 오늘 코디 카드 공유'}
      </button>
      <p role="status" aria-live="polite" className="min-h-4 text-xs font-medium text-gray-600">
        {message}
      </p>
    </div>
  )
}
