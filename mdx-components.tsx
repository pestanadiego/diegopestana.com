import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps } from "react";

import { Heading } from "@/components/ui/heading";
import { List, ListItem, OrderedList } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { Strong, Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

import { TweetEmbed } from "./app/components/tweet-embed";

function Figure({ src, alt, title }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;
  return (
    <span className="my-8 flex flex-col gap-2">
      <Image
        src={src}
        alt={alt ?? ""}
        width={0}
        height={0}
        sizes="(min-width: 672px) 672px, 100vw"
        className="h-auto w-full rounded-lg border border-border"
      />
      {title && <span className="text-sm text-muted">{title}</span>}
    </span>
  );
}

const components: MDXComponents = {
  h2: (props) => <Heading level={2} className="mt-10 mb-4" {...props} />,
  h3: (props) => <Heading level={3} className="mt-8 mb-3" {...props} />,
  p: (props) => <Text className="my-5" {...props} />,
  a: ({ href = "", ...props }) => <TextLink href={href} {...props} />,
  strong: (props) => <Strong {...props} />,
  ul: (props) => <List className="my-5" {...props} />,
  ol: (props) => <OrderedList className="my-5" {...props} />,
  li: (props) => <ListItem {...props} />,
  hr: () => <Separator className="my-10" />,
  img: Figure,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-border pl-4 italic text-foreground" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-6"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded-lg bg-surface px-1 py-0.5 font-mono text-sm in-[pre]:bg-transparent in-[pre]:p-0" {...props} />
  ),
  Tweet: TweetEmbed,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return { ...inherited, ...components };
}
