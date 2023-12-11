function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-950 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/" className="font-semibold text-xl tracking-tight">pond.audio</a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="/blog" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Blog
          </a>
          <a href="/email" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Contact
          </a>
          <a href="https://als.pond.audio/" className="block mt-4 lg:mx-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Als Exploder
          </a>
        </div>
      </div>
    </nav>
  );
}

export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
