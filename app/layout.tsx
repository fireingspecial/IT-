import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ServiceWorkerRegister } from './_components/sw-register'

export const metadata: Metadata = {
  applicationName: '오늘 뭐 입지?',
  appleWebApp: { capable: true, title: '오늘 뭐 입지?', statusBarStyle: 'default' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  title: '오늘 뭐 입지? · 날씨 옷차림 추천',
  description: '도시를 고르면 오늘 날씨와 체감온도에 맞는 옷차림을 캐릭터 "입지"가 직접 입고 알려 줘요.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#9fd3f7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="light">
      <head>
        {/* 날씨 API 연결(DNS·TLS)을 미리 열어 첫 화면 지연을 줄인다 */}
        <link rel="preconnect" href="https://api.open-meteo.com" />
      </head>
      <body className="antialiased">
        {children}
        <ServiceWorkerRegister />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
