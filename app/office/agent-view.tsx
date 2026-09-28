import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import type { AgentActivity } from "./snapshot";

const dayMs = 86_400_000;

function formatElapsed(from: string, to: string) {
  const seconds = Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86_400)}d ago`;
}

function AgentRow({ agent, updatedAt }: { agent: AgentActivity; updatedAt: string }) {
  return (
    <li className="flex flex-col gap-1 py-3">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="flex items-center gap-2 font-mono text-foreground">
          <span
            className={`size-1.5 shrink-0 rounded-full ${agent.status === "working" ? "bg-live" : "bg-faint"}`}
            aria-hidden="true"
          />
          {agent.name}
        </span>
        <span className="shrink-0 text-muted tabular-nums">
          {agent.status} · {formatElapsed(agent.updatedAt, updatedAt)}
        </span>
      </div>
      {agent.tool && (
        <p className="truncate pl-3.5 font-mono text-sm text-muted">
          {agent.tool} {agent.target}
        </p>
      )}
    </li>
  );
}

function ParkedAgents({ agents, updatedAt }: { agents: AgentActivity[]; updatedAt: string }) {
  return (
    <details className="group border-t border-divider pt-3 text-sm">
      <summary className="cursor-pointer list-none text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
        <span className="group-open:hidden">
          {agents.length} more {agents.length === 1 ? "session" : "sessions"} idle for over a day
        </span>
        <span className="hidden group-open:inline">Hide idle sessions</span>
      </summary>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-muted">
        {agents.map((agent) => (
          <li key={agent.id} className="tabular-nums">
            {agent.name} <span className="text-subtle">{formatElapsed(agent.updatedAt, updatedAt)}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

type AgentViewProps = {
  agents?: AgentActivity[];
  updatedAt?: string;
};

export function AgentView({ agents = [], updatedAt }: AgentViewProps) {
  const working = agents.filter(({ status }) => status === "working").length;
  const now = updatedAt ? Date.parse(updatedAt) : 0;
  const sortedAgents = agents.toSorted(
    (a, b) =>
      Number(b.status === "working") - Number(a.status === "working") ||
      Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );
  const active = sortedAgents.filter((agent) => agent.status === "working" || now - Date.parse(agent.updatedAt) < dayMs);
  const parked = sortedAgents.filter((agent) => !active.includes(agent));

  return (
    <Card>
      <div className="flex items-baseline justify-between gap-4">
        <CardTitle>Realtime agent view</CardTitle>
        {agents.length > 0 && (
          <CardDescription className="shrink-0">
            {working} of {agents.length} working
          </CardDescription>
        )}
      </div>
      <CardDescription>What my coding agents are doing right now. Paths and commands are obfuscated.</CardDescription>
      {agents.length > 0 && updatedAt ? (
        <>
          {active.length > 0 ? (
            <ul className="divide-y divide-divider">
              {active.map((agent) => (
                <AgentRow key={agent.id} agent={agent} updatedAt={updatedAt} />
              ))}
            </ul>
          ) : (
            <CardDescription className="mt-2">Nothing has moved in the last day.</CardDescription>
          )}
          {parked.length > 0 && <ParkedAgents agents={parked} updatedAt={updatedAt} />}
        </>
      ) : (
        <CardDescription className="mt-2">No agents running right now.</CardDescription>
      )}
    </Card>
  );
}
