export const SOCIAL_LINKS = [
  { href: "https://github.com/jamierpond", label: "GitHub" },
  { href: "https://x.com/jamiepondx", label: "X" },
  { href: "https://www.linkedin.com/in/jamierpond", label: "LinkedIn" },
  { href: "mailto:jamie@pond.audio", label: "Email" },
] as const;

export const TALKS = [
  {
    conf: "CppCon 2024",
    title: "Associative Iteration",
    videoId: "7n1CVURp0DY",
    description: "Jamie Pond presents on Associative Iteration at CppCon 2024.",
    uploadDate: "2024-01-01",
  },
  {
    conf: "C++ on Sea 2024",
    title: "Intro to SWAR",
    videoId: "4h7UZnWN67Y",
    description:
      "Jamie Pond introduces SWAR (SIMD Within A Register) techniques at C++ on Sea 2024.",
    uploadDate: "2024-01-01",
  },
  {
    conf: "ADC 2023",
    title: "Prototyping at Mayk",
    videoId: "1lEWl-MTA6k",
    description:
      "Jamie Pond discusses rapid prototyping approaches at the Audio Developer Conference 2023.",
    uploadDate: "2023-01-01",
  },
  {
    conf: "ADC 2021",
    title: "Compiler Intrinsics",
    videoId: "X8dPANPmC7E",
    description:
      "Jamie Pond covers compiler intrinsics for audio development at ADC 2021.",
    uploadDate: "2021-01-01",
  },
] as const;
