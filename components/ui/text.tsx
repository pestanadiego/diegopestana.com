import type { ComponentProps } from "react";

const variants = {
  body: "text-base leading-7 text-body text-pretty",
  muted: "text-sm text-muted",
};

type TextProps = ComponentProps<"p"> & {
  variant?: keyof typeof variants;
};

export function Text({ variant = "body", className, ...props }: TextProps) {
  return <p className={`${variants[variant]} ${className ?? ""}`} {...props} />;
}

export function Strong(props: ComponentProps<"strong">) {
  return <strong className="font-medium text-foreground" {...props} />;
}
