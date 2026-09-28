export const metadata = {
  title: "Work",
  description: "A brief summary of my work.",
};

export default function WorkPage() {
  return (
    <section className="mb-8">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        work experience
      </h1>
      <div className="prose prose-neutral">
        <div>
          Here's a brief overview of my work experience. Please, check my{" "}
          <a href="work/resume.pdf" target="_blank">
            resume
          </a>{" "}
          for a comprehensive look at my technical skills, qualifications, and
          achievements.
        </div>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Goop
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Aug 2026 – Present</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">AI Engineer (Contract)</p>
        <ul>
          <li>
            Shipped a multi-tenant, omni-channel agent (<b>TypeScript</b>,{" "}
            <b>Node.js</b>) that turns informal, scattered context (Slack
            messages, meeting notes, voice notes) into structured tasks across
            Slack, Notion and Granola
          </li>
          <li>
            Replaced a 3-hour, <b>125</b>-case manual test matrix with{" "}
            <b>42</b> scored evals that drive the agent through real sessions and
            grade its tool calls and replies, catching prompt and tool
            regressions before every deploy
          </li>
          <li>
            Cut average model-call latency from <b>8.2 s</b> to <b>2.6 s</b> and
            calls per conversation from <b>4</b> to <b>2.5</b> by tracing turn
            time, pinning provider order and offloading routing decisions to
            Jev, a typed-decision model
          </li>
        </ul>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            crescō
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Jun 2026 – Present</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">Co-founder</p>
        <ul>
          <li>
            Co-founded an AI-first software factory that generated{" "}
            <b>$22,000</b> in its first 4 months
          </li>
          <li>
            Processed <b>$40,000+</b> in payments through a customer payment
            portal (<b>Next.js</b>, <b>NestJS</b>) that accepts Stripe, PayPal,
            Binance, Zelle and bank transfers, confirming every payment
            automatically
          </li>
          <li>
            Built a dual-currency, double-entry ledger (<b>NestJS</b>,{" "}
            <b>PostgreSQL</b>) that records every invoice and payment for a
            logistics company, matching payments to invoices to the cent from a
            reconciliation inbox fed over SFTP
          </li>
          <li>
            Developed an engineering agent (<b>TypeScript</b>, <b>Node.js</b>)
            that turns production alerts into deduplicated GitHub issues, then
            reproduces and fixes the bug in a <b>Docker</b> sandbox and opens a
            tested PR in about <b>30</b> minutes
          </li>
        </ul>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Sep 2022 – Jul 2025</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">Software Engineer</p>
        <ul>
          <li>
            Designed a scalable RESTful API using <b>Java</b>,{" "}
            <b>Spring Boot</b> and <b>SQL</b> that securely allows outside
            parties to access bank's financial services, facilitating{" "}
            <b>10,000+</b> users and supporting <b>50,000+</b> daily operations
          </li>
          <li>
            Led a 5-person technical team in delivering continuous features and
            updates to a <b>Flutter</b> mobile app, meeting user needs and
            driving a <b>30%</b> increase in store reviews that boosted the
            app's rating
          </li>
          <li>
            Developed and implemented a supervised financial transaction
            classification model using a bag of words and random forest,
            enabling personalized financial recommendations and targeted
            marketing campaigns
          </li>
          <li>
            Integrated with a third-party tax administration service to provide
            online tax payments through a full-stack web app made using{" "}
            <b>Java</b> and <b>ReactJS</b>, resulting in <b>$500,000+</b>{" "}
            collected thus far
          </li>
          <li>
            Built a <b>JavaScript</b> library that generates and scans QRs with
            users' public banking information, easing the exchange of data and
            increasing by <b>10%</b> the amount of daily P2P operations
          </li>
          <li className="mb-0">
            Optimized query execution times of an <b>Oracle</b> database
            supporting multiple internal systems by partitioning large tables
            and creating materialized views, improving the systems'
            responsiveness and eliminating timeouts
          </li>
        </ul>
      </div>
    </section>
  );
}
