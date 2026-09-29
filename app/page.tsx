import Image from "next/image";
import Link from "next/link";
import GithubCalendar from "./GithubCalendar";
import { SOCIAL_LINKS, TALKS } from "./socials";

const WORK = [
  {
    title: "Tamber",
    role: "Founding Staff Software Engineer",
    description:
      "AI-first music creation — the future of music should feel human. Building the audio engine, real-time DSP, and creator tools from day one.",
    href: "https://tamber.music/",
  },
  {
    title: "yapi",
    role: "Creator",
    description:
      "CLI-first API client for HTTP, gRPC, GraphQL, TCP. Open source.",
    href: "https://yapi.run/",
  },
  {
    title: "mayk.it",
    role: "Lead Audio Engineer",
    description:
      "UGC music tools. Drayk It went viral. Covers.ai and Discord game both acquired.",
    href: "https://www.mayk.it/",
  },
];

const HIGHLIGHTS = [
  {
    label: "Drayk It",
    desc: "Viral AI Drake generator",
    href: "https://www.vibe.com/news/tech/drake-song-drayk-it-ai-software-1234730792/",
  },
  {
    label: "Covers.ai",
    desc: "Social music experiences, acquired",
    href: "https://covers.ai/",
  },
  {
    label: "Discord game",
    desc: "Acquired by Playroom Studio",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7409399286628712448/",
  },
];

const PROJECTS = [
  { href: "https://hollywoodrunclub.com", label: "Hollywood Run Club" },
  { href: "https://madea.blog", label: "madea.blog" },
  { href: "https://cowsinlove.com", label: "Cows In Love" },
  { href: "https://mr-nibbles.com", label: "Mr Nibbles" },
];

const link = "text-sky-300 underline underline-offset-2 hover:text-sky-200";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-neutral-200 leading-relaxed">
      <Image
        src="/pup400.jpg"
        alt="Jamie Pond"
        width={96}
        height={96}
        className="rounded-sm mb-6"
      />
      <h1 className="text-2xl font-bold mb-1">Jamie Pond</h1>
      <p className="text-neutral-400 mb-6">
        Founding Staff Software Engineer at{" "}
        <Ext href="https://tamber.music/">Tamber</Ext>
      </p>

      <p className="mb-4">
        Building AI-first music creation from day one — audio engines, real-time
        DSP, and tools that make making music feel human.
      </p>
      <p className="mb-4">
        Founding Staff Software Engineer at{" "}
        <Ext href="https://tamber.music/">Tamber</Ext>, where we&apos;re
        building AI-first music creation — a bionic arm for making music. I work
        on audio engines, real-time DSP, and AI-driven music tools in C++ and
        TypeScript, speak at conferences like CppCon and ADC, and build
        developer tools like yapi. EB-1A visa holder based in Los Angeles.
      </p>
      <p>
        {SOCIAL_LINKS.map(({ href, label }, i) => (
          <span key={label}>
            {i > 0 && " · "}
            <Ext href={href}>{label}</Ext>
          </span>
        ))}
      </p>

      <h2 className="text-lg font-bold mt-10 mb-3">Work</h2>
      <ul className="space-y-3">
        {WORK.map((item) => (
          <li key={item.title}>
            <Ext href={item.href}>{item.title}</Ext> — {item.role}
            <br />
            <span className="text-neutral-400">{item.description}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-10 mb-3">Highlights</h2>
      <ul className="list-disc pl-5 space-y-1">
        {HIGHLIGHTS.map((item) => (
          <li key={item.label}>
            <Ext href={item.href}>{item.label}</Ext> — {item.desc}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-10 mb-3">Talks</h2>
      <ul className="list-disc pl-5 space-y-1">
        {TALKS.map((talk) => (
          <li key={talk.videoId}>
            <Ext href={`https://www.youtube.com/watch?v=${talk.videoId}`}>
              {talk.title}
            </Ext>{" "}
            <span className="text-neutral-400">({talk.conf})</span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-10 mb-3">Projects</h2>
      <ul className="list-disc pl-5 space-y-1">
        {PROJECTS.map(({ href, label }) => (
          <li key={label}>
            <Ext href={href}>{label}</Ext>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-10 mb-3">Open source activity</h2>
      <div className="overflow-x-auto">
        <GithubCalendar />
      </div>

      <footer className="mt-12 pt-6 border-t border-neutral-800 text-sm text-neutral-500">
        <p>
          <Link href="/blog" className={link}>
            Blog
          </Link>{" "}
          · This footer was added with{" "}
          <Ext href="https://github.com/jamierpond/claude-remote">
            claude-remote
          </Ext>
          .
        </p>
      </footer>
    </main>
  );
}
