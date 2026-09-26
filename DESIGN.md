---
name: diegopestana-design-system
description: "Design, build, or change any page, component, or MDX writing on diegopestana.com. Use for new pages, new sections, new components, writing layouts, data displays on the office page, and any styling change. Covers tokens, type roles, components, page patterns, copy rules, and the lint policy that enforces them."
---

# Design diegopestana.com

A personal site that reads like a well-set notebook: one narrow column, Geist, near-monochrome ink on white, generous line height, and almost no decoration. Every new surface must look like it was always part of the site.

The rules below are enforced by `@shadcn/lint` (see [Enforcement](#enforcement)). Run `npm run lint` after every change and fix every error before you finish.

## Use this priority order

When requirements compete, protect them in this order:

1. The content and facts the owner supplied. Do not invent projects, numbers, dates, or quotes.
2. The tokens and components in this file. Reuse before you add.
3. Reading comfort: measure, line height, contrast, and rhythm.
4. The existing silhouette: single column, max width `max-w-2xl`, lowercase navigation, sentence-case headings.
5. Novelty. Only after everything above holds.

## Principles

- **Typography first.** Hierarchy comes from size, weight, and ink before borders, surfaces, or color.
- **Monochrome.** The only chromatic colors are `live` (a state) and `selection` (a browser affordance). Never use color for emphasis.
- **One column.** Every page lives in the same `max-w-2xl` column the layout provides. Grids only split that column into equal peers.
- **Quiet boxes.** A `Card` is a 1px `border` with `rounded-lg`. No shadows, no fills, no nested cards.
- **Stillness.** Motion is limited to color transitions on hover. Nothing animates on load or on scroll.
- **Components own their look.** Pages place components (margin, width, grid position). Pages never restyle them.

## Tokens

All tokens live in `app/globals.css` under `@theme`. Tailwind's default palette, type scale, weights, radii, shadows, blurs, and animations are removed (`--*: initial`), so anything off-system does not generate CSS and fails `no-unknown-classes`.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#ffffff` | Page canvas. The only background. |
| `foreground` | `#171717` | Headings, nav, links, strong text, stat values, data marks. |
| `body` | `#404040` | Reading text: paragraphs and list items. |
| `muted` | `#525252` | Metadata: dates, captions, card descriptions, labels, hover state for ink. |
| `subtle` | `#a3a3a3` | Link underlines, card border on hover. |
| `faint` | `#d4d4d4` | Bullet markers, offline status dot. |
| `border` | `#e5e5e5` | Card, code block, and image borders; meter and chart tracks. |
| `divider` | `#f5f5f5` | `Separator` and row dividers inside a card. |
| `surface` | `#fafafa` | Code blocks and inline code. Never a section background. |
| `selection` / `selection-foreground` | `#47a3f3` / `#fefefe` | Text selection only. |
| `live` | `#16a34a` | "Live" status dot. Always paired with a text label. |

Use tokens through Tailwind utilities (`text-muted`, `border-border`, `fill-foreground`). Never write hex values in components. There is no dark theme. If you add one, redefine these same tokens instead of adding `dark:` classes.

### Typography

Fonts: Geist Sans (`font-sans`, the default) and Geist Mono (`font-mono`), loaded through `geist/font` in `app/layout.tsx`.

| Role | Classes | Where |
| --- | --- | --- |
| Page title | `Heading level={1}`: `text-2xl font-medium tracking-tighter` | One per page. |
| Section heading | `Heading level={2}`: `text-xl font-medium tracking-tighter` | Page sections, MDX `##`. |
| Subsection / card title | `Heading level={3}`, `CardTitle`: `text-base font-medium tracking-tight` | MDX `###`, card titles. |
| Body | `Text`: `text-base leading-7 text-body` | Paragraphs, list items. |
| Metadata | `Text variant="muted"`, `CardDescription`: `text-sm text-muted` | Dates, captions, descriptions, labels. |
| Stat value | `Stat`: `text-xl font-medium tabular-nums` | Numbers on the office page. |
| Mono | `font-mono text-sm` | Code, agent names, obfuscated paths. Only the identifier, never a whole sentence. |

The type scale is `sm`, `base`, `xl`, `2xl`. The weights are `normal` and `medium`. Tracking is `tight` and `tighter`. Nothing else exists. Bold is `Strong` (`font-medium text-foreground`), not `font-bold`.

### Spacing and rhythm

Use the default 4px spacing scale. Give every gap one owner: the parent sets `gap-*`; children do not add competing margins.

- Heading to its content: `gap-4` (sections) or `gap-6` (page title to intro).
- Between page sections: `gap-12` on the page `section`.
- Card grids: `grid gap-4 sm:grid-cols-3`.
- Inside a card: the `Card` owns `p-4 gap-2`. Add `pt-2` / `pt-4` on a plain wrapper for a larger internal group break.
- MDX flow is the exception, because Markdown has no parent to own gaps. The margins live in `mdx-components.tsx` and must not be changed per post.

### Shape

One radius: `rounded-lg` (8px), for cards, images, code blocks, and inline code. `rounded-full` is reserved for status dots and meters. Borders are 1px `border-border`; the only thicker rule is the 4px blockquote bar.

## Layout

`app/layout.tsx` owns the shell: `mx-auto mt-8 mb-40 max-w-2xl px-4`, then the `Navbar`, then the page. A page returns one `<section>` that stacks its groups with `flex flex-col gap-12` (or `gap-8` on dense text pages).

```tsx
<section className="flex flex-col gap-12">
  <div className="flex flex-col gap-6">
    <Heading level={1}>Office</Heading>
    <Text>One or two sentences that orient the reader.</Text>
  </div>
  <div className="flex flex-col gap-4">
    <Heading level={2}>Skills collection</Heading>
    <div className="grid gap-4 sm:grid-cols-3">...</div>
  </div>
</section>
```

Pages must fit at 360px with no horizontal scroll. Grids collapse to one column below `sm`.

## Components

Everything in `components/ui` is the design system. Import from `@/components/ui/*`. Pass `className` only for layout (margin, width, flex/grid placement, `shrink-0`, `mt-auto`).

| Component | Use it for | Notes |
| --- | --- | --- |
| `Heading` | Every heading. `level` 1, 2, or 3 picks the role and the tag. | Do not use raw `h1`-`h3`. |
| `Text` | Paragraphs. `variant="body"` (default) or `"muted"`. | Renders a `p`. |
| `Strong` | Emphasis inside text. | Scarce: key terms only. |
| `TextLink` | Inline links. Internal hrefs use `next/link`; external ones open in a new tab. | Underlined with `decoration-subtle`, darkens on hover. |
| `List`, `OrderedList`, `ListItem` | Bullet and numbered lists. | The home intro and research summary are bullets by design. |
| `Separator` | A quiet break between a summary and a ledger. | Not between every section. Spacing usually suffices. |
| `Card`, `CardLink` | A peer in a grid: projects, writings, skills, office panels. `CardLink` when the whole card navigates. | Never nest cards or put a card inside prose. |
| `CardTitle`, `CardDescription` | The title and metadata lines inside a card. | Push trailing metadata (dates) down with `className="mt-auto"`. |
| `Stat` | A labeled number, with an optional `Meter` as its child. | Peers share one grid row. |
| `Meter` | A 0-100 percentage bar drawn in SVG. | Always inside a `Stat` with a text value. |
| `IconLink` + icons | Icon-only external links (nav profiles). | `label` is required; it sets `aria-label` and `title`. |

Icons come from Remix Icon: 24px grid, 18px rendered, `fill="currentColor"`. Add new ones to `components/ui/icons.tsx` in the same style. Icons appear only where the target is universally recognized (social profiles, email, resume, info). Never decorate headings or cards with icons.

### Adding or changing a component

1. Check whether an existing component or variant already covers the need.
2. If not, add the variant to the component file as a keyed object (see `Heading`'s `levels` or `Text`'s `variants`) so the linter can suggest it by name.
3. Document the new variant or component in this file in the same change.

## Page patterns

### Navigation

Left: lowercase text links `home`, `research`, `office`. Right: `IconLink`s for LinkedIn, GitHub, X, email, and resume. No active-state styling, no background, no border.

### Home

`Hey, I'm Diego` (h1), a four-item bullet list, then `Projects` and `Writings` as 3-column `CardLink` grids. Writings show the latest three posts; an `All writings` link appears only when more exist.

### Research

h1, a bullet list of research areas with one `Strong` term per idea, a `Separator`, then `Publications` as a list of `TextLink` title + muted type, organization, and year.

### Writing (MDX)

`app/writings/[slug]/page.tsx` renders the title (h1), the date (`Text variant="muted"`), then the MDX body. `mdx-components.tsx` maps every Markdown element to the system:

| Markdown | Renders | Spacing |
| --- | --- | --- |
| `## Title` | `Heading level={2}` | `mt-10 mb-4` |
| `### Subtitle` | `Heading level={3}` | `mt-8 mb-3` |
| paragraph | `Text` | `my-5` |
| `![alt](/path "caption")` | `next/image`, full column width, `rounded-lg` with border, optional muted caption from the title | `my-8` |
| `-` / `1.` lists | `List` / `OrderedList` | `my-5` |
| `> quote` | 4px `border` bar, italic, `foreground` ink | `my-6` |
| code fence / `` `code` `` | `font-mono text-sm` on `surface` with a `border` | `my-6` |
| `---` | `Separator` | `my-10` |
| `<Tweet id="..." />` | `react-tweet` embed, centered, light theme | `my-6` |

Put post images in `public/writings/<slug>/`. Never style inside a post with JSX `className`; if a post needs a new element, add it to `mdx-components.tsx` and this table.

### Office (live data)

- A status line sits above the panels: a `size-2` dot (`bg-live` only when live, `bg-faint` for demo and offline) plus a sentence that says the state in words. Demo data is always labeled as a demo.
- Each data group is one `Card`: `Health`, `Realtime agent view`, `Monthly token consumption`. Card header row: `CardTitle` left, a secondary control or period label right.
- Every panel has an empty state written as a plain `CardDescription` sentence ("No usage recorded yet."). Never render zeros for missing data.
- Anything from the agents that could reveal private work (paths, commands, prompts, project names) is obfuscated on the VPS before it is stored, and again on the server before it reaches the browser. See `docs/office-api.md`.
- The agent list shows working agents first, then by recency, with a "N of M working" count in the header.
- Relative times are computed from the snapshot's own timestamps, so the server and client render the same text.

### Charts

- Single series, `fill-foreground` bars on a `stroke-border` baseline, no legend (the card title names the series), no gridlines.
- 2px top radius on bars; the bottom sits flush on the baseline.
- Each bar has a native `<title>` tooltip, and a `sr-only` table repeats the data.
- Axis labels are the first and last dates only, in `text-sm text-muted`.
- Draw with SVG attributes, never inline `style`. Use percentage `x`/`width` for fluid widths.

## Copy

- Navigation labels are lowercase. Headings and body copy use sentence case.
- Short, concrete, first person. Say what something is, not how great it is.
- No em dashes, no emojis, no all-caps eyebrows or decorative numbering.
- Dates in metadata read `April 2026` or `Sep 1`; ranges use an en dash (`Aug 2023 – Jul 2025`).

## Accessibility

- One `h1` per page and ordered heading levels (`Heading` makes this easy).
- Icon-only links need `label`. Decorative SVGs are `aria-hidden`.
- Status is never color alone: the live dot always has text next to it.
- Interactive controls are native (`button`, `a`) and show `aria-expanded` when they toggle content.
- Hit areas are at least 28px (`IconLink` is `size-7`, `size-8` from `sm`).

## Reject these

- Raw palette classes (`text-neutral-500`, `bg-blue-50`) or hex values in components.
- Arbitrary values (`p-[13px]`, `text-[15px]`, `w-[312px]`) and inline `style`.
- New font sizes, weights, radii, shadows, gradients, blurs, or animations.
- Restyling a design-system component from a page (`<CardTitle className="text-xl">`).
- Cards inside cards, borders used to fix weak hierarchy, filled section backgrounds.
- Icons as decoration, pills or badges for ordinary metadata.
- Tiny muted prose to squeeze content in. Rewrite instead.

## Enforcement

`eslint.config.mjs` enables every `@shadcn/lint` rule on `.ts`/`.tsx` files:

| Rule | Catches |
| --- | --- |
| `shadcn/no-restyle` | Appearance classes passed to `components/ui` components. Only layout is allowed. |
| `shadcn/no-raw-colors` | Any color that is not a token from `app/globals.css`. |
| `shadcn/no-arbitrary-values` | Bracket values such as `p-[13px]`. |
| `shadcn/no-inline-styles` | `style={{ ... }}` and `<style>` elements. |
| `shadcn/no-unknown-classes` | Classes the trimmed theme cannot generate (`text-lg`, `font-bold`, `rounded-xl`, `shadow-md`). |
| `shadcn/require-static-classes` | Class values the linter cannot read on a component. |

`no-restyle` and `require-static-classes` are off inside `components/ui/**`, because those files define the appearance. The linter does not see CSS in `app/globals.css`, so review token changes there as design decisions.

Workflow for any agent:

1. Read this file.
2. Build with the components and tokens above.
3. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
4. Fix every error. Do not silence rules with `eslint-disable`. If a rule blocks a legitimate design need, change the system (token, variant, or component) and document it here.
