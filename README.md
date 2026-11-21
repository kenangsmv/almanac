# Almanac

A date-driven discovery app. For any given date, Almanac assembles a multi-source
briefing — what happened in history, what the sky looked like, and the weather — and
lets you save the discoveries you find interesting.

## Features

- **Date navigation** — defaults to today; step to the previous/next day or jump to any
  date with the picker. The selected date lives in the URL (`?date=YYYY-MM-DD`), so views
  are shareable and survive a refresh.
- **Multi-source briefing** — four public APIs. Three drive the panels: NASA APOD
  (astronomy picture + explanation), Wikipedia On This Day (historical events, births,
  deaths), and Open-Meteo (historical/forecast weather). A history item opens an in-app
  rich summary (Wikipedia Page Summary) in a modal, so you can read about a person or
  event without leaving the app.
- **Bookmarks** — save individual discoveries (an event, an image, or a person from the
  summary modal); they persist across sessions in `localStorage`. A dedicated view groups
  and manages saved items.
- **Responsive** — the layout adapts from mobile to desktop; on small screens the header
  nav collapses into a right-side drawer and the date briefing recenters.

## Running the project

### With containers (recommended)

A single command builds and serves the app, verified on both Docker and Podman:

```bash
docker compose up --build
# or
podman compose up --build
```

Then open <http://localhost:8080>.

The image is a multi-stage build: Node compiles the SPA, then nginx serves the static
output with an SPA fallback so client-side routes resolve on refresh. No API keys or
secrets are required, so it runs straight from a clean clone.

### Local development

```bash
npm install
npm run dev            # http://localhost:5173
```

### Scripts

| Script                | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `npm run dev`         | Vite dev server with HMR                  |
| `npm run build`       | Type-check (`tsc -b`) + production build  |
| `npm run typecheck`   | Type-check only                           |
| `npm run lint`        | ESLint (zero errors expected)             |
| `npm run format`      | Prettier write                            |
| `npm test`            | Vitest run                                |

## Tech stack

| Area          | Choice                                   |
| ------------- | ---------------------------------------- |
| Framework     | React 19 (satisfies "React 18+")         |
| Language      | TypeScript, strict mode                  |
| Build tool    | Vite (client-side rendered SPA)          |
| UI library    | MUI (Material UI) v9 (satisfies "v5+")   |
| Data fetching | TanStack Query (React Query)             |
| State         | Zustand (`persist` middleware)           |
| Routing       | React Router                             |
| Testing       | Vitest + React Testing Library + MSW     |
| Lint / format | ESLint (flat config) + Prettier          |
| Container     | Docker / Podman (nginx-served build)     |

## Environment variables

Almanac needs **no API keys or secrets**. Every data source is a free public API
callable directly from the browser:

- **NASA APOD** — the documented `api.nasa.gov/planetary/apod` endpoint (with `DEMO_KEY`)
  did not return real data for our requests — only a placeholder image rather than the
  actual picture for the date — so this project uses NASA's own key-free `science.nasa.gov`
  APOD feed instead (the brief's "you may add other freely accessible public APIs" clause).
  It serves the real image and explanation, needs no personal key, and leaves nothing to
  rate-limit for the reviewer.
- **Wikipedia** (On This Day + Page Summary) and **Open-Meteo** (weather + geocoding) are
  also key-free.

There is nothing to configure and no `.env` to create.

## Architecture

```
src/
  api/         pure fetch functions, framework-free: fetchJson + one adapter per source
  lib/         framework-free helpers (date math, HTML stripping)
  store/        Zustand bookmarks store (persisted to localStorage)
  features/     feature-scoped UI + hooks (briefing, bookmarks, date, detail, home)
  components/   shared presentational components (AsyncState, layout, nav)
  pages/        route entry points
  styles/       global.css — design tokens (:root custom properties) + base styles
```

The `api/` and `lib/` layers know nothing about React or React Query — the hooks *use*
them as query functions. Keeping them framework-free means the data mapping and the
error model can be unit-tested as plain functions, without rendering anything.

## Key decisions

**APIs.** All four suggested sources are integrated. Three drive the briefing panels —
NASA APOD, Wikipedia On This Day, and Open-Meteo — chosen because they cover genuinely
different data shapes (a single media item, a large grouped event feed, and a numeric
time series), which keeps the adapter layer honest rather than repetitive. The fourth,
Wikipedia Page Summary, powers an in-app drill-down: opening a history item fetches
`page/summary/{title}` on demand and renders the rich extract in a modal, so the list
payload stays light and the full summary loads only when asked for.

**Data fetching — React Query.** Each date pulls from several independent APIs. React
Query provides per-source caching, loading/error state, retries and request
deduplication out of the box, so one source failing doesn't take down the others
(partial-failure isolation). A date's data is effectively immutable once fetched, so
`staleTime` is generous and refetch-on-focus is off.

**Loading / error / empty states.** A single `AsyncState` component switches over a
query's state: pending → a loading node, success → content, empty → a neutral message.
Errors carry a typed `AlmanacError` with a `kind` (`network` / `not-found` / `http`) and
the `source` that failed, so a 404 from one API renders as "no data for this date"
rather than an alarming error, while the other panels keep working.

**Styling — MUI for interactions, CSS Modules for everything else.** MUI is scoped to the
interactive components where it earns its keep: `Button`, `Chip`, `Autocomplete` (city
search), `DateCalendar` (date picker), `Dialog`/`Modal`, `IconButton`, `Link`, `Skeleton`
and `Tabs`. All layout, typography, cards and page chrome are plain semantic HTML styled
with **CSS Modules** — the app shell, hero, date briefing, history list, weather and sky
panels, bookmarks and the mobile drawer. Design tokens (colour, a type and spacing scale,
radii, shadows, motion) live as `:root` CSS custom properties in `src/styles/global.css`,
so every module reads `var(--…)` and nothing is hard-coded twice. `theme.ts` is slimmed to
the palette, typography and shape the remaining MUI components need to stay on-theme. Most
of the UI is therefore standard CSS Modules, with MUI reserved for stateful widgets.

**State & routing.** Bookmarks are the only cross-session global state; Zustand's
`persist` middleware writes them to `localStorage` with almost no boilerplate. Server
state stays in React Query, not the store. React Router keeps the selected date and the
bookmarks view in shareable, deep-linkable URLs.

**Tradeoffs.** There is no runtime schema validation (e.g. zod): adapters use
`interface` + a cast at the fetch boundary, so an unexpected API shape would surface at
use rather than at parse. For small, stable public APIs this was judged a better trade
than the extra dependency. Bookmarks use `localStorage`, not IndexedDB — the data is
small and flat, and "load all and filter" is fine at this scale.

**With more time.** On the engineering side I'd extend adapter test coverage to Open-Meteo
and Wikipedia (the archive-vs-forecast threshold and the parallel-array-to-object transform
carry real logic; today `http.ts` and `nasa.ts` stand in as the representative API-layer
tests), and give the mobile drawer a full focus trap and an exit animation. On the product
side there is a longer list of discovery features I'd pursue — see _Ideas for later_ below.

## Testing

Tests run on Vitest with React Testing Library and MSW (`npm test`). Coverage is
deliberately selective rather than exhaustive — 71 tests across the layers that carry
real logic: pure helpers (date math, HTML stripping, bookmark grouping, weather codes),
the API error model and mapping (via mocked network), the persisted store and its hooks,
and a few behaviour-level component tests (the async state switch, the bookmark toggle,
the bookmarks view). Purely presentational MUI wrappers are intentionally left untested.

## Ideas for later

Features I'd add to deepen Almanac as a discovery product, all within the same
"free, key-free, called straight from the browser" constraint:

**Richer briefing — more date/location signals.**

- Moon phase for the date — a pure local calculation (no API), sitting naturally in the
  sky panel.
- Sunrise/sunset and day length for the selected city (sunrise-sunset.org, key-free).
- Public holidays on the date (Nager.Date) — which countries mark the day.
- "On this day" in culture — albums released (MusicBrainz) or an artwork (Met Museum).

**Personalization.**

- Save personal dates (birthday, anniversary) for one-tap access.
- "On your birthday in history" — a personalized mini-almanac.

**Discovery & navigation.**

- A command palette (⌘K) to jump to a date, search a city, or hop to a section.
- Compare two dates side by side (the history/sky/weather of 1990 vs 2026).
- A calendar heatmap of how eventful each day is, as a way to browse.

**Sharing & media.**

- A downloadable "day card" image (canvas) of the briefing, with Web Share on mobile.
- A media lightbox and inline APOD video playback.

**Product quality.**

- A light theme — the `:root` design-token architecture already makes this mostly a second
  token set plus a toggle.
- Keyboard navigation (←/→ to change day, `t` for today) and `prefers-reduced-motion`
  support.
- An error boundary with per-panel retry (React Query `refetch`), and PWA/offline caching.
