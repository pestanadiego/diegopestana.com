export const metadata = {
  title: "Research",
  description: "A brief summary of my research projects.",
};

const papers = {
  "/research/acla.pdf": {
    title: "Automated Credit Limit Adjustment Model (ACLA)",
    type: "Extended Abstract",
    organization: "Venezolano de Crédito",
    year: "2024",
  },
  "https://unimet.ent.sirsi.net/client/es_ES/default/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:134777/one":
    {
      title: "Venezolano de Crédito: desarrollo de la banca móvil corporativa",
      type: "Undergraduate Thesis",
      organization: "Universidad Metropolitana",
      year: "2023",
    },
};

export default function ResearchPage() {
  return (
    <section className="mb-8">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">research</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          So far, I've gained research experience by working on projects from my
          undergraduate thesis to extended abstracts. In the future, I plan to
          conduct research on making machine learning more trustworthy by
          ensuring it's fair and secure.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <ul>
          {Object.entries(papers).map(
            ([url, { title, type, organization, year }]) => {
              return (
                <li key={url}>
                  <a target="_blank" href={url}>
                    {title}
                  </a>
                  <p className="!mt-1 !mb-0">
                    <i>{type}</i>
                  </p>
                  <p className="!mt-0 !mb-4">
                    {organization}, {year}
                  </p>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </section>
  );
}
