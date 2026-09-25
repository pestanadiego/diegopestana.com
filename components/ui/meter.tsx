type MeterProps = {
  value: number;
  label: string;
};

export function Meter({ value, label }: MeterProps) {
  const percent = Math.min(Math.max(value, 0), 100);
  return (
    <svg
      role="meter"
      aria-label={label}
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      width="100%"
      height="4"
      className="block overflow-hidden rounded-full"
    >
      <rect width="100%" height="4" className="fill-border" />
      <rect width={`${percent}%`} height="4" className="fill-foreground transition-all" />
    </svg>
  );
}
