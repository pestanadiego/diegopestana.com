"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import honors from "../public/home/honors.webp";
import brooklyn from "../public/home/brooklyn.webp";
import signing from "../public/home/signing.webp";
import degree from "../public/home/degree.webp";
import unimet from "../public/home/unimet.webp";
import nyse from "../public/home/nyse.webp";

export default function Home() {
  const [age, setAge] = useState(null);

  const calcAge = () => {
    const today = new Date();
    const birth = new Date("2001-11-28");

    let age = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    setAge(age);
  };

  useEffect(() => {
    calcAge();
  }, []);

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Diego Pestana
      </h1>

      <p className="prose prose-neutral">
        I'm a {age}-year-old, curious, and ambitious systems engineer. I
        currently <Link href="/work">work</Link> at Venezolano de Crédito, where
        I serve as a senior software engineer for the online banking team. I'm
        an artificial intelligence (AI) and machine learning (ML) enthusiast,
        and I'm conducting <Link href="/research">research</Link> on explainable
        ML for the banking industry.
      </p>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4">
          <Image
            alt="Receiving my summa cum laude honors"
            src={honors}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="Visiting the Brooklyn Bridge"
            src={brooklyn}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <Image
            alt="Taking a picture in front of Cruz-Diez's work of art"
            src={degree}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image
            alt="Standing alongside UNIMET's logo"
            src={unimet}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
          <Image
            alt="Signing of my degree certificate"
            src={signing}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80">
          <Image
            alt="Visiting the New York Stock Exchange"
            src={nyse}
            fill
            sizes="(min-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
