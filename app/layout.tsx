import type { Metadata } from 'next'
import { inter, notoSansKR, eastSeaDokdo } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: '엠마비 | 포트폴리오',
  description: '바이브코딩 공부중인 비개발자 엠마비의 포트폴리오',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable} ${eastSeaDokdo.variable} bg-[#0a0a14]`}>
      <body className="bg-mesh-gradient bg-[#0a0a14] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
