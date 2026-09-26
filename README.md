# Diego Pestana's Portfolio
Built using Next.js. Inspired by [@leerob](https://x.com/leeerob)

## Design system

See [DESIGN.md](DESIGN.md). `npm run lint` enforces it with [`@shadcn/lint`](https://github.com/shadcn-ui/lint).

## Office page

`/office` shows the VPS status and agent activity. The VPS pushes it to Upstash Redis and the site reads it with a read-only token. Set `OFFICE_DEMO=true` to replay the fixture in `app/office/demo.json` instead.

- Spec: [docs/office-api.md](docs/office-api.md)
- Rollout plan: [docs/office-api-plan.md](docs/office-api-plan.md)
