import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SOCIAL_LINKS } from "./socials";
import { GoogleAnalytics } from "@next/third-parties/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
});

const title = "Jamie Pond — Staff Software Engineer in Audio & AI";
const description =
  "Jamie Pond is a Staff Software Engineer in Los Angeles focused on audio software, AI music tools, and developer infrastructure. Speaker at CppCon and ADC.";
const ga4MeasurementId = "G-JWWVXENNZ7";

const ogImages = [
  {
    url: "/og",
    width: 1200,
    height: 630,
    alt: "Jamie Pond - Staff Software Engineer",
    type: "image/png",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://pond.audio"),
  title: {
    default: title,
    template: "%s | Jamie Pond",
  },
  description,
  keywords: [
    "Jamie Pond",
    "Staff Software Engineer",
    "audio software engineer",
    "AI music tools",
    "C++ developer",
    "Los Angeles software engineer",
    "EB-1A",
    "CppCon speaker",
    "yapi",
    "mayk.it",
    "Tamber",
    "audio DSP",
    "developer tools",
    "SWAR",
    "compiler intrinsics",
  ],
  authors: [{ name: "Jamie Pond", url: "https://pond.audio" }],
  creator: "Jamie Pond",
  publisher: "Jamie Pond",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    siteName: "Jamie Pond",
    type: "website",
    locale: "en_US",
    url: "https://pond.audio",
    images: ogImages,
  },
  twitter: {
    title,
    description,
    images: ogImages,
    card: "summary_large_image",
    site: "@jamiepondx",
    creator: "@jamiepondx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jamie Pond",
  url: "https://pond.audio",
  image: "https://pond.audio/pup400.jpg",
  jobTitle: "Staff Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Tamber",
    url: "https://tamber.music/",
  },
  sameAs: SOCIAL_LINKS.filter((link) => link.label !== "Email").map(
    (link) => link.href,
  ),
  knowsAbout: [
    "Audio Software Engineering",
    "C++",
    "AI Music Tools",
    "Digital Signal Processing",
    "Developer Tools",
    "SIMD",
    "Compiler Intrinsics",
  ],
  alumniOf: [],
  email: "jamie@pond.audio",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Jamie Pond",
  url: "https://pond.audio",
  description,
  author: {
    "@type": "Person",
    name: "Jamie Pond",
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Jamie Pond",
    url: "https://pond.audio",
    image: "https://pond.audio/pup400.jpg",
    jobTitle: "Staff Software Engineer",
    description:
      "Staff Software Engineer focused on audio software, AI music tools, and developer infrastructure.",
  },
  dateCreated: "2023-01-01T00:00:00+00:00",
  dateModified: new Date().toISOString(),
};

const speakingJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Conference Talks by Jamie Pond",
  itemListElement: [
    {
      "@type": "VideoObject",
      position: 1,
      name: "Associative Iteration - CppCon 2024",
      description:
        "Jamie Pond presents on Associative Iteration at CppCon 2024.",
      thumbnailUrl: "https://img.youtube.com/vi/7n1CVURp0DY/hqdefault.jpg",
      uploadDate: "2024-01-01T00:00:00+00:00",
      contentUrl: "https://www.youtube.com/watch?v=7n1CVURp0DY",
      embedUrl: "https://www.youtube.com/embed/7n1CVURp0DY",
    },
    {
      "@type": "VideoObject",
      position: 2,
      name: "Intro to SWAR - C++ on Sea 2024",
      description:
        "Jamie Pond introduces SWAR (SIMD Within A Register) techniques at C++ on Sea 2024.",
      thumbnailUrl: "https://img.youtube.com/vi/4h7UZnWN67Y/hqdefault.jpg",
      uploadDate: "2024-01-01T00:00:00+00:00",
      contentUrl: "https://www.youtube.com/watch?v=4h7UZnWN67Y",
      embedUrl: "https://www.youtube.com/embed/4h7UZnWN67Y",
    },
    {
      "@type": "VideoObject",
      position: 3,
      name: "Prototyping at Mayk - ADC 2023",
      description:
        "Jamie Pond discusses rapid prototyping approaches at the Audio Developer Conference 2023.",
      thumbnailUrl: "https://img.youtube.com/vi/1lEWl-MTA6k/hqdefault.jpg",
      uploadDate: "2023-01-01T00:00:00+00:00",
      contentUrl: "https://www.youtube.com/watch?v=1lEWl-MTA6k",
      embedUrl: "https://www.youtube.com/embed/1lEWl-MTA6k",
    },
    {
      "@type": "VideoObject",
      position: 4,
      name: "Compiler Intrinsics - ADC 2021",
      description:
        "Jamie Pond covers compiler intrinsics for audio development at ADC 2021.",
      thumbnailUrl: "https://img.youtube.com/vi/X8dPANPmC7E/hqdefault.jpg",
      uploadDate: "2021-01-01T00:00:00+00:00",
      contentUrl: "https://www.youtube.com/watch?v=X8dPANPmC7E",
      embedUrl: "https://www.youtube.com/embed/X8dPANPmC7E",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pup400.jpg" type="image/jpeg" sizes="400x400" />
        <link rel="apple-touch-icon" href="/pup400.jpg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingJsonLd) }}
        />
      </head>
      <body className={`${jetbrainsMono.className} bg-neutral-950`}>
        {children}
        <GoogleAnalytics gaId={ga4MeasurementId} />
      </body>
    </html>
  );
}
