import Link from "next/link";
import type { ComponentProps } from "react";

const textLinkClassName =
  "font-medium text-foreground underline decoration-subtle decoration-2 underline-offset-2 transition-colors hover:decoration-foreground";

export function TextLink({ href, className, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={`${textLinkClassName} ${className ?? ""}`} {...props} />;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${textLinkClassName} ${className ?? ""}`}
      {...props}
    />
  );
}
