// app/homeHighlights.ts
// Central list of factual, linkable highlights for the homepage.
// Keep these short, neutral, and anchored to a URL when possible.

export type HomeHighlight = {
  title: string;
  description: string;
  href: string;
  tag?: string;
};

export const HOME_HIGHLIGHTS: HomeHighlight[] = [
  {
    title: "Tamber",
    description: "AI-first music creation tooling.",
    href: "https://tamber.music/",
    tag: "Now",
  },
  {
    title: "yapi",
    description: "CLI-first API client. HTTP, gRPC, GraphQL, TCP. Git-friendly.",
    href: "https://yapi.run/",
    tag: "OSS",
  },
  {
    title: "mayk.it",
    description: "Creator tools and workflows for remix and UGC music.",
    href: "https://www.mayk.it/",
    tag: "Previous",
  },
  {
    title: "Covers.ai",
    description: "Built social music experiences and creator tooling.",
    href: "https://covers.ai/",
    tag: "Product",
  },
  {
    title: "Drayk It",
    description: "Viral AI Drake parody generator - UGC remix culture prototype.",
    href: "https://www.vibe.com/news/tech/drake-song-drayk-it-ai-software-1234730792/",
    tag: "Viral",
  },
  {
    title: "Discord music game",
    description: "Acquired by Little Umbrella (Playroom Studio) with Stingray partnership.",
    href: "https://www.linkedin.com/company/mayk-it/",
    tag: "Acquisition",
  },
];
