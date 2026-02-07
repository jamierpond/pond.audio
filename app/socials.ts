import { Github, Linkedin, Mail, Twitter } from "lucide-react";

type SocialLink = {
  href: string;
  label: string;
  icon: typeof Github;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/jamierpond", icon: Github, label: "GitHub" },
  { href: "https://x.com/jamiepondx", icon: Twitter, label: "X" },
  { href: "https://www.linkedin.com/in/jamierpond", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:jamie@pond.audio", icon: Mail, label: "Email" },
];
