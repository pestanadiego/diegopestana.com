# Agent instructions

## Commits

- Match the existing history: one short, lowercase line, no prefix, no trailing period, no body (e.g. `fixed a typo`, `added writings section`, `tweet fallback`).
- Never add a `Co-Authored-By` trailer or any other agent attribution to commits or pull requests.

## Design system

- Read [DESIGN.md](DESIGN.md) before building or styling anything. Use `components/ui` and the tokens in `app/globals.css`.
- After making changes, run `npm run lint`, `npm run typecheck`, and `npm run build`, and fix all errors. Lint enforces the design system through `@shadcn/lint`; do not silence it with `eslint-disable`.

## Office data

- `/office` data follows [docs/office-api.md](docs/office-api.md). Never commit raw paths, commands, prompts, or project names from the VPS; this repository is public.
