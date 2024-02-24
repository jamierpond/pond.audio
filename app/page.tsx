import GithubCalendar from "./GithubCalendar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <Link href="/jamie.vcf">
        <h1 className="text-4xl font-bold text-center">
          Jamie Pond
        </h1>
      </Link>
      <h3 className="text-2xl font-bold text-center mt-4">
        <a href="mailto:jamie@pond.audio">jamie@pond.audio</a>
      </h3>
      <div className="flex flex-col text-center items-center justify-center p-8 space-y-8">
        <p>I&apos;m Lead Audio Software Engineer at <a href="https://www.mayk.it"><b>mayk</b></a>.</p>
        <p>I studied <b>Sound & Music Computing MSc</b> at <a href="https://www.qmul.ac.uk"><b>Queen Mary University of London</b></a>.</p>
        <p>I spoke at ADC 2021 about <a href="https://www.youtube.com/watch?v=X8dPANPmC7E&ab_channel=JUCE"><b>using compiler intrinsics in your code</b></a>.</p>
        <p>I spoke at ADC 2023 about <a href="https://conference.audio.dev/session/an-engineers-guide-to-prototyping-building-ai-music-tools-for-the-99/"><b>mayk&apos;s approach to prototyping</b></a>.</p>
        <p>I&apos;m a mentor in the ADC 2023 Mentorship Program.</p>
        <p><a href="/card"><u>Please feel free to hit me up!</u></a></p>
        <div className="flex flex-row space-x-4">
          <a href="https://www.linkedin.com/in/jamierpond">
            <img alt="LinkedIn Logo" src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" className="w-8 h-8" />
          </a>
          <a href="https://twitter.com/jamiepondx">
            <img alt="X logo" src="https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png?v=638258862800000000" className="w-8 h-8" />
          </a>
        </div>
      </div>
      <GithubCalendar />
    </div>
  );
}
