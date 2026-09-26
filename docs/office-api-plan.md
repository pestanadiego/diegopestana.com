# Office API plan

How to move `/office` from the demo fixture to live data, following [office-api.md](./office-api.md).

## Current state

- The site side is done. `getOfficeSnapshot()` reads `office:health`, `office:agents`, and `office:tokens` from Upstash Redis with a read-only token, and falls back to offline when `office:health` is missing.
- `OFFICE_DEMO=true` serves `app/office/demo.json` (synthetic) through a replay loop, labeled as a demo on the page.
- `scripts/extract-office-demo.mjs` already contains the session parsing (running `claude`/`codex` processes, their session files, tool calls, token totals) and the obfuscation the reporter needs.
- Nothing runs on the VPS yet.

## Steps

### 1. Provision Redis (owner)

1. In the Vercel project, add Upstash Redis from the Marketplace. This sets `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and `KV_REST_API_READ_ONLY_TOKEN`.
2. Remove `KV_REST_API_TOKEN` from the Vercel project's environment; the site only needs the read-only token.
3. Keep `OFFICE_DEMO=true` on Vercel until step 5.

### 2. Reporter on the VPS

A single Node 22 script with no dependencies, at `~/office-reporter/reporter.mjs`, run as a systemd user service:

```ini
# ~/.config/systemd/user/office-reporter.service
[Unit]
Description=Push office status to Upstash

[Service]
EnvironmentFile=%h/office-reporter/.env
ExecStart=%h/.nvm/versions/node/v22.23.1/bin/node %h/office-reporter/reporter.mjs
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
```

`loginctl enable-linger diego` keeps it running without an open SSH session.

Loops:

| Loop | Interval | Work |
| --- | --- | --- |
| Health | 10 s | Read `/proc/stat` twice 1 s apart for CPU, `/proc/meminfo`, count `/proc/[0-9]*`. `SET office:health EX 30`. |
| Agents | 2 s scan, write on change, 30 s heartbeat | Build the agent list (step 3). `SET office:agents EX 120` only when it changed or the heartbeat is due. |
| Tokens | 15 min | Sum the current month from Claude Code and Codex session files, reusing the extract script's logic. `SET office:tokens EX 86400`. |

Only obfuscated values are ever passed to `SET`. The obfuscation function is shared with the extract script.

### 3. Agent activity

Claude Code and Codex are handled differently because they expose different hooks.

**Claude Code: hooks.** Add to `~/.claude/settings.json` on the VPS:

```json
{
  "hooks": {
    "PreToolUse": [{ "hooks": [{ "type": "command", "command": "node ~/office-reporter/hook.mjs tool" }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "node ~/office-reporter/hook.mjs idle" }] }],
    "SessionEnd": [{ "hooks": [{ "type": "command", "command": "node ~/office-reporter/hook.mjs end" }] }]
  }
}
```

`hook.mjs` reads the hook JSON from stdin (`session_id`, `cwd`, `tool_name`, `tool_input`), obfuscates the target, and writes `~/.office/agents/claude-<session_id>.json` with `{ kind, sessionId, tool, target, status, updatedAt }`. On `end` it deletes the file. It must exit fast and never block the tool call: no network, one small file write.

**Codex: tail the rollout.** Confirm first whether Codex 0.153 on the VPS has per-tool hooks. If not, the reporter maps each running `codex` process to its latest `~/.codex/sessions/**/rollout-*.jsonl` with a matching `session_meta.cwd` (as the extract script does) and reads new `function_call` / `custom_tool_call` lines since the last offset.

**Merging.** Every 2 s the reporter lists running `claude`/`codex` processes from `/proc`, joins them with the state files and rollout tails, drops state files whose process is gone, marks agents idle after 120 s without activity, and numbers them `claude-N` / `codex-N` by process start time. Names stay stable while a process lives.

### 4. Verify

1. `curl "$KV_REST_API_URL/mget/office:health/office:agents/office:tokens" -H "Authorization: Bearer $KV_REST_API_READ_ONLY_TOKEN"` returns three JSON strings.
2. Grep the stored values for path fragments, project names, and tmux session names; there should be none.
3. Run the site locally with the Vercel env (`vercel env pull`) and without `OFFICE_DEMO`; the status line reads "Live".
4. `systemctl --user stop office-reporter`; within 30 s the page shows offline. Start it again.

### 5. Go live

Remove `OFFICE_DEMO` from the Vercel project and redeploy.

## Budget

At the intervals above: health about 260k writes a month, agents about 90k (heartbeat) plus activity bursts, tokens about 3k. Reads are one `MGET` per page view plus one per open tab every 5 s. If that crosses the Upstash free tier, raise the health interval to 15 s and write it only when CPU or memory moves by more than 2 points.

## Risks

- **Leaking private work.** Mitigated by obfuscating on the VPS, re-obfuscating on the site, and never publishing project or tmux names.
- **Hook latency.** `hook.mjs` does one local file write; if it ever fails it must exit 0 so Claude Code is not affected.
- **Session file formats.** Claude Code and Codex log formats change between versions. The parsers skip lines they cannot read, so the worst case is missing activity, not a crash.
- **Stale data.** TTLs make a dead reporter show up as offline instead of frozen numbers.
