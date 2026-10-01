import Image from "next/image";
import Link from "next/link";
import GithubCalendar from "./GithubCalendar";
import { TALKS } from "./socials";

const link = "text-sky-300 underline underline-offset-2 hover:text-sky-200";

function A({ href, children }: { href: string; children: React.ReactNode }) {
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
      <h1 className="text-2xl font-bold mb-6">Jamie Pond</h1>

      <p className="mb-4">
        I&apos;m a software engineer in Los Angeles. I work on audio: real-time
        DSP, audio engines, and the tools around them, mostly in C++ and
        TypeScript.
      </p>
      <p className="mb-4">
        Right now I&apos;m the founding staff engineer at{" "}
        <A href="https://tamber.music/">Tamber</A>, where we&apos;re building
        music creation tools with AI in them. Before that I was lead audio
        engineer at <A href="https://www.mayk.it/">mayk.it</A>. We made{" "}
        <A href="https://www.vibe.com/news/tech/drake-song-drayk-it-ai-software-1234730792/">
          Drayk It
        </A>
        , which went viral, and <A href="https://covers.ai/">Covers.ai</A> and a{" "}
        <A href="https://www.linkedin.com/feed/update/urn:li:activity:7409399286628712448/">
          Discord game
        </A>
        , both of which were acquired.
      </p>
      <p className="mb-4">
        I also make <A href="https://yapi.run/">yapi</A>, a command-line API
        client that speaks HTTP, gRPC, GraphQL and TCP. It&apos;s open source.
        Other things I&apos;ve made:{" "}
        <A href="https://hollywoodrunclub.com">Hollywood Run Club</A>,{" "}
        <A href="https://madea.blog">madea.blog</A>,{" "}
        <A href="https://cowsinlove.com">Cows In Love</A> and{" "}
        <A href="https://mr-nibbles.com">Mr Nibbles</A>.
      </p>
      <p className="mb-4">
        I&apos;m in the US on an EB-1A. I&apos;m on{" "}
        <A href="https://github.com/jamierpond">GitHub</A>,{" "}
        <A href="https://x.com/jamiepondx">X</A> and{" "}
        <A href="https://www.linkedin.com/in/jamierpond">LinkedIn</A>, or you
        can <A href="mailto:jamie@pond.audio">email me</A>.
      </p>

      <h2 className="text-lg font-bold mt-12 mb-4">Talks</h2>
      <p className="mb-4">
        I&apos;ve spoken at CppCon, C++ on Sea and ADC. Click a still to watch.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {TALKS.map((talk) => (
          <a
            key={talk.videoId}
            href={`https://www.youtube.com/watch?v=${talk.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src={`https://img.youtube.com/vi/${talk.videoId}/hqdefault.jpg`}
              alt={talk.title}
              width={480}
              height={360}
              className="w-full aspect-video object-cover rounded-sm mb-2"
            />
            <span className="block">{talk.title}</span>
            <span className="block text-sm text-neutral-400">{talk.conf}</span>
          </a>
        ))}
      </div>

      <h2 className="text-lg font-bold mt-12 mb-4">GitHub</h2>
      <div className="overflow-x-auto">
        <GithubCalendar />
      </div>

      <footer className="mt-12 pt-6 border-t border-neutral-800 text-sm text-neutral-500">
        <p>
          <Link href="/blog" className={link}>
            Blog
          </Link>{" "}
          · This footer was added with{" "}
          <A href="https://github.com/jamierpond/claude-remote">
            claude-remote
          </A>
          .
        </p>
      </footer>
    </main>
  );
}
