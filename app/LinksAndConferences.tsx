export const ADC2021 = "https://www.youtube.com/watch?v=X8dPANPmC7E&ab_channel=JUCE";
export const ADC2023 = "https://www.youtube.com/watch?v=1lEWl-MTA6k&ab_channel=ADC-AudioDeveloperConference";
export const QMUL = "https://www.qmul.ac.uk";
export const MAYK = "https://www.mayk.it";
export const LINKEDIN = "https://www.linkedin.com/in/jamierpond";
export const TWITTER = "https://twitter.com/jamiepondx";
export const LINKEDIN_LOGO = "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg";
export const X_LOGO = "https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png?v=638258862800000000";
export const MAIL = "mailto:jamie@pond.audio";
export const CPPCON2024 = "https://cppcon.speaker.fish/proposals/view/F8E3C31898";
export const CPPONSEA2024 = "https://cpponsea.uk/2024/session/introduction-to-swar-simd-within-a-register-the-next-performance-frontier-you-havent-heard-of";

type ConferenceInfo = {
  link: string;
  name: string;
  text: string;
};

export const CONFERENCES: ConferenceInfo[] = [
  {
    link: CPPCON2024,
    name: "CppCon 2024",
    text: "(upcoming) Composing Ancient Mathematical Knowledge Into Powerful Bit-fiddling Techniques",
  },
  {
    link: CPPONSEA2024,
    name: "Cpp On Sea 2024",
    text: "An Introduction to SWAR (SIMD Within A Register)",
  },
  {
    link: ADC2023,
    name: "ADC 2023",
    text: "An Engineer's Guide to Prototyping",
  },
  {
    link: ADC2021,
    name: "ADC 2021",
    text: "An Introduction to Compiler Intrinsics",
  },
];

export function ConferenceItem({ conference }: { conference: ConferenceInfo }) {
  const { link, text, name } = conference;
  return (
    <li className="mb-4">
      <a href={link}>
        <b className="text-blue-400"><u>{name}</u> - </b>
        {text}
      </a>
    </li>
  );
}

