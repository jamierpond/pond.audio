import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jamie Pond',
  description: 'Lead Audio Software Developer at mayk',
  openGraph: {
    siteName: 'Jamie Pond',
    type: 'website',
    locale: 'en_IE',
    url: 'https://pond.audio',
    images: [{
      url: '/texture.jpg',
      alt: 'Dark blue and purple moody texture',
    }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
