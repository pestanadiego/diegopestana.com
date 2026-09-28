import recording from "./demo.json";
import type { AgentActivity, OfficeSnapshot } from "./snapshot";

type RecordedAgent = {
  name: string;
  steps: { tool: string; target: string; seconds: number }[];
};

const idleSeconds = 45;
const agentOffsetSeconds = 37;

function replay({ name, steps }: RecordedAgent, index: number, now: number): AgentActivity {
  const secondsAgo = (seconds: number) => new Date(now - seconds * 1000).toISOString();
  const lastStep = steps.at(-1);
  if (!lastStep) {
    return { id: name, name, status: "idle", tool: "", target: "", updatedAt: secondsAgo(900) };
  }

  const loopSeconds = steps.reduce((sum, step) => sum + step.seconds, 0) + idleSeconds;
  let elapsed = (now / 1000 + index * agentOffsetSeconds) % loopSeconds;
  for (const step of steps) {
    if (elapsed < step.seconds) {
      return { id: name, name, status: "working", tool: step.tool, target: step.target, updatedAt: secondsAgo(elapsed) };
    }
    elapsed -= step.seconds;
  }
  return { id: name, name, status: "idle", tool: lastStep.tool, target: lastStep.target, updatedAt: secondsAgo(elapsed) };
}

export function getDemoSnapshot(now: number): OfficeSnapshot {
  const recordedAgents: RecordedAgent[] = recording.agents;
  const agents = recordedAgents.map((agent, index) => replay(agent, index, now));
  const working = agents.filter(({ status }) => status === "working").length;
  const wave = Math.sin(now / 20000);
  const { health } = recording;

  return {
    source: "demo",
    updatedAt: new Date(now).toISOString(),
    health: {
      ...health,
      cpu: Math.min(health.cpu + working * 6 + wave * 4, 100),
      memory: { ...health.memory, used: health.memory.used + working * 0.4 + wave * 0.2 },
      processes: health.processes + working * 4,
    },
    agents,
    tokens: recording.tokens,
    skills: recording.skills,
  };
}
