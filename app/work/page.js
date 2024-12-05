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
      <div className="prose prose-neutral dark:prose-invert">
        <div>
          Here's a brief overview of my work experience. Please, check my{" "}
          <a href="work/resume.pdf" target="_blank">
            resume
          </a>{" "}
          for a comprehensive look at my technical skills, qualifications, and
          achievements.
        </div>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 dark:text-neutral-400 text-sm">
            Aug 2023 – Present
          </p>
        </div>
        <p className="text-neutral-600 mt-0 dark:text-neutral-400 text-sm">
          Senior Software Engineer
        </p>
        <ul>
          <li>
            Built a RESTful API using Java, Spring Boot and SQL that allows
            outside parties to access bank's financial services, facilitating
            <b> 10,000+</b> users and supporting <b>50,000+</b> daily operations
          </li>
          <li>
            Developed and implemented a supervised financial transaction
            classification model using a bag of words and random forest,
            enabling personalized financial recommendations and targeted
            marketing campaigns
          </li>
          <li>
            Led a team of <b>5</b> in delivering continuous features and updates
            to a Flutter-based mobile app, meeting user needs and driving a
            <b> 30%</b> increase in store reviews that boosted the app's rating
          </li>
          <li>
            Integrated with a third-party tax administration service to provide
            online tax payments through a full-stack web app made using Java and
            React.js, resulting in <b>$5,000,000+</b> collected thus far
          </li>
          <li>
            Built a JavaScript library that generates and scans QRs with user's
            public banking information, easing the exchange of data and
            increasing by <b>10%</b> the amount of daily P2P operations
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 dark:text-neutral-400 text-sm">
            Jan 2023 – July 2023
          </p>
        </div>
        <p className="text-neutral-600 mt-0 dark:text-neutral-400 text-sm">
          Junior Software Engineer
        </p>
        <ul>
          <li>
            Wrote Python scripts to generate daily currency exchange reports,
            minimizing manual intervention
          </li>
          <li>
            Reengineered a Java legacy codebase using a TDD approach, reducing
            tight coupling and increasing adaptability
          </li>
          <li>
            Optimized an Oracle database using materialized views and connection
            pooling, cutting query execution times
          </li>
          <li>
            Migrated <b>15,000+</b> lines of JQuery to JavaScript ES6 in order
            to improve compatibility with modern frameworks
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Venezolano de Crédito
          </h2>
          <p className="text-neutral-600 mb-0 dark:text-neutral-400 text-sm">
            Sept 2022 - Dec 2022
          </p>
        </div>
        <p className="text-neutral-600 mt-0 dark:text-neutral-400 text-sm">
          Software Engineer Intern
        </p>
        <ul>
          <li>
            Started the development of a Flutter-based mobile app designed to
            simplify everyday tasks for users
          </li>
          <li>
            Redesigned <b>62</b> non-responsive pages with CSS, making them fit
            correctly on different screen sizes, e.g. mobile
          </li>
          <li>
            Solved <b>30+</b> customer issues reported by support tickets,
            enhancing the reputation of the bank's web app
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl mt-0 mb-1 tracking-tighter">
            Universidad Metropolitana
          </h2>
          <p className="text-neutral-600 mb-0 dark:text-neutral-400 text-sm">
            Apr 2022 - Dec 2022
          </p>
        </div>
        <p className="text-neutral-600 mt-0 dark:text-neutral-400 text-sm">
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
