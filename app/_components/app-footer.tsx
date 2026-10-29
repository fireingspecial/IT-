export function AppFooter({ updatedAt, dark }: { updatedAt: string | null; dark: boolean }) {
  const tone = dark ? 'text-white/90' : 'text-[#4B5563]'
  return (
    <footer className={`flex flex-col items-center gap-1 pb-2 pt-2 text-center text-xs leading-relaxed ${tone}`}>
      <p>
        업데이트 {updatedAt ?? '--:--'} · 날씨 데이터:{' '}
        <a
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2"
        >
          Open-Meteo ↗<span className="sr-only"> (새 탭에서 열림)</span>
        </a>
      </p>
      <p>한마디는 AI(Gemini)가 작성해요. 연결이 어려우면 기본 문구로 대신해요.</p>
      <p>추천은 참고용이에요. 실제 날씨와 다를 수 있어요.</p>
    </footer>
  )
}
