import Link from "next/link";

import { IconLink } from "@/components/ui/icon-link";
import { GitHubIcon, LinkedInIcon, MailIcon, ResumeIcon, XIcon } from "@/components/ui/icons";

const pages = [
  { href: "/", name: "home" },
  { href: "/research", name: "research" },
  { href: "/office", name: "office" },
];

const profiles = [
  { href: "https://www.linkedin.com/in/diegopestana", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://www.github.com/pestanadiego", label: "GitHub", Icon: GitHubIcon },
  { href: "https://x.com/diegopestana", label: "X", Icon: XIcon },
  { href: "mailto:pestanadiegoalberto@gmail.com", label: "Email", Icon: MailIcon },
  { href: "/work/resume.pdf", label: "Resume", Icon: ResumeIcon },
];

export function Navbar() {
  return (
    <nav className="-ml-2 mb-16 flex items-center justify-between tracking-tight">
      <div className="flex items-center sm:gap-2">
        {pages.map(({ href, name }) => (
          <Link key={href} href={href} className="px-2 transition-colors hover:text-muted">
            {name}
          </Link>
        ))}
      </div>
      <div className="-mr-2 flex items-center sm:gap-1">
        {profiles.map(({ href, label, Icon }) => (
          <IconLink key={label} href={href} label={label}>
            <Icon />
          </IconLink>
        ))}
      </div>
    </nav>
  );
}
