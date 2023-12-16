import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const images = [{
  url: '/pup.jpg',
  alt: 'crazy noot',
}];
const title = 'Jamie Pond | Lead Audio Software Developer';
const description = 'Lead Audio Software Developer at mayk';

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL("https://pond.audio"),
  openGraph: {
    siteName: 'Jamie Pond | Lead Audio Software Developer',
    type: 'website',
    locale: 'en_IE',
    url: 'https://pond.audio',
    images: images,
  },
  twitter: {
    site: "https://pond.audio",
    siteId: "jamiepondx",
    creator: "jamiepondx",
    creatorId: "jamiepondx",
    description: description,
    title: title,
    images: images,
  },
}

// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5089904187246568"
//      crossorigin="anonymous"></script>

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
        <div className="flex min-h-screen flex-col items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

