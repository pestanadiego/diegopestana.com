import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

import { getPost, getPosts } from "../posts";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { title, description } = getPost((await params).slug);
  return { title, description };
}

export default async function WritingPage({ params }: Params) {
  const { slug } = await params;
  const { title, date } = getPost(slug);
  const { default: Writing } = await import(`@/writings/${slug}.mdx`);

  return (
    <section>
      <Heading level={1}>{title}</Heading>
      <Text variant="muted" className="mt-2 mb-8">
        {date}
      </Text>
      <article>
        <Writing />
      </article>
    </section>
  );
}
