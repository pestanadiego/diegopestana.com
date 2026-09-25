import type { ReactNode } from "react";

type StatProps = {
  label: string;
  value: ReactNode;
  children?: ReactNode;
};

export function Stat({ label, value, children }: StatProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-sm text-muted">{label}</span>
      <span className="truncate text-xl font-medium tracking-tight text-foreground tabular-nums">{value}</span>
      {children}
    </div>
  );
}
