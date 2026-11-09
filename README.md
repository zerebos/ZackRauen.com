# [ZackRauen.com](https://zackrauen.com/)

This is the source for my portfolio and homepage. It is built using [Astro](https://astro.build) and automatically deploys using GitHub Actions.

## Development

```bash
bun install       # install dependencies
bun run dev       # start the dev server on http://localhost:6767
bun run build     # generate the static site into dist/
bun run preview   # preview the production build
bun run check     # type-check the project with astro check
```

## Project structure

- `src/pages` — routed pages (`index.astro` and the `projects/[slug].astro` deep-dive pages).
- `src/layouts` — shared `Base`, `Split`, and `Project` layouts.
- `src/components` — reusable `Nav`, `Footer`, and `Socials` components.
- `src/content/projects` — Markdown deep dives, loaded via an Astro content collection.
- `src/data` — TypeScript data sources for the resume, socials, about section, and GitHub stats.
- `src/scripts` — client-side TypeScript (nav/scroll behavior, hero typewriter, contact form).
- `src/lib` — build-time helpers, including a small file-based fetch cache for the GitHub API.
- `public/assets` — static assets served verbatim.

## GitHub data

The homepage and project pages pull live repository stats from the GitHub API at
build time. Set a `GITHUB_TOKEN` (in a `.env` file or the environment) to avoid
unauthenticated rate limits. Responses are cached under `.cache/` for a day.
