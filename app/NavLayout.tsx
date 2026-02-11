import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative z-10 px-6 md:px-12 lg:px-24 py-4 border-b border-neutral-900 bg-neutral-950">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-mono text-neutral-500 hover:text-white transition-colors"
        >
          pond.audio
        </Link>
        <div className="flex items-center gap-6 text-sm font-mono">
          <Link
            href="/blog"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/email"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
