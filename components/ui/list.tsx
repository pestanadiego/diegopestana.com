import type { ComponentProps } from "react";

export function List({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={`list-disc space-y-2 pl-6 text-base leading-7 text-body marker:text-faint ${className ?? ""}`}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={`list-decimal space-y-2 pl-6 text-base leading-7 text-body marker:text-muted ${className ?? ""}`}
      {...props}
    />
  );
}

export function ListItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={`pl-1 ${className ?? ""}`} {...props} />;
}
