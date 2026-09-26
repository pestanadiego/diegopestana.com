# Office API

How the `/office` page gets its data. The VPS pushes three JSON records into Upstash Redis; the site only reads them. The VPS never accepts inbound traffic from the site.

```
VPS (Tailscale only)                     Vercel
reporter ──SET key value EX ttl──▶ Upstash Redis ◀──MGET (read-only token)── getOfficeSnapshot()
                                                                               ├─ app/office/page.tsx (first render)
                                                                               └─ /api/office (browser polls every 5s)
```

## Modes

| `OFFICE_DEMO` | Source | Status line |
| --- | --- | --- |
| `true` | `app/office/demo.json`, replayed in a loop by `app/office/demo.ts` | "Demo, replaying recorded agent sessions" |
| anything else | Upstash Redis | "Live, refreshing every 5 seconds", or "Offline" when `office:health` is missing |

## Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `OFFICE_DEMO` | Vercel | `true` serves the demo fixture instead of Redis. |
| `KV_REST_API_URL` | Vercel and VPS | Upstash REST endpoint. Set by the Vercel Upstash integration. |
| `KV_REST_API_READ_ONLY_TOKEN` | Vercel | Read-only token. The site never gets write access. |
| `KV_REST_API_TOKEN` | VPS only | Read/write token used by the reporter. Never set it on Vercel. |

## Keys

All values are JSON strings. Every record carries `updatedAt` (ISO 8601, UTC) set by the reporter when it wrote the record.

| Key | Written | TTL | Missing means |
| --- | --- | --- | --- |
| `office:health` | every 10 s | 30 s | The VPS or reporter is down. The page shows offline. |
| `office:agents` | on agent activity (debounced 2 s), plus every 30 s | 120 s | No agent activity reported. The page shows "No agents running right now." |
| `office:tokens` | every 15 min | 24 h | No usage recorded. The page shows "No usage recorded yet." |

### `office:health`

```json
{
  "updatedAt": "2026-09-26T14:03:20.000Z",
  "cpu": 34.5,
  "memory": { "used": 6.2, "total": 24 },
  "processes": 212,
  "spec": [
    { "label": "CPU", "value": "8 vCPU" },
    { "label": "Memory", "value": "24 GB" },
    { "label": "Disk", "value": "145 GB" },
    { "label": "OS", "value": "Ubuntu 24.04.4 LTS" }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `cpu` | number | Percent of all cores, 0 to 100, averaged over the last sample window. |
| `memory.used` / `memory.total` | number | GB. `used` is `MemTotal - MemAvailable`. |
| `processes` | integer | Count of numeric entries in `/proc`. |
| `spec` | `{ label, value }[]` | Shown behind the "spec" toggle, in order. Keep it to 4 items. |

### `office:agents`

```json
{
  "updatedAt": "2026-09-26T14:03:18.000Z",
  "agents": [
    {
      "id": "claude:31973d05",
      "name": "claude-1",
      "status": "working",
      "tool": "Edit",
      "target": "•••/••••/••••.tsx",
      "updatedAt": "2026-09-26T14:03:15.000Z"
    }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable per session: `<kind>:<first 8 chars of the session id>`. Used as the React key. |
| `name` | string | Public label, `claude-N` or `codex-N`, numbered by process start order. Never a project or tmux session name. |
| `status` | `"working"` \| `"idle"` | `working` while a turn is in progress; `idle` after the turn ends or 120 s without activity. |
| `tool` | string | Tool name as the agent reports it (`Read`, `Edit`, `Bash`, `exec`, `apply_patch`, ...). Empty when unknown. |
| `target` | string | Obfuscated primary argument of the tool call. See [Obfuscation](#obfuscation). |
| `updatedAt` | string | When this agent last changed tool or status. |

### `office:tokens`

```json
{
  "updatedAt": "2026-09-26T14:00:00.000Z",
  "month": "2026-09",
  "daily": [
    { "date": "2026-09-01", "tokens": 8400000 },
    { "date": "2026-09-02", "tokens": 12100000 }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `month` | `YYYY-MM` | Current UTC month. |
| `daily` | `{ date, tokens }[]` | Sorted by date, UTC days, only days with usage. |
| `tokens` | integer | Claude Code: `input + output + cache_creation + cache_read` per assistant message, deduplicated by `message.id` + `requestId` (the `ccusage` total). Codex: sum of `token_count.info.last_token_usage.total_tokens`. |

## Obfuscation

The reporter obfuscates before writing, so raw paths, commands, prompts, and project names never leave the VPS. The site applies the same function again as a safety net; it is idempotent.

1. Take the tool's primary argument: `file_path`, `path`, `command`, `pattern`, `url`, or `description` (Claude Code); the last `command` element or the `apply_patch` file (Codex).
2. Make paths relative to the session's working directory (or `~/...` under the home directory). Keep only the first line of multi-line commands.
3. Split on `/`. Replace every character of each segment with `•`, capped at 8. Keep an extension of 1 to 5 characters on the last segment only.

`app/office/demo.json` must already be obfuscated the same way.

## Site read path

`getOfficeSnapshot()` in `app/office/snapshot.ts`:

```http
GET {KV_REST_API_URL}/mget/office:health/office:agents/office:tokens
Authorization: Bearer {KV_REST_API_READ_ONLY_TOKEN}
```

Returns `{ "result": [healthJson | null, agentsJson | null, tokensJson | null] }`. A missing `office:health`, a non-2xx response, or a timeout over 3 s yields `null` (offline).

`GET /api/office` returns the merged snapshot the page renders, or `null`:

```ts
type OfficeSnapshot = {
  source: "live" | "demo";
  updatedAt: string; // office:health.updatedAt
  health: { cpu: number; memory: { used: number; total: number }; processes: number; spec: { label: string; value: string }[] };
  agents: AgentActivity[]; // office:agents.agents, or []
  tokens?: { month: string; daily: { date: string; tokens: number }[] };
};
```

## Writing from the VPS

Any Redis client works. With the REST API:

```sh
curl -s "$KV_REST_API_URL/set/office:health?EX=30" \
  -H "Authorization: Bearer $KV_REST_API_TOKEN" \
  -d "$HEALTH_JSON"
```

## Demo fixture

`app/office/demo.json` has the shape `{ recordedAt, health, agents: { name, steps: { tool, target, seconds }[] }[], tokens }`. `demo.ts` loops each agent through its steps with the recorded durations, then 45 s idle, offset per agent so they do not move in lockstep. Health wobbles around the recorded values based on how many agents are working.

The committed fixture is synthetic. To record the real sessions running on the VPS instead:

```sh
ssh office 'node --input-type=module -' < scripts/extract-office-demo.mjs > app/office/demo.json
```

The script runs entirely on the VPS and prints only obfuscated targets, tool names, durations, daily token totals, and machine specs. Review the diff before committing it; the repository is public.
