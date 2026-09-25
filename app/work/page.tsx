import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { List, ListItem } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { Strong, Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";

export const metadata = {
  title: "Work",
  description: "A brief summary of my work.",
};

type RoleProps = {
  organization: string;
  title: string;
  period: string;
  children: ReactNode;
};

function Role({ organization, title, period, children }: RoleProps) {
  return (
    <div className="flex flex-col gap-4">
      <Separator />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <Heading level={2}>{organization}</Heading>
          <Text variant="muted" className="shrink-0">
            {period}
          </Text>
        </div>
        <Text variant="muted">{title}</Text>
      </div>
      <List>{children}</List>
    </div>
  );
}

export default function WorkPage() {
  return (
    <section className="flex flex-col gap-8">
      <Heading level={1}>Work experience</Heading>
      <Text>
        Here's a brief overview of my work experience. Please, check my{" "}
        <TextLink href="/work/resume.pdf">resume</TextLink> for a comprehensive look at my technical
        skills, qualifications, and achievements.
      </Text>
      <Role organization="Venezolano de Crédito" title="Software Engineer II" period="Aug 2023 – Jul 2025">
        <ListItem>
          Built a scalable RESTful API using <Strong>Java</Strong>, <Strong>Spring Boot</Strong> and{" "}
          <Strong>SQL</Strong> that securely allows outside parties to access bank's financial services,
          facilitating <Strong>10,000+</Strong> users and supporting <Strong>50,000+</Strong> daily
          operations
        </ListItem>
        <ListItem>
          Developed and implemented a supervised financial transaction classification model using a bag
          of words and random forest, enabling personalized financial recommendations and targeted
          marketing campaigns
        </ListItem>
        <ListItem>
          Led a 5-person technical team in delivering continuous features and updates to a{" "}
          <Strong>Flutter</Strong> mobile app, meeting user needs and driving a <Strong>30%</Strong>{" "}
          increase in store reviews that boosted the app's rating
        </ListItem>
        <ListItem>
          Integrated with a third-party tax administration service to provide online tax payments
          through a full-stack web app made using <Strong>Java</Strong> and <Strong>ReactJS</Strong>,
          resulting in <Strong>$500,000+</Strong> collected thus far
        </ListItem>
        <ListItem>
          Built a <Strong>JavaScript</Strong> library that generates and scans QRs with user's public
          banking information, easing the exchange of data and increasing by <Strong>10%</Strong> the
          amount of daily P2P operations
        </ListItem>
      </Role>
      <Role organization="Venezolano de Crédito" title="Software Engineer I" period="Jan 2023 – Jul 2023">
        <ListItem>
          Optimized query execution times of an <Strong>Oracle</Strong> database supporting multiple
          internal systems by partitioning large tables and creating materialized views, improving the
          systems' responsiveness and eliminating timeouts
        </ListItem>
        <ListItem>
          Refactored a <Strong>Java</Strong> legacy codebase using a <Strong>TDD</Strong> approach,
          reducing tight coupling and increasing adaptability
        </ListItem>
        <ListItem>
          Migrated <Strong>5,000+</Strong> lines of <Strong>JQuery</Strong> to{" "}
          <Strong>JavaScript</Strong> in order to improve compatibility with modern frameworks
        </ListItem>
        <ListItem>
          Wrote <Strong>Python</Strong> scripts to generate daily currency exchange reports, minimizing
          manual intervention
        </ListItem>
      </Role>
      <Role organization="Venezolano de Crédito" title="Software Engineer Intern" period="Sep 2022 – Dec 2022">
        <ListItem>
          Redesigned <Strong>62</Strong> non-responsive pages with <Strong>CSS</Strong>, making them fit
          correctly on different screen sizes, e.g. mobile
        </ListItem>
        <ListItem>
          Solved <Strong>30+</Strong> customer issues reported by support tickets, boosting web app user
          satisfaction scores by <Strong>15%</Strong>
        </ListItem>
      </Role>
      <Role
        organization="Universidad Metropolitana"
        title="Database Teaching Assistant"
        period="Apr 2022 – Dec 2022"
      >
        <ListItem>
          Provided guidance and support during check-in meetings and open office hours
        </ListItem>
        <ListItem>
          Conducted reinforcement sessions where database fundamentals were taught to a group of{" "}
          <Strong>35</Strong> students
        </ListItem>
        <ListItem>
          Increased by <Strong>30%</Strong> the number of passing students in relation to previous terms
        </ListItem>
      </Role>
    </section>
  );
}
