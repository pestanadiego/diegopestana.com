"use client";

import { useEffect, useState } from "react";

import { AgentView } from "./agent-view";
import { Health } from "./health";
import type { OfficeSnapshot } from "./snapshot";
import { TokenUsage } from "./token-usage";

const pollInterval = 5000;

export function LiveOffice({ initial }: { initial: OfficeSnapshot | null }) {
  const [snapshot, setSnapshot] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      fetch("/api/office")
        .then((response) => response.json())
        .then(setSnapshot)
        .catch(() => setSnapshot(null));
    }, pollInterval);
    return () => clearInterval(interval);
  }, []);

  const status = {
    live: "Live, refreshing every 5 seconds",
    demo: "Demo, replaying recorded agent sessions",
    offline: "Offline, the VPS is not reporting right now",
  }[snapshot?.source ?? "offline"];

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-center gap-2 text-sm text-muted" aria-live="polite">
        <span
          className={`size-2 rounded-full ${snapshot?.source === "live" ? "bg-live" : "bg-faint"}`}
          aria-hidden="true"
        />
        {status}
      </p>
      <Health health={snapshot?.health} />
      <AgentView agents={snapshot?.agents} updatedAt={snapshot?.updatedAt} />
      <TokenUsage tokens={snapshot?.tokens} />
    </div>
  );
}
