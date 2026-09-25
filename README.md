# Diego Pestana's Portfolio
Built using Next.js. Inspired by [@leerob](https://x.com/leeerob)

## Design system

See [DESIGN.md](DESIGN.md). `npm run lint` enforces it with [`@shadcn/lint`](https://github.com/shadcn-ui/lint).

## Office page

`/office` reads live data from the VPS. Set these environment variables:

- `OFFICE_API_URL`: a JSON endpoint that returns an `OfficeSnapshot` (see `app/office/snapshot.ts`)
- `OFFICE_API_TOKEN`: sent as `Authorization: Bearer <token>`

Without them the page renders its offline state.
