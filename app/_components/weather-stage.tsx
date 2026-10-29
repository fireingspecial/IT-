import { GAUGE_MAX, GAUGE_MIN, type Recommendation, type WeatherData } from '../_lib/rules'
import { Card } from './ui-bits'

const deg = (v: number | null) => (v == null ? '-' : `${Math.round(v)}°`)

export function WeatherStage({ data, rec }: { data: WeatherData; rec: Recommendation }) {
  return (
    <Card label="현재 날씨" className="flex flex-col gap-4">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-base font-semibold text-gray-700">
          <span aria-hidden="true" className="text-2xl">
            {rec.condition.emoji}
          </span>
          {rec.condition.label}
        </p>
        <p className="text-[64px] font-black leading-none tracking-tight text-gray-900">
          <span className="sr-only">현재 기온 </span>
          {deg(data.temp)}
        </p>
        <p className="mt-2 flex items-center justify-center gap-3 text-sm text-[#4B5563]">
          <span>
            체감 <strong className="font-bold text-gray-900">{deg(data.feels)}</strong>
          </span>
          <span>
            <span aria-hidden="true">▲</span>
            <span className="sr-only">최고 </span>
            {deg(data.max)}
          </span>
          <span>
            <span aria-hidden="true">▼</span>
            <span className="sr-only">최저 </span>
            {deg(data.min)}
          </span>
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <FaceGauge rec={rec} />
      </div>
    </Card>
  )
}

function FaceGauge({ rec }: { rec: Recommendation }) {
  return (
    <div
      role="meter"
      aria-label="체감온도 표정 게이지"
      aria-valuemin={GAUGE_MIN}
      aria-valuemax={GAUGE_MAX}
      aria-valuenow={Math.min(GAUGE_MAX, Math.max(GAUGE_MIN, rec.feels))}
      aria-valuetext={`체감 ${rec.feels}도`}
      className="flex items-center gap-2"
    >
      <span aria-hidden="true" className="text-xl">
        🥶
      </span>
      <div className="relative mx-3 flex-1 pt-11">
        <div
          className="h-2.5 rounded-full"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2563eb, #38bdf8, #22c55e, #f59e0b, #ef4444)',
          }}
        />
        <div
          className="anim-gauge absolute -bottom-[3px] flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${rec.gaugePercent}%` }}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {rec.gaugeFace}
          </span>
          <span className="mb-1 text-xs font-bold text-gray-900">{rec.feels}°</span>
          <span className="block size-4 rounded-full border-[3px] border-white bg-gray-900 shadow" />
        </div>
      </div>
      <span aria-hidden="true" className="text-xl">
        🥵
      </span>
    </div>
  )
}
