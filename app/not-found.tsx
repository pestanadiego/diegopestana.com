import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

export default function NotFound() {
  return (
    <section className="flex flex-col gap-6">
      <Heading level={1}>Page not found</Heading>
      <Text>
        This page doesn't exist. Head back <TextLink href="/">home</TextLink>.
      </Text>
    </section>
  );
}
