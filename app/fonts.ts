import { Inter, Noto_Sans_KR, East_Sea_Dokdo } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const eastSeaDokdo = East_Sea_Dokdo({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-east-sea-dokdo',
})
