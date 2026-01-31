"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import GithubCalendar from "./GithubCalendar";

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
    role: "Staff Software Engineer",
    description: "AI-first music creation. Building the audio engine and creator tools.",
    href: "https://tamber.music/",
    tag: "now",
    tagColor: "green",
  },
  {
    title: "yapi",
    role: "Creator",
    description: "CLI-first API client for HTTP, gRPC, GraphQL, TCP. Open source.",
    href: "https://yapi.run/",
    tag: "oss",
    tagColor: "blue",
  },
  {
    title: "mayk.it",
    role: "Lead Audio Engineer",
    description: "UGC music tools. Drayk It went viral. Covers.ai and Discord game both acquired.",
    href: "https://www.mayk.it/",
  },
];

const TALKS = [
  { conf: "CppCon 2024", title: "Associative Iteration", videoId: "7n1CVURp0DY" },
  { conf: "C++ on Sea 2024", title: "Intro to SWAR", videoId: "4h7UZnWN67Y" },
  { conf: "ADC 2023", title: "Prototyping at Mayk", videoId: "1lEWl-MTA6k" },
  { conf: "ADC 2021", title: "Compiler Intrinsics", videoId: "X8dPANPmC7E" },
];

const HIGHLIGHTS = [
  { label: "Drayk It", desc: "Viral AI Drake generator", href: "https://www.vibe.com/news/tech/drake-song-drayk-it-ai-software-1234730792/", tag: "Viral", tagColor: "blue" },
  { label: "Covers.ai", desc: "Social music experiences", href: "https://covers.ai/", tag: "Acquired", tagColor: "green" },
  { label: "Discord game", desc: "Acquired by Playroom Studio", href: "https://www.linkedin.com/feed/update/urn:li:activity:7409399286628712448/", tag: "Acquired", tagColor: "green" },
];

const SOCIALS = [
  { href: "https://github.com/jamierpond", icon: Github, label: "GitHub" },
  { href: "https://x.com/jamiepondx", icon: Twitter, label: "X" },
  { href: "https://www.linkedin.com/in/jamierpond", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:jamie@pond.audio", icon: Mail, label: "Email" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black">
      {/* Texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: "url(/texture.jpg)" }}
      />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 pt-16 pb-20"
      >
        <div className="max-w-5xl">
          <motion.div variants={fadeUp} className="flex items-center gap-5 mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-neutral-800 shrink-0">
              <Image src="/pup400.jpg" alt="Jamie Pond" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono px-3 py-1 bg-gradient-to-r from-amber-900/50 to-orange-900/50 text-amber-300 border border-amber-800/50">
                  EB-1A
                </span>
                <span className="text-[10px] font-mono px-3 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800">
                  Los Angeles
                </span>
              </div>
              <p className="text-sm text-neutral-500">Staff Software Engineer</p>
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
            className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          >
            Building audio software, AI music tools, and developer infrastructure.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
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
              href="https://yapi.run"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-amber-500 transition-all"
            >
              🐑 yapi.run →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Work */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 px-6 md:px-12 lg:px-24 py-16 border-t border-neutral-900"
      >
        <motion.h2 variants={fadeUp} className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
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
              className="group block p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-900 hover:border-neutral-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                    {item.title}
                    {item.tag && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 ${
                        item.tagColor === "green"
                          ? "bg-green-950 text-green-400 border-green-800"
                          : "bg-blue-950 text-blue-400 border-blue-800"
                      } border`}>
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
              <p className="text-neutral-400 leading-relaxed">{item.description}</p>
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
        <motion.h2 variants={fadeUp} className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
          Speaking
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
                <p className="text-xs font-mono text-neutral-500 mb-1">{talk.conf}</p>
                <p className="font-semibold text-lg group-hover:text-white transition-colors">
                  {talk.title}
                </p>
              </div>
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
        <motion.h2 variants={fadeUp} className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
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
                <p className="font-semibold group-hover:text-white transition-colors">{item.label}</p>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
              <span className={`text-[10px] font-mono px-2 py-1 shrink-0 ${
                item.tagColor === "blue"
                  ? "bg-blue-950 text-blue-400 border border-blue-800"
                  : item.tagColor === "green"
                  ? "bg-green-950 text-green-400 border border-green-800"
                  : "bg-neutral-800 text-neutral-400 border border-neutral-700"
              }`}>
                {item.tag}
              </span>
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
        <motion.h2 variants={fadeUp} className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
          Activity
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
            {SOCIALS.map(({ href, label }) => (
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
        <p className="text-center text-xs text-neutral-700 mt-6">
          🦞 This footer was added by <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">OpenClaw</a>
        </p>
      </footer>
    </main>
  );
}
