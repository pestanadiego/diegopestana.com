import type { ComponentProps } from "react";

const levels = {
  1: "text-2xl font-medium tracking-tighter text-foreground text-balance",
  2: "text-xl font-medium tracking-tighter text-foreground text-balance",
  3: "text-base font-medium tracking-tight text-foreground",
};

type HeadingProps = ComponentProps<"h1"> & {
  level: keyof typeof levels;
};

export function Heading({ level, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={`${levels[level]} ${className ?? ""}`} {...props} />;
}
