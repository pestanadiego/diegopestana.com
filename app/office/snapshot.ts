export type AgentActivity = {
  id: string;
  name: string;
  status: "working" | "idle";
  tool: string;
  target: string;
  updatedAt: string;
};

export type OfficeSnapshot = {
  updatedAt: string;
  health: {
    cpu: number;
    memory: { used: number; total: number };
    processes: number;
    spec: { label: string; value: string }[];
  };
  agents: AgentActivity[];
  tokens: {
    month: string;
    daysInMonth: number;
    daily: { date: string; tokens: number }[];
  };
};

function obfuscate(target: string) {
  const segments = target.split("/");
  return segments
    .map((segment, index) => {
      const isFile = index === segments.length - 1;
      const extension = isFile ? (segment.match(/\.[a-z0-9]{1,5}$/i)?.[0] ?? "") : "";
      return "•".repeat(Math.min(segment.length - extension.length, 8)) + extension;
    })
    .join("/");
}

export async function getOfficeSnapshot(): Promise<OfficeSnapshot | null> {
  const url = process.env.OFFICE_API_URL;
  if (!url) return null;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.OFFICE_API_TOKEN}` },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const snapshot: OfficeSnapshot = await response.json();
    return {
      ...snapshot,
      agents: snapshot.agents.map((agent) => ({ ...agent, target: obfuscate(agent.target) })),
    };
  } catch {
    return null;
  }
}
