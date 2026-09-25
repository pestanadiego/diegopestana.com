import { useState } from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "@/components/ui/icons";
import { Meter } from "@/components/ui/meter";
import { Stat } from "@/components/ui/stat";

import type { OfficeSnapshot } from "./snapshot";

export function Health({ health }: { health?: OfficeSnapshot["health"] }) {
  const [showSpec, setShowSpec] = useState(false);
  const memoryPercent = health ? (health.memory.used / health.memory.total) * 100 : 0;

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <CardTitle>Health</CardTitle>
        {health && (
          <button
            type="button"
            aria-expanded={showSpec}
            aria-controls="vps-spec"
            onClick={() => setShowSpec(!showSpec)}
            className="-my-1 inline-flex items-center gap-1 py-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <InfoIcon width={16} height={16} />
            spec
          </button>
        )}
      </div>
      {health ? (
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          <Stat label="CPU" value={`${Math.round(health.cpu)}%`}>
            <Meter value={health.cpu} label="CPU usage" />
          </Stat>
          <Stat label="RAM" value={`${health.memory.used.toFixed(1)} / ${health.memory.total} GB`}>
            <Meter value={memoryPercent} label="Memory usage" />
          </Stat>
          <Stat label="Processes" value={health.processes} />
        </div>
      ) : (
        <CardDescription>No health data yet.</CardDescription>
      )}
      {health && showSpec && (
        <dl id="vps-spec" className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-divider pt-4 text-sm sm:grid-cols-4">
          {health.spec.map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <dt className="text-muted">{label}</dt>
              <dd className="text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  );
}
