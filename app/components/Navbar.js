"use client";

import { useEffect } from "react";
import Link from "next/link";
import SocialLink from "./SocialLink";

const navItems = {
  "/": {
    name: "home",
  },
  "/work": {
    name: "work",
  },
  "/research": {
    name: "research",
  },
};

const socialItems = {
  email: {
    link: "mailto:pestanadiegoalberto@gmail.com",
  },
  linkedin: {
    link: "https://www.linkedin.com/in/diegopestana",
  },
  github: {
    link: "https://www.github.com/pestanadiego",
  },
};

export function Navbar() {
  return (
    <>
      <aside className="-ml-[8px] mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav
            className="flex flex-row justify-between items-center px-0 pb-0 fade"
            id="nav"
          >
            <div className="flex flex-row items-center space-x-0">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 flex items-center relative px-2"
                >
                  {name}
                </Link>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-0">
              <ul className="flex flex-row items-center space-x-4 font-sm hover:text-neutral-800">
                {Object.entries(socialItems).map(([name, { link }]) => (
                  <li key={name}>
                    <SocialLink name={name} link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
