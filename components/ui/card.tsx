import Link from "next/link";
import type { ComponentProps } from "react";

const cardClassName = "flex flex-col gap-2 rounded-lg border border-border p-4";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={`${cardClassName} ${className ?? ""}`} {...props} />;
}

export function CardLink({ href, className, ...props }: ComponentProps<"a"> & { href: string }) {
  const linkClassName = `${cardClassName} transition-colors hover:border-subtle ${className ?? ""}`;
  if (href.startsWith("/")) {
    return <Link href={href} className={linkClassName} {...props} />;
  }
  return <a href={href} target="_blank" rel="noreferrer" className={linkClassName} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3 className={`text-base font-medium tracking-tight text-foreground ${className ?? ""}`} {...props} />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={`text-sm text-muted text-pretty ${className ?? ""}`} {...props} />;
}
