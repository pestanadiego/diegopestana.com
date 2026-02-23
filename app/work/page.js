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
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Aug 2023 – Jul 2025</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">Software Engineer II</p>
        <ul>
          <li>
            Built a scalable RESTful API using <b>Java</b>, <b>Spring Boot</b>{" "}
            and <b>SQL</b> that securely allows outside parties to access bank's
            financial services, facilitating <b>10,000+</b> users and supporting{" "}
            <b>50,000+</b> daily operations
          </li>
          <li>
            Developed and implemented a supervised financial transaction
            classification model using a bag of words and random forest,
            enabling personalized financial recommendations and targeted
            marketing campaigns
          </li>
          <li>
            Led a 5-person technical team in delivering continuous features and
            updates to a <b>Flutter</b> mobile app, meeting user needs and
            driving a <b>30%</b> increase in store reviews that boosted the
            app's rating
          </li>
          <li>
            Integrated with a third-party tax administration service to provide
            online tax payments through a full-stack web app made using{" "}
            <b>Java</b> and <b>ReactJS</b>, resulting in <b>$500,000+</b>{" "}
            collected thus far
          </li>
          <li>
            Built a <b>JavaScript</b> library that generates and scans QRs with
            user's public banking information, easing the exchange of data and
            increasing by <b>10%</b> the amount of daily P2P operations
          </li>
        </ul>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Jan 2023 – July 2023</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">Software Engineer I</p>
        <ul>
          <li>
            Optimized query execution times of an <b>Oracle</b> database
            supporting multiple internal systems by partitioning large tables
            and creating materialized views, improving the systems'
            responsiveness and eliminating timeouts
          </li>
          <li>
            Refactored a <b>Java</b> legacy codebase using a <b>TDD</b>{" "}
            approach, reducing tight coupling and increasing adaptability
          </li>
          <li>
            Migrated <b>5,000+</b> lines of <b>JQuery</b> to <b>JavaScript</b>{" "}
            in order to improve compatibility with modern frameworks
          </li>
          <li>
            Wrote <b>Python</b> scripts to generate daily currency exchange
            reports, minimizing manual intervention
          </li>
        </ul>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Sept 2022 - Dec 2022</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">
          Software Engineer Intern
        </p>
        <ul>
          <li>
            Redesigned <b>62</b> non-responsive pages with <b>CSS</b>, making
            them fit correctly on different screen sizes, e.g. mobile
          </li>
          <li>
            Solved <b>30+</b> customer issues reported by support tickets,
            boosting web app user satisfaction scores by <b>15%</b>
          </li>
        </ul>
        <hr className="my-6 border-neutral-100" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Universidad Metropolitana
          </h2>
          <p className="text-neutral-600 mb-0 text-sm">Apr 2022 - Dec 2022</p>
        </div>
        <p className="text-neutral-600 mt-0 text-sm">
          Database Teaching Assistant
        </p>
        <ul>
          <li>
            Provided guidance and support during check-in meetings and open
            office hours
          </li>
          <li>
            Conducted reinforcement sessions where database fundamentals were
            taught to a group of <b>35</b> students
          </li>
          <li className="mb-0">
            Increased by <b>30%</b> the number of passing students in relation
            to previous terms
          </li>
        </ul>
      </div>
    </section>
  );
}
