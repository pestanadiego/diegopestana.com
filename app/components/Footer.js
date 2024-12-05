import SocialLink from "./SocialLink";

const footerItems = {
  email: {
    link: "mailto:pestanadiegoalberto@gmail.com",
  },
  linkedin: {
    link: "https://www.linkedin.com/in/diegopestana/",
  },
  github: {
    link: "https://github.com/pestanadiego",
  },
};

export function Footer() {
  return (
    <div id="contact" className="default-color">
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        {Object.entries(footerItems).map(([name, { link }]) => {
          return (
            <li key={name}>
              <SocialLink name={name} link={link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
