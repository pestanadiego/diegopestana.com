import { getDemoSnapshot } from "./demo";

export type AgentActivity = {
  id: string;
  name: string;
  status: "working" | "idle";
  tool: string;
  target: string;
  updatedAt: string;
};

type Health = {
  cpu: number;
  memory: { used: number; total: number };
  processes: number;
  spec: { label: string; value: string }[];
};

export type TokenUsage = {
  month: string;
  daily: { date: string; tokens: number }[];
};

type Skill = {
  name: string;
  description: string;
};

export type OfficeSnapshot = {
  source: "live" | "demo";
  updatedAt: string;
  health: Health;
  agents: AgentActivity[];
  tokens?: TokenUsage;
  skills?: Skill[];
};

type HealthRecord = Health & { updatedAt: string };
type AgentsRecord = { updatedAt: string; agents: AgentActivity[] };
type TokensRecord = TokenUsage & { updatedAt: string };
type SkillsRecord = { updatedAt: string; skills: Skill[] };

const keys = ["office:health", "office:agents", "office:tokens", "office:skills"];

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

function parse<T>(value: string | null): T | null {
  return value ? JSON.parse(value) : null;
}

async function getLiveSnapshot(): Promise<OfficeSnapshot | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_READ_ONLY_TOKEN;
  if (!url || !token) return null;

  try {
    const response = await fetch(`${url}/mget/${keys.join("/")}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const { result }: { result: (string | null)[] } = await response.json();
    const health = parse<HealthRecord>(result[0]);
    const agents = parse<AgentsRecord>(result[1]);
    const tokens = parse<TokensRecord>(result[2]);
    const skills = parse<SkillsRecord>(result[3]);
    if (!health) return null;

    const { updatedAt, ...machine } = health;
    return {
      source: "live",
      updatedAt,
      health: machine,
      agents: (agents?.agents ?? []).map((agent) => ({ ...agent, target: obfuscate(agent.target) })),
      tokens: tokens ? { month: tokens.month, daily: tokens.daily } : undefined,
      skills: skills?.skills,
    };
  } catch {
    return null;
  }
}

export async function getOfficeSnapshot(): Promise<OfficeSnapshot | null> {
  if (process.env.OFFICE_DEMO === "true") return getDemoSnapshot(Date.now());
  return getLiveSnapshot();
}
