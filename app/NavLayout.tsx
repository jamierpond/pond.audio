import Link from "next/link";

export function Nav() {
  return (
    <nav className="mx-auto max-w-2xl px-4 pt-6 flex justify-between text-sm text-neutral-400">
      <Link href="/" className="hover:underline">
        pond.audio
      </Link>
      <span className="space-x-4">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <Link href="/email" className="hover:underline">
          Contact
        </Link>
      </span>
    </nav>
  );
}
