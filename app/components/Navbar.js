"use client";

import { useEffect } from "react";
import Link from "next/link";

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
  "/contact": {
    name: "contact",
  },
};

export function Navbar() {
  useEffect(() => {
    const contactButton = document.querySelector("#contactButton");
    const contact = document.querySelector("#contact");

    contactButton.addEventListener("click", () => {
      contact.classList.remove("default-color");
      setTimeout(() => {
        contact.classList.add("default-color");
      }, 3500);
    });
  }, []);

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return name != "contact" ? (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              ) : (
                <a
                  key={path}
                  id="contactButton"
                  href="#contact"
                  className="transition-all hover:text-neutral-800 flex align-middle relative py-1 px-2"
                >
                  {name}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
