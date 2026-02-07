import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SOCIAL_LINKS, TALKS } from "./socials";
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
  "@id": "https://pond.audio/#person",
  name: "Jamie Pond",
  givenName: "Jamie",
  familyName: "Pond",
  url: "https://pond.audio",
  image: {
    "@type": "ImageObject",
    url: "https://pond.audio/pup400.jpg",
    width: 400,
    height: 400,
  },
  description:
    "Staff Software Engineer specializing in audio software, AI music tools, and developer infrastructure. EB-1A visa holder, conference speaker at CppCon and ADC, and creator of yapi.",
  jobTitle: "Staff Software Engineer",
  hasOccupation: {
    "@type": "Occupation",
    name: "Staff Software Engineer",
    occupationalCategory: "15-1252.00",
    skills:
      "Audio Software Engineering, C++, TypeScript, Real-Time DSP, AI Music Tools",
  },
  worksFor: {
    "@type": "Organization",
    name: "Tamber",
    url: "https://tamber.music/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  nationality: {
    "@type": "Country",
    name: "United Kingdom",
  },
  sameAs: [
    ...SOCIAL_LINKS.filter((link) => link.label !== "Email").map(
      (link) => link.href,
    ),
    "https://www.youtube.com/results?search_query=jamie+pond+cppcon",
  ],
  knowsAbout: [
    "Audio Software Engineering",
    "C++",
    "TypeScript",
    "AI Music Tools",
    "Digital Signal Processing",
    "Developer Tools",
    "SIMD",
    "Compiler Intrinsics",
    "Real-Time Audio",
    "gRPC",
    "GraphQL",
  ],
  knowsLanguage: ["en"],
  email: "jamie@pond.audio",
  award: "EB-1A Extraordinary Ability Visa",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pond.audio/#website",
  name: "Jamie Pond",
  url: "https://pond.audio",
  description,
  publisher: { "@id": "https://pond.audio/#person" },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://pond.audio/#profilepage",
  mainEntity: { "@id": "https://pond.audio/#person" },
  dateCreated: "2023-01-01T00:00:00+00:00",
  dateModified: new Date().toISOString(),
};

const speakingJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Conference Talks by Jamie Pond",
  itemListElement: TALKS.map((talk, i) => ({
    "@type": "VideoObject",
    position: i + 1,
    name: `${talk.title} - ${talk.conf}`,
    description: talk.description,
    thumbnailUrl: `https://img.youtube.com/vi/${talk.videoId}/hqdefault.jpg`,
    uploadDate: `${talk.uploadDate}T00:00:00+00:00`,
    contentUrl: `https://www.youtube.com/watch?v=${talk.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${talk.videoId}`,
    author: { "@id": "https://pond.audio/#person" },
  })),
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
