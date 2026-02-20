import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative z-10 px-6 md:px-12 lg:px-24 py-4 border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-mono"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 group-hover:shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-shadow" />
          <span className="text-neutral-400 group-hover:text-white transition-colors">
            pond.audio
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-mono">
          <Link
            href="/blog"
            className="px-3 py-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all"
          >
            Blog
          </Link>
          <Link
            href="/email"
            className="px-3 py-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
