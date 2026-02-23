export const metadata = {
  title: "Research",
  description: "A brief summary of my research projects.",
};

const papers = {
  "https://arxiv.org/abs/2501.10451": {
    title: "Automating Credit Card Limit Adjustments Using Machine Learning",
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
      <div className="prose prose-neutral">
        <p>
          My research focuses on <b>representation learning</b> for complex
          time-series data, specifically electrocardiogram signals. I explore
          multiple <b>self-supervised techniques</b>, such as contrastive
          learning frameworks and joint-embedding predictive architectures, to
          extract meaningful features from biological data. My goal is to create
          rich and meaningful embeddings from vast amounts of unlabeled data,
          which can be used as a foundation for downstream classification of{" "}
          <b>cardiac anomalies</b>.
        </p>
        <p>
          I also do research on <b>TinyML</b>. Currently, I'm addressing the
          challenges of processing high-resolution data for{" "}
          <b>defect detection</b> on edge devices, where memory and compute are
          extremely constrained. Overcoming these hardware constraints is
          crucial for low-latency applications, particularly in fields such as
          drone imaging and retail logistics.
        </p>
        <p>
          I'm interested in expanding current AI capabilities and research
          methodologies. I'm actively exploring RL techniques to enhance{" "}
          <b>LLM reasoning</b>. Additionally, as a hobby, I build{" "}
          <b>agentic tools</b> that empower researchers and streamline research
          workflows.
        </p>
        <hr className="my-6 border-neutral-100" />
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
            },
          )}
        </ul>
      </div>
    </section>
  );
}
