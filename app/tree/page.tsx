// Import the necessary components
import Link from 'next/link';

// React Component with a button to download the vCard
const DownloadContactButton = () => {
  return (
    <button>
      <a href="/jamie.vcf" download>
        Download My Contact
      </a>
    </button>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black">
      <div className="p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Hello, I&apos;m Jamie</h1>

        {/* LinkedIn */}
        <Link href="https://www.linkedin.com/in/yourprofile">
            LinkedIn
        </Link>

        {/* GitHub */}
        <Link href="https://github.com/yourusername">
            GitHub
        </Link>

        {/* Twitter */}
        <Link href="https://twitter.com/yourhandle">
            Twitter
        </Link>

        <Link href="/email">
            Email
        </Link>

        {/* Download vCard */}
        <DownloadContactButton />
      </div>
    </div>
  )
}

