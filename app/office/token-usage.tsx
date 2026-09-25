import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";

import type { OfficeSnapshot } from "./snapshot";

const chartHeight = 96;

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const dayFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

function DailyChart({ daily, daysInMonth }: OfficeSnapshot["tokens"]) {
  const peak = Math.max(...daily.map(({ tokens }) => tokens), 1);
  const slot = 100 / daysInMonth;

  return (
    <figure className="flex flex-col gap-2 pt-4">
      <svg width="100%" height={chartHeight} aria-hidden="true" className="block">
        <line x1="0" x2="100%" y1={chartHeight - 0.5} y2={chartHeight - 0.5} className="stroke-border" />
        {daily.map(({ date, tokens }, index) => {
          const height = (tokens / peak) * (chartHeight - 4);
          return (
            <g key={date} className="group">
              <rect x={`${index * slot}%`} width={`${slot}%`} height={chartHeight} className="fill-transparent" />
              <rect
                x={`${index * slot + slot * 0.15}%`}
                y={chartHeight - height}
                width={`${slot * 0.7}%`}
                height={height + 4}
                rx="2"
                className="fill-foreground transition-colors group-hover:fill-muted"
              />
              <title>{`${dayFormat.format(new Date(date))}: ${compact.format(tokens)} tokens`}</title>
            </g>
          );
        })}
      </svg>
      <figcaption className="flex justify-between text-sm text-muted">
        <span>{dayFormat.format(new Date(daily[0].date))}</span>
        <span>{dayFormat.format(new Date(daily[daily.length - 1].date))}</span>
      </figcaption>
      <table className="sr-only">
        <caption>Tokens per day</caption>
        <tbody>
          {daily.map(({ date, tokens }) => (
            <tr key={date}>
              <th scope="row">{dayFormat.format(new Date(date))}</th>
              <td>{tokens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function TokenUsage({ tokens }: { tokens?: OfficeSnapshot["tokens"] }) {
  const hasData = tokens && tokens.daily.length > 0;
  const total = tokens?.daily.reduce((sum, day) => sum + day.tokens, 0) ?? 0;
  const peakDay = tokens?.daily.reduce((peak, day) => (day.tokens > peak.tokens ? day : peak), tokens.daily[0]);

  return (
    <Card>
      <div className="flex items-baseline justify-between gap-4">
        <CardTitle>Monthly token consumption</CardTitle>
        {tokens && <CardDescription>{monthFormat.format(new Date(`${tokens.month}-01`))}</CardDescription>}
      </div>
      {hasData ? (
        <>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <Stat label="Total" value={compact.format(total)} />
            <Stat label="Daily average" value={compact.format(total / tokens.daily.length)} />
            <Stat label="Peak day" value={peakDay ? compact.format(peakDay.tokens) : "–"} />
          </div>
          <DailyChart {...tokens} />
        </>
      ) : (
        <CardDescription>No usage recorded yet.</CardDescription>
      )}
    </Card>
  );
}
