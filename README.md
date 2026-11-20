# Almanac

A date-driven discovery app. For any given date, Almanac assembles a multi-source
briefing — what happened in history, what the sky looked like, the weather, and who
was born — and lets you save the discoveries you find interesting.

> **Status:** this repository currently contains the **project foundation only** — the
> full tech stack, tooling, container setup, and app shell. The data sources, date
> navigation, and bookmark UI are built in subsequent increments (see
> [Roadmap](#roadmap)).

## Tech stack

| Area          | Choice                                   |
| ------------- | ---------------------------------------- |
| Framework     | React 19 (satisfies "React 18+")         |
| Language      | TypeScript (strict mode)                 |
| Build tool    | Vite (client-side rendered SPA)          |
| UI library    | MUI (Material UI) v9 (satisfies "v5+")   |
| Data fetching | TanStack Query (React Query)             |
| State         | Zustand (with `persist` middleware)      |
| Routing       | React Router                             |
| Lint / format | ESLint (flat config) + Prettier          |
| Container     | Docker / Podman (nginx-served build)     |

## Running the project

### With containers (recommended)

The app runs with a single command and works with both Docker and Podman:

```bash
docker compose up --build
# or
podman compose up --build
```

Then open <http://localhost:8080>.

The container does a multi-stage build (Node builds the SPA → nginx serves the static
output, with an SPA fallback so client-side routes resolve correctly).

### Local development

```bash
npm install
npm run dev            # http://localhost:5173
```

### Scripts

| Script                 | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                |
| `npm run build`        | Type-check (`tsc -b`) + production build|
| `npm run typecheck`    | Type-check only                         |
| `npm run lint`         | ESLint (zero errors expected)           |
| `npm run format`       | Prettier write                          |

## Environment variables

Almanac needs **no API keys or secrets**. Every data source is a free public API
callable directly from the browser:

- NASA APOD — `science.nasa.gov`'s public APOD feed (the documented
  `api.nasa.gov/planetary/apod` endpoint currently returns a placeholder logo instead
  of the image, so this project uses NASA's own `science.nasa.gov` APOD feed, which the
  brief's "you may add other freely accessible public APIs" clause allows).
- Wikipedia (On This Day + page summaries) and Open-Meteo (weather + geocoding) — also
  key-free.

There is nothing to configure and no `.env` to create.

## Key decisions

**Data fetching — TanStack Query.** The briefing pulls from several independent public
APIs per date. React Query gives per-source caching, loading/error states, retries and
request deduplication out of the box, which keeps each data source isolated and makes
partial failures (one API down, the rest fine) easy to render. A date's data is
effectively immutable once fetched, so `staleTime` is generous and refetch-on-focus is
off.

**State management — Zustand.** The only truly global, cross-session state is the
bookmark list. Zustand's `persist` middleware writes it to `localStorage` with almost no
boilerplate, satisfying the "persist across sessions" requirement. Server/remote state
lives in React Query, not the store — the two concerns stay separate.

**Routing — React Router.** Enables shareable, deep-linkable URLs (a selected date, the
bookmarks view) and real browser back/forward, which suits a navigation-heavy discovery
app better than ad-hoc state toggling.

**Styling — MUI + CSS Modules.** Most UI uses MUI components and its `sx`/theme system
for speed and consistency. The application shell (`AppLayout`) is deliberately styled
with **standard CSS via CSS Modules** (`AppLayout.module.css`) to satisfy the constraint
that at least one significant part avoids MUI's styling system, and to keep layout/
responsive rules in plain, portable CSS.

**Container — static build behind nginx.** For a CSR SPA, serving a pre-built bundle via
nginx is smaller and closer to production than shipping the dev server, with an SPA
fallback so refreshing a sub-route works.

## Roadmap

The following are intentionally **not** implemented yet (foundation phase):

- Data-source integrations: NASA APOD, Wikipedia "On This Day", Open-Meteo, Wikipedia
  Page Summary.
- Date navigation: previous/next day, date picker, default to today.
- Bookmark UI: save discoveries, browse and manage saved items.
- Responsive content layouts for the briefing.
- Optional: Vitest + React Testing Library tests.
