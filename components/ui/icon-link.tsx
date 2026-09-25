import type { ComponentProps } from "react";

type IconLinkProps = ComponentProps<"a"> & {
  href: string;
  label: string;
};

export function IconLink({ href, label, className, children, ...props }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={`inline-flex size-7 items-center sm:size-8 justify-center text-foreground transition-colors hover:text-muted ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
