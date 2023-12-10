import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jamie Pond',
  description: 'Lead Audio Software Developer at mayk',
  metadataBase: new URL("https://pond.audio"),
  openGraph: {
    siteName: 'Jamie Pond | Lead Audio Software Developer',
    type: 'website',
    locale: 'en_IE',
    url: 'https://pond.audio',
    images: [{
      url: '/pup.jpg',
      alt: 'crazy noot',
    }],
  },
}

function AdsScript() {
  return (
    <Script crossOrigin='anonymous'
      id="adsbygoogle"
      async
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5089904187246568">
    </Script>
  );
}

function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-950 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/" className="font-semibold text-xl tracking-tight">pond.audio</a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="/blog" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Blog
          </a>
          <a href="/email" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Contact
          </a>
          <a href="https://als.pond.audio/" className="block mt-4 lg:mx-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Als Exploder
          </a>
          <a href="/.config" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            .config
          </a>
        </div>
      </div>
    </nav>
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
      <body className={inter.className}>
        <Nav />
        <div className="flex min-h-screen flex-col items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

