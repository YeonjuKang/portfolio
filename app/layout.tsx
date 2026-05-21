import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

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
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable} bg-[#0a0a14]`}>
      <body className="bg-mesh-gradient bg-[#0a0a14] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
