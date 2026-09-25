import { Heading } from "@/components/ui/heading";
import { List, ListItem } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { Strong, Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

export const metadata = {
  title: "Research",
  description: "A brief summary of my research projects.",
};

const papers = [
  {
    href: "https://arxiv.org/abs/2501.10451",
    title: "Automating Credit Card Limit Adjustments Using Machine Learning",
    type: "Extended Abstract",
    organization: "Venezolano de Crédito",
    year: "2024",
  },
  {
    href: "https://unimet.ent.sirsi.net/client/es_ES/default/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:134777/one",
    title: "Venezolano de Crédito: desarrollo de la banca móvil corporativa",
    type: "Undergraduate Thesis",
    organization: "Universidad Metropolitana",
    year: "2023",
  },
];

export default function ResearchPage() {
  return (
    <section className="flex flex-col gap-8">
      <Heading level={1}>Research</Heading>
      <List>
        <ListItem>
          <Strong>Representation learning</Strong> for electrocardiogram signals, using{" "}
          <Strong>self-supervised</Strong> methods such as contrastive learning and joint-embedding
          predictive architectures to classify <Strong>cardiac anomalies</Strong> from unlabeled data
        </ListItem>
        <ListItem>
          <Strong>TinyML</Strong> for high-resolution <Strong>defect detection</Strong> on edge devices
          with tight memory and compute budgets, aimed at drone imaging and retail logistics
        </ListItem>
        <ListItem>
          Reinforcement learning techniques to improve <Strong>LLM reasoning</Strong>
        </ListItem>
        <ListItem>
          <Strong>Agentic tools</Strong> that streamline research workflows, built as a hobby
        </ListItem>
      </List>
      <Separator />
      <div className="flex flex-col gap-4">
        <Heading level={2}>Publications</Heading>
        <ul className="flex flex-col gap-4">
          {papers.map(({ href, title, type, organization, year }) => (
            <li key={href} className="flex flex-col gap-1">
              <TextLink href={href}>{title}</TextLink>
              <Text variant="muted">
                {type} · {organization}, {year}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
