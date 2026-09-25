import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

import { LiveOffice } from "./live-office";
import { getOfficeSnapshot } from "./snapshot";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Office",
  description: "My agentic setup and the live status of the VPS it runs on.",
};

const skills = [
  {
    name: "font-forge",
    description: "Derives a custom typeface from an open-source chassis through rule-based rounds and reviews.",
  },
  {
    name: "remote-compute",
    description: "Stages code on a remote GPU box, launches the run in tmux, and collects the results.",
  },
  {
    name: "no-ai-slop",
    description: "Edits drafts into sharper, more human writing while keeping the writer's voice.",
  },
];

export default async function OfficePage() {
  const snapshot = await getOfficeSnapshot();

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <Heading level={1}>Office</Heading>
        <Text>
          This is my agentic setup. Here, you can review my coding setup and check the realtime status
          of my VPS.
        </Text>
      </div>

      <LiveOffice initial={snapshot} />

      <div className="flex flex-col gap-4">
        <Heading level={2}>Skills collection</Heading>
        <div className="grid gap-4 sm:grid-cols-3">
          {skills.map(({ name, description }) => (
            <Card key={name}>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
