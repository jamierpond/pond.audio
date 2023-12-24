import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsFont = JetBrains_Mono({
  subsets: ['latin'],
  fallback: ['monospace'],
});

const images = [{
  url: '/pup400.jpg',
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
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsFont.className}>
        <div className="flex min-h-screen flex-col items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

