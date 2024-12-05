import ArrowIcon from "./ArrowIcon";

export default function SocialLink({ name, link }) {
  return (
    <a href={link} target="_blank" className="social-link flex items-center">
      <ArrowIcon />
      <p className="h-7 mx-2">{name}</p>
    </a>
  );
}
