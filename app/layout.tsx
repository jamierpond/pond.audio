import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

const images = [{
  url: '/pup400.jpg',
  alt: 'crazy noot',
}];

// todo fix css for text
const title = 'Jamie Pond | Staff Software Engineer';
const description = 'Staff Software Engineer at Tamber';

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
    title: title,
    description: description,
    images: images,
    card: 'summary',
    site: "https://pond.audio",
    siteId: "jamiepondx",
    creator: "@jamiepondx",
    creatorId: "jamiepondx",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <div className="flex min-h-screen flex-col items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

