import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

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

// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5089904187246568"
//      crossorigin="anonymous"></script>

function AdsScript() {
  return (
    <Script crossOrigin='anonymous'
      id="adsbygoogle"
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5089904187246568">
    </Script>
  );
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <AdsScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
