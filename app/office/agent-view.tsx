import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import type { AgentActivity } from "./snapshot";

function formatElapsed(from: string, to: string) {
  const seconds = Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

function AgentRow({ agent, updatedAt }: { agent: AgentActivity; updatedAt: string }) {
  return (
    <li className="flex flex-col gap-1 py-3">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="font-mono text-foreground">{agent.name}</span>
        <span className="shrink-0 text-muted tabular-nums">
          {agent.status === "working" ? "working" : "idle"} · {formatElapsed(agent.updatedAt, updatedAt)}
        </span>
      </div>
      <p className="truncate font-mono text-sm text-muted">
        {agent.tool} {agent.target}
      </p>
    </li>
  );
}

type AgentViewProps = {
  agents?: AgentActivity[];
  updatedAt?: string;
};

export function AgentView({ agents, updatedAt }: AgentViewProps) {
  return (
    <Card>
      <CardTitle>Realtime agent view</CardTitle>
      <CardDescription>What my coding agents are doing right now. Paths and commands are obfuscated.</CardDescription>
      {agents?.length && updatedAt ? (
        <ul className="divide-y divide-divider">
          {agents.map((agent) => (
            <AgentRow key={agent.id} agent={agent} updatedAt={updatedAt} />
          ))}
        </ul>
      ) : (
        <CardDescription className="mt-2">No agents running right now.</CardDescription>
      )}
    </Card>
  );
}
