import { CardDescription, CardLink, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { List, ListItem } from "@/components/ui/list";
import { TextLink } from "@/components/ui/text-link";

import { getPosts } from "./writings/posts";

const projects = [
  {
    name: "rover",
    description: "An autonomous agent that finds, reviews, and reports Amazon arbitrage products.",
    href: "https://github.com/pestanadiego/rover",
  },
  {
    name: "probe",
    description: "An iterative retrieval agent for multi-hop embedded system questions.",
    href: "https://github.com/pestanadiego/probe",
  },
];

export default function HomePage() {
  const posts = getPosts();

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <Heading level={1}>Hey, I'm Diego</Heading>
        <List>
          <ListItem>
            MS CS @ <TextLink href="https://ku.edu">KU</TextLink>
          </ListItem>
          <ListItem>
            Prev. SWE @ <TextLink href="/work">Venezolano de Crédito</TextLink>
          </ListItem>
          <ListItem>I find AI/ML and agentic coding really cool</ListItem>
          <ListItem>In my free time, I swim</ListItem>
          <ListItem>
            Here's my <TextLink href="/work/resume.pdf">resume</TextLink>
          </ListItem>
        </List>
      </div>

      <div className="flex flex-col gap-4">
        <Heading level={2}>Projects</Heading>
        <div className="grid gap-4 sm:grid-cols-3">
          {projects.map(({ name, description, href }) => (
            <CardLink key={name} href={href}>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <Heading level={2}>Writings</Heading>
          {posts.length > 3 && <TextLink href="/writings">All writings</TextLink>}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {posts.slice(0, 3).map(({ slug, title, date, description }) => (
            <CardLink key={slug} href={`/writings/${slug}`}>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
              <CardDescription className="mt-auto">{date}</CardDescription>
            </CardLink>
          ))}
        </div>
      </div>
    </section>
  );
}
