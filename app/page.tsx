import GithubCalendar from "./GithubCalendar";
import Link from "next/link";
import {
  CONFERENCES,
  QMUL,
  MAYK,
  LINKEDIN,
  TWITTER,
  LINKEDIN_LOGO,
  X_LOGO,
  MAIL,
  ConferenceItem,
} from "./LinksAndConferences";


export default function Home() {
  return (
    <div className="w-full">
      <Link href="/jamie.vcf">
        <h1 className="text-4xl font-bold text-center">
          Jamie Pond
        </h1>
      </Link>
      <h3 className="text-2xl font-bold text-center mt-4">
        <a href={MAIL}>jamie@pond.audio</a>
      </h3>
      <div className="flex flex-col text-center items-center justify-center p-8 space-y-8">
        <p>
          I&apos;m Lead Audio Software Engineer at
          <a href={MAYK}><b> mayk</b></a>.
        </p>
        <p>
          I studied <b>Sound & Music Computing MSc</b> at <a href={QMUL}>
            <b>Queen Mary University of London</b></a>.
        </p>
        <h3 className="text-2xl">Presentations</h3>
        <ul>
          {CONFERENCES.map((conference) => (
            <ConferenceItem
              key={conference.name}
              conference={conference}
            />
          ))}
        </ul>
        <p>
          I&apos;m a mentor in the ADC 2023 & 2024 Mentorship Program.
        </p>
        <p>
          <a href={MAIL}><u>Please feel free to hit me up!</u></a>
        </p>
        <div className="flex flex-row space-x-4">
          <a href={LINKEDIN}>
            <img alt="LinkedIn Logo" src={LINKEDIN_LOGO} className="w-8 h-8" />
          </a>
          <a href={TWITTER}>
            <img alt="X logo" src={X_LOGO} className="w-8 h-8" />
          </a>
        </div>
      </div>
      <GithubCalendar />
    </div>
  );
}
