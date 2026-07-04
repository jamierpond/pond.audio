import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative z-10 px-6 md:px-12 lg:px-24 py-4 border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-mono text-neutral-400 hover:text-white transition-colors"
        >
          pond.audio
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
