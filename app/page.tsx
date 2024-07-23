import GithubCalendar from "./GithubCalendar";
import Link from "next/link";

const ADC2021 = "https://www.youtube.com/watch?v=X8dPANPmC7E&ab_channel=JUCE";
const ADC2023 = "https://www.youtube.com/watch?v=1lEWl-MTA6k&ab_channel=ADC-AudioDeveloperConference";
const QMUL = "https://www.qmul.ac.uk";
const MAYK = "https://www.mayk.it";
const LINKEDIN = "https://www.linkedin.com/in/jamierpond";
const TWITTER = "https://twitter.com/jamiepondx";
const LINKEDIN_LOGO = "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg";
const X_LOGO = "https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png?v=638258862800000000";
const MAIL = "mailto:jamie@pond.audio";
const CPPCON2024 = "https://cppcon.speaker.fish/proposals/view/F8E3C31898";
const CPPONSEA2024 = "https://cpponsea.uk/2024/session/introduction-to-swar-simd-within-a-register-the-next-performance-frontier-you-havent-heard-of";

interface ConferenceItemProps {
  link: string;
  conference: string;
  text: string;
}

function ConferenceItem({ link, conference, text }: ConferenceItemProps) {
  return (
    <li className="text-left mb-4">
      <a href={link}><b><u>{conference}</u> - </b> {text}</a>
    </li>
  );
}

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
        <h3>Presentations</h3>
        <ul className="">
          <ConferenceItem
            link={CPPCON2024}
            conference="CppCon 2024"
            text="(upcoming) Composing Ancient Mathematical Knowledge Into Powerful Bit-fiddling Techniques"
          />
          <ConferenceItem
            link={CPPONSEA2024}
            conference="Cpp On Sea 2024"
            text="An Introduction to SWAR (SIMD Within A Register)"
          />
          <ConferenceItem
            link={ADC2023}
            conference="ADC 2023"
            text="An Engineer's Guide to Prototyping"
          />
          <ConferenceItem
            link={ADC2021}
            conference="ADC 2021"
            text="An Introduction to Compiler Intrinsics"
          />
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
