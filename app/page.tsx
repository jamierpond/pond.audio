"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import GithubCalendar from "./GithubCalendar";
import { TamberLogo } from "./TamberLogo";
import { SOCIAL_LINKS, TALKS } from "./socials";

const SOCIALS = [
  { href: "https://github.com/jamierpond", icon: Github, label: "GitHub" },
  { href: "https://x.com/jamiepondx", icon: Twitter, label: "X" },
  {
    href: "https://www.linkedin.com/in/jamierpond",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:jamie@pond.audio", icon: Mail, label: "Email" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

const WORK = [
  {
    title: "Tamber",
    role: "Founding Staff Software Engineer",
    description:
      "AI-first music creation — the future of music should feel human. Building the audio engine, real-time DSP, and creator tools from day one.",
    href: "https://tamber.music/",
    tag: "now",
    tagColor: "mint",
    featured: true,
  },
  {
    title: "yapi",
    role: "Creator",
    description:
      "CLI-first API client for HTTP, gRPC, GraphQL, TCP. Open source.",
    href: "https://yapi.run/",
    tag: "oss",
    tagColor: "periwinkle",
  },
  {
    title: "mayk.it",
    role: "Lead Audio Engineer",
    description:
      "UGC music tools. Drayk It went viral. Covers.ai and Discord game both acquired.",
    href: "https://www.mayk.it/",
  },
];

const PROJECTS = [
  { href: "https://hollywoodrunclub.com", label: "Hollywood Run Club" },
  { href: "https://madea.blog", label: "madea.blog" },
  { href: "https://cowsinlove.com", label: "Cows In Love" },
  { href: "https://mr-nibbles.com", label: "Mr Nibbles" },
];

const HIGHLIGHTS = [
  {
    label: "Drayk It",
    desc: "Viral AI Drake generator",
    href: "https://www.vibe.com/news/tech/drake-song-drayk-it-ai-software-1234730792/",
    tag: "Viral",
    tagColor: "periwinkle",
  },
  {
    label: "Covers.ai",
    desc: "Social music experiences",
    href: "https://covers.ai/",
    tag: "Acquired",
    tagColor: "mint",
  },
  {
    label: "Discord game",
    desc: "Acquired by Playroom Studio",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7409399286628712448/",
    tag: "Acquired",
    tagColor: "mint",
  },
];

// Tag chips in the Tamber palette: mint, periwinkle, pink
const TAG_STYLES: Record<string, string> = {
  mint: "bg-[#3DF1A6]/10 text-[#3DF1A6] border-[#3DF1A6]/40",
  periwinkle: "bg-[#7E89FF]/10 text-[#7E89FF] border-[#7E89FF]/40",
  pink: "bg-[#FF557D]/10 text-[#FF557D] border-[#FF557D]/40",
  default: "bg-neutral-800 text-neutral-400 border-neutral-700",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-[#3DF1A6] selection:text-black">
      {/* Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 texture-bg" />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 pt-16 pb-20"
      >
        <div className="max-w-5xl">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-5 mb-8"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-neutral-800 shrink-0">
              <Image
                src="/pup400.jpg"
                alt="Jamie Pond"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono px-3 py-1 bg-[#FF5C1C]/10 text-[#FF5C1C] border border-[#FF5C1C]/40">
                  EB-1A
                </span>
                <span className="text-[10px] font-mono px-3 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800">
                  Los Angeles
                </span>
              </div>
              <p className="text-sm text-neutral-500">
                Founding Staff Software Engineer
              </p>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Jamie Pond
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xl md:text-2xl text-neutral-300 mb-4"
          >
            <span>
              Founding{" "}
              <span className="text-[#3DF1A6] font-semibold">
                Staff Software Engineer
              </span>{" "}
              at
            </span>
            <a
              href="https://tamber.music/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-[#3DF1A6] hover:text-white transition-colors"
              aria-label="Tamber"
            >
              <TamberLogo className="h-7 md:h-8 w-auto" />
            </a>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          >
            Building AI-first music creation from day one — audio engines,
            real-time DSP, and tools that make making music feel human.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3"
          >
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-700 transition-all"
                aria-label={label}
              >
                <Icon size={20} className="text-neutral-400" />
              </a>
            ))}
            <a
              href="https://tamber.music"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-6 py-3 bg-[#3DF1A6] text-black font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_24px_rgba(61,241,166,0.25)] hover:shadow-[0_0_32px_rgba(61,241,166,0.4)]"
            >
              tamber.music →
            </a>
            <a
              href="https://yapi.run"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-neutral-700 text-neutral-300 font-bold rounded-xl hover:border-neutral-500 hover:text-white transition-all"
            >
              🐑 yapi.run →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.p
          variants={fadeUp}
          className="max-w-3xl text-neutral-400 leading-relaxed"
        >
          Founding Staff Software Engineer at{" "}
          <a
            href="https://tamber.music/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3DF1A6] hover:text-white transition-colors"
          >
            Tamber
          </a>
          , where we&apos;re building AI-first music creation — a bionic arm
          for making music. I work on audio engines, real-time DSP, and
          AI-driven music tools in C++ and TypeScript, speak at conferences
          like CppCon and ADC, and build developer tools like yapi. EB-1A visa
          holder based in Los Angeles.
        </motion.p>
      </motion.section>

      {/* Work */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.h2
          variants={fadeUp}
          className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase"
        >
          Work
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {WORK.map((item) => (
            <motion.a
              key={item.title}
              variants={fadeUp}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-8 rounded-2xl transition-all ${
                item.featured
                  ? "bg-[#3DF1A6]/[0.04] border border-[#3DF1A6]/30 hover:border-[#3DF1A6]/60 hover:bg-[#3DF1A6]/[0.07]"
                  : "bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                    {item.featured ? (
                      <TamberLogo className="h-7 w-auto text-[#3DF1A6]" />
                    ) : (
                      item.title
                    )}
                    {item.tag && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 border ${
                          TAG_STYLES[item.tagColor ?? "default"] ??
                          TAG_STYLES.default
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <p className="text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Highlights / Social Proof */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.h2
          variants={fadeUp}
          className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase"
        >
          Highlights
        </motion.h2>

        <div className="flex flex-wrap gap-4">
          {HIGHLIGHTS.map((item) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-5 py-4 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:bg-neutral-900 hover:border-neutral-700 transition-all"
            >
              <div>
                <p className="font-semibold group-hover:text-white transition-colors">
                  {item.label}
                </p>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-1 shrink-0 border ${
                  TAG_STYLES[item.tagColor ?? "default"] ?? TAG_STYLES.default
                }`}
              >
                {item.tag}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Speaking */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.h2
          variants={fadeUp}
          className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase"
        >
          Conference Talks
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {TALKS.map((talk) => (
            <motion.a
              key={talk.videoId}
              variants={fadeUp}
              href={`https://www.youtube.com/watch?v=${talk.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden hover:bg-neutral-900 hover:border-neutral-700 transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${talk.videoId}/hqdefault.jpg`}
                  alt={talk.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-mono text-neutral-500 mb-1">
                  {talk.conf}
                </p>
                <p className="font-semibold text-lg group-hover:text-white transition-colors">
                  {talk.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* GitHub */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.h2
          variants={fadeUp}
          className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase"
        >
          Open Source Activity
        </motion.h2>

        <motion.div variants={fadeUp} className="overflow-x-auto">
          <GithubCalendar />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-24 py-12 border-t border-neutral-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
          <p>pond.audio</p>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-neutral-700">
          {PROJECTS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-neutral-700 mt-6">
          This footer was added with{" "}
          <a
            href="https://github.com/jamierpond/claude-remote"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-400 transition-colors"
          >
            claude-remote
          </a>
        </p>
      </footer>
    </main>
  );
}
