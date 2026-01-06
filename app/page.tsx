"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Mic2,
  Code2,
  Zap,
  Play,
} from "lucide-react";
import GithubCalendar from "./GithubCalendar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-950 text-white p-4 md:p-8 relative overflow-hidden">
      {/* Texture Overlay */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: "url(/texture.jpg)" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 relative z-10"
      >
        {/* 1. Hero Profile Card */}
        <motion.div
          variants={item}
          className="md:col-span-2 md:row-span-2 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors group"
        >
          <div className="flex items-start justify-between">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-white transition-colors">
              <Image
                src="/pup400.jpg"
                alt="Jamie Pond"
                fill
                className="object-cover"
              />
            </div>
            <Link
              href="/jamie.vcf"
              className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors"
            >
              Add Contact
            </Link>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              Jamie Pond
            </h1>
            <p className="text-neutral-400 text-lg">Staff Software Engineer</p>
            <p className="text-neutral-500">London, UK</p>
          </div>
        </motion.div>

        {/* 2. Tamber / Mayk Hype Card */}
        <motion.div
          variants={item}
          className="md:col-span-2 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 border border-white/10 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Zap size={120} />
          </div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <a
              href="https://www.tamber.ai"
              className="bg-white/20 p-1 px-2 rounded hover:bg-white/30 transition-colors"
            >
              Tamber
            </a>
            <span className="text-indigo-200 font-normal">formerly mayk.it</span>
          </h2>
          <p className="text-indigo-100 mb-4 max-w-md">
            Leading audio software engineering for the next generation of
            AI-generated music.
          </p>
          <div className="flex gap-4 text-sm font-mono text-indigo-300">
            <span>Series A</span>
            <span>AI Audio</span>
            <span>Viral Tech</span>
          </div>
        </motion.div>

        {/* 3. Social Stack */}
        <motion.div
          variants={item}
          className="md:col-span-1 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <SocialLink
              href="https://github.com/jamierpond"
              icon={<Github />}
              label="GitHub"
            />
            <SocialLink
              href="https://x.com/jamiepondx"
              icon={<Twitter />}
              label="X / Twitter"
            />
            <SocialLink
              href="https://www.linkedin.com/in/jamierpond"
              icon={<Linkedin />}
              label="LinkedIn"
            />
            <SocialLink
              href="mailto:jamie@pond.audio"
              icon={<Mail />}
              label="Email"
            />
          </div>
        </motion.div>

        {/* 4. Talks Section */}
        <motion.div
          variants={item}
          className="md:col-span-1 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 flex flex-col relative overflow-hidden group"
        >
          <h3 className="font-bold text-neutral-400 mb-4 flex items-center gap-2">
            <Mic2 size={16} /> Speaking
          </h3>
          <div className="space-y-3">
            <a
              href="https://www.youtube.com/watch?v=1lEWl-MTA6k"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-neutral-800 p-2 -mx-2 rounded transition-colors"
            >
              <p className="font-bold text-sm">ADC 2023</p>
              <p className="text-xs text-neutral-500">Prototyping at Mayk</p>
            </a>
            <a
              href="https://www.youtube.com/watch?v=7n1CVURp0DY"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-neutral-800 p-2 -mx-2 rounded transition-colors"
            >
              <p className="font-bold text-sm">CppCon 2024</p>
              <p className="text-xs text-neutral-500">Associative Iteration</p>
            </a>
            <a
              href="https://www.youtube.com/watch?v=4h7UZnWN67Y"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-neutral-800 p-2 -mx-2 rounded transition-colors"
            >
              <p className="font-bold text-sm">C++ on Sea 2024</p>
              <p className="text-xs text-neutral-500">Intro to SWAR</p>
            </a>
            <a
              href="https://www.youtube.com/watch?v=X8dPANPmC7E"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-neutral-800 p-2 -mx-2 rounded transition-colors"
            >
              <p className="font-bold text-sm">ADC 2021</p>
              <p className="text-xs text-neutral-500">Compiler Intrinsics</p>
            </a>
          </div>
        </motion.div>

        {/* 5. Playground / Hidden Gems */}
        <motion.div
          variants={item}
          className="md:col-span-2 bg-neutral-100 text-neutral-900 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">The Playground</h3>
            <p className="text-neutral-600 mb-6">
              Interactive experiments and audio tools running right here.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PlaygroundPill href="/daw" label="Web DAW" />
              <PlaygroundPill href="/wordle" label="Wordle Clone" />
              <PlaygroundPill href="/progress" label="Life Progress" />
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12">
            <Code2 size={150} />
          </div>
        </motion.div>

        {/* 6. GitHub Calendar (Full Width) */}
        <motion.div
          variants={item}
          className="md:col-span-4 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 flex items-center justify-center"
        >
          <div className="w-full overflow-x-auto">
            <GithubCalendar />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
    >
      <span className="p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function PlaygroundPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 bg-white border border-neutral-300 px-4 py-2 rounded-full font-bold hover:bg-neutral-50 transition-colors shadow-sm"
    >
      <Play size={14} className="fill-black" />
      {label}
    </Link>
  );
}
