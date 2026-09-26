// Records the running Claude Code and Codex sessions on the VPS as a demo fixture.
// Usage: ssh office 'node --input-type=module -' < scripts/extract-office-demo.mjs > app/office/demo.json
// Paths and commands are obfuscated on the VPS before anything is printed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = os.homedir();
const month = new Date().toISOString().slice(0, 7);

function obfuscate(target) {
  const segments = String(target).split("/");
  return segments
    .map((segment, index) => {
      const isFile = index === segments.length - 1;
      const extension = isFile ? (segment.match(/\.[a-z0-9]{1,5}$/i)?.[0] ?? "") : "";
      return "•".repeat(Math.min(segment.length - extension.length, 8)) + extension;
    })
    .join("/");
}

function readLines(file) {
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function relativeTarget(target, cwd) {
  if (typeof target !== "string") return "";
  if (target.startsWith(cwd + "/")) return path.relative(cwd, target);
  if (target.startsWith(home + "/")) return "~/" + path.relative(home, target);
  return target.split("\n")[0];
}

// --- running agents ---
const processes = [];
for (const pid of fs.readdirSync("/proc").filter((p) => /^\d+$/.test(p))) {
  try {
    const argv = fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").filter(Boolean);
    const bin = path.basename(argv[0] || "");
    if (bin !== "claude" && bin !== "codex") continue;
    const cwd = fs.readlinkSync(`/proc/${pid}/cwd`);
    const resume = argv.indexOf("--resume");
    processes.push({ kind: bin, cwd, sessionId: resume > -1 ? argv[resume + 1] : null, started: fs.statSync(`/proc/${pid}`).mtimeMs });
  } catch {}
}

function claudeFiles(cwd) {
  const dir = path.join(home, ".claude/projects", cwd.replace(/[^a-zA-Z0-9]/g, "-"));
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".jsonl"))
    .map((f) => path.join(dir, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

function allCodexFiles() {
  const out = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".jsonl")) out.push(full);
    }
  };
  walk(path.join(home, ".codex/sessions"));
  return out.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

const codexFiles = allCodexFiles();
const codexCwd = new Map(
  codexFiles.map((file) => {
    const meta = readLines(file).find((l) => l.type === "session_meta");
    return [file, meta?.payload?.cwd];
  }),
);

function claudeCalls(file, cwd) {
  const calls = [];
  for (const line of readLines(file)) {
    if (line.type !== "assistant" || !Array.isArray(line.message?.content)) continue;
    for (const block of line.message.content) {
      if (block.type !== "tool_use") continue;
      const input = block.input || {};
      const raw = input.file_path || input.path || input.notebook_path || input.command || input.pattern || input.url || input.description || "";
      calls.push({ tool: block.name, target: relativeTarget(raw, cwd), at: Date.parse(line.timestamp) });
    }
  }
  return calls;
}

function codexCalls(file, cwd) {
  const calls = [];
  for (const line of readLines(file)) {
    const payload = line.payload || {};
    if (line.type !== "response_item") continue;
    if (payload.type === "function_call") {
      let args = {};
      try {
        args = JSON.parse(payload.arguments || "{}");
      } catch {}
      const command = Array.isArray(args.command) ? args.command.slice(-1)[0] : args.command || args.cmd || args.path || "";
      calls.push({ tool: payload.name, target: relativeTarget(command, cwd), at: Date.parse(line.timestamp) });
    } else if (payload.type === "custom_tool_call") {
      const file = String(payload.input || "").match(/\*\*\* (?:Update|Add|Delete) File: (.+)/)?.[1] || "";
      calls.push({ tool: payload.name, target: relativeTarget(file, cwd), at: Date.parse(line.timestamp) });
    }
  }
  return calls;
}

const usedFiles = new Set();
const agents = [];
const counters = { claude: 0, codex: 0 };
for (const proc of processes.sort((a, b) => a.started - b.started)) {
  let file;
  if (proc.kind === "claude") {
    const files = claudeFiles(proc.cwd);
    file = (proc.sessionId && files.find((f) => f.includes(proc.sessionId))) || files.find((f) => !usedFiles.has(f));
  } else {
    file = codexFiles.find((f) => codexCwd.get(f) === proc.cwd && !usedFiles.has(f));
  }
  counters[proc.kind] += 1;
  const name = `${proc.kind}-${counters[proc.kind]}`;
  if (!file) {
    agents.push({ name, steps: [] });
    continue;
  }
  usedFiles.add(file);
  const calls = (proc.kind === "claude" ? claudeCalls(file, proc.cwd) : codexCalls(file, proc.cwd)).slice(-12);
  agents.push({
    name,
    steps: calls.map((call, index) => ({
      tool: call.tool,
      target: obfuscate(call.target),
      seconds: index === 0 ? 8 : Math.min(Math.max(Math.round((call.at - calls[index - 1].at) / 1000), 3), 60) || 8,
    })),
  });
}

// --- tokens this month (same definition as ccusage totalTokens) ---
const daily = {};
const add = (timestamp, tokens) => {
  if (!timestamp || !tokens) return;
  const day = new Date(timestamp).toISOString().slice(0, 10);
  if (!day.startsWith(month)) return;
  daily[day] = (daily[day] || 0) + tokens;
};

const seen = new Set();
const walkClaude = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkClaude(full);
    else if (entry.name.endsWith(".jsonl") && fs.statSync(full).mtime.toISOString().slice(0, 7) >= month) {
      for (const line of readLines(full)) {
        const usage = line.message?.usage;
        if (line.type !== "assistant" || !usage) continue;
        const key = `${line.message.id}:${line.requestId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        add(line.timestamp, (usage.input_tokens || 0) + (usage.output_tokens || 0) + (usage.cache_creation_input_tokens || 0) + (usage.cache_read_input_tokens || 0));
      }
    }
  }
};
walkClaude(path.join(home, ".claude/projects"));

for (const file of codexFiles) {
  for (const line of readLines(file)) {
    if (line.type === "event_msg" && line.payload?.type === "token_count") {
      add(line.timestamp, line.payload.info?.last_token_usage?.total_tokens || 0);
    }
  }
}

// --- machine ---
const meminfo = Object.fromEntries(
  fs.readFileSync("/proc/meminfo", "utf8").split("\n").filter(Boolean).map((l) => {
    const [k, v] = l.split(":");
    return [k, parseInt(v) / 1024 / 1024];
  }),
);
const osRelease = fs.readFileSync("/etc/os-release", "utf8").match(/^PRETTY_NAME="?([^"\n]+)/m)?.[1];
const disk = fs.statfsSync("/");

console.log(
  JSON.stringify(
    {
      recordedAt: new Date().toISOString(),
      health: {
        cpu: Math.round((os.loadavg()[0] / os.cpus().length) * 100),
        memory: {
          used: +(meminfo.MemTotal - meminfo.MemAvailable).toFixed(1),
          total: Math.round(meminfo.MemTotal),
        },
        processes: fs.readdirSync("/proc").filter((p) => /^\d+$/.test(p)).length,
        spec: [
          { label: "CPU", value: `${os.cpus().length} vCPU` },
          { label: "Memory", value: `${Math.round(meminfo.MemTotal)} GB` },
          { label: "Disk", value: `${Math.round((disk.blocks * disk.bsize) / 1e9)} GB` },
          { label: "OS", value: osRelease },
        ],
      },
      agents,
      tokens: {
        month,
        daily: Object.entries(daily)
          .sort()
          .map(([date, tokens]) => ({ date, tokens })),
      },
    },
    null,
    2,
  ),
);
