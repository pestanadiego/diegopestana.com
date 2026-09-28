import { Heading } from "@/components/ui/heading";
import { List, ListItem } from "@/components/ui/list";
import { Strong } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

export const metadata = {
  title: "Research",
  description: "A brief summary of my research projects.",
};

export default function ResearchPage() {
  return (
    <section className="flex flex-col gap-8">
      <Heading level={1}>Research</Heading>
      <List>
        <ListItem>
          <Strong>Trustworthy machine learning</Strong> for real-world clinical decision support, personalized
          and transparent, with the{" "}
          <TextLink href="https://ittc.ku.edu/~zyao/group/">Jayhawk Data Science Lab</TextLink> at KU
        </ListItem>
        <ListItem>
          <Strong>LLMs over electronic health records</Strong>: prompt tuning that fuses structured EHR encoders
          with language models, and reward-aligned clinical note summaries for outcome prediction
        </ListItem>
        <ListItem>
          <Strong>Medical knowledge graphs</Strong> enriched and refined by LLMs under a budget, for personalized
          medical concept representation
        </ListItem>
        <ListItem>
          <Strong>Medication recommendation</Strong> for cold-start patients through user-adaptive meta-learning
          with uncertainty filtering
        </ListItem>
      </List>
    </section>
  );
}
