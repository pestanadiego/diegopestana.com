import { CardDescription, CardLink, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

import { getPosts } from "./posts";

export const metadata = {
  title: "Writings",
  description: "Essays, notes, and technical writing.",
};

export default function WritingsPage() {
  return (
    <section className="flex flex-col gap-8">
      <Heading level={1}>Writings</Heading>
      <div className="grid gap-4 sm:grid-cols-3">
        {getPosts().map(({ slug, title, date, description }) => (
          <CardLink key={slug} href={`/writings/${slug}`}>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardDescription className="mt-auto">{date}</CardDescription>
          </CardLink>
        ))}
      </div>
    </section>
  );
}
