# WikiMovies — TMDB Movie Discovery

Version **1.0.0**.

WikiMovies is a production-oriented React movie discovery application built for the Frontend Technical Test. It uses React + TypeScript + Vite, Tailwind CSS, TanStack Query, Zustand, Vitest, React Testing Library and Playwright.

The original assignment requires a TMDB movie list, movie cards, title search, category filtering, movie details, a back action and pagination/load-more behavior. React Testing Library, Tailwind CSS and TypeScript are also part of the assignment's requirements/bonus. This implementation keeps those requirements and adds production-focused UX, accessibility, performance and testing.

## Architecture

The architecture follows the ideas from Eduardo Ottaviani's *A Definitive Guide to Front-end Clean Architecture — Second Edition*: keep the framework at the boundary and organize the application around four primary abstractions — **Entities, Services, Stores and Components**. The article also recommends a **vertical-slice/page-oriented structure**, where page-specific abstractions live together and reusable abstractions are promoted into `shared` only when they are genuinely shared.

Reference: urlA Definitive Guide to Front-end Clean Architecture — Second Editionhttps://eduardo-ottaviani.medium.com/a-definitive-guide-to-front-end-clean-architecture-3a62418becb4

The project deliberately does **not** force a traditional backend-style `controllers/use-cases/repositories` tree onto React. Instead, application behavior is expressed through page services and stores, while React and browser APIs remain at the outer presentation boundary.

### Dependency direction

```text
Browser / React / Router
          ↓
      Components
          ↓
        Stores
          ↓
       Services
          ↓
  HTTP / external APIs
          ↓
       Entities
```

The practical rule is that lower-level application abstractions do not import React components. External communication is isolated in services, state persistence/communication is isolated in stores, and components focus on presentation and user interaction.

### Folder structure

```text
src/
├── app/
│   ├── App.tsx                    # React composition, router and providers
│   └── App.test.tsx
│
├── pages/
│   └── movies/                    # Vertical slice for the movie domain/page
│       ├── entities/
│       │   ├── movie.ts            # Application entities / stable UI model
│       │   ├── movie.mapper.ts     # External JSON → application entities
│       │   └── movie.mapper.test.ts
│       │
│       ├── services/
│       │   ├── movie.service.ts    # Stateless TMDB-facing application service
│       │   ├── movie.service.test.ts
│       │   └── tmdb.types.ts       # External TMDB DTO contract
│       │
│       ├── stores/
│       │   ├── movie.store.ts      # Stateful client/UI state
│       │   └── movie.store.test.ts
│       │
│       └── components/
│           ├── MovieListPage.tsx
│           ├── MovieDetailPage.tsx
│           ├── useMovies.ts
│           ├── useDebouncedValue.ts
│           └── useInfiniteScroll.ts
│
├── shared/
│   ├── services/
│   │   └── http.ts                # Replaceable HTTP implementation boundary
│   └── components/
│       ├── atoms/
│       ├── molecules/
│       └── organisms/
│
├── lib/
│   ├── format.ts
│   └── utils.ts
│
├── styles/
│   └── global.css
│
└── test/
    └── setup.ts
```

## Why this structure

### Entities

Movie entities are the stable application representation used by the UI. TMDB's snake_case DTOs do not leak into React components. Mapping is centralized in `movie.mapper.ts`, so formatting and normalization do not have to be repeated throughout the UI.

### Services

`movie.service.ts` is stateless. It handles communication with TMDB and returns application entities rather than raw API responses. The HTTP client is isolated in `shared/services/http.ts`, making the HTTP implementation replaceable without changing page components.

The service currently covers:

- Now Playing
- Popular
- Top Rated
- Upcoming
- Movie search
- Movie details
- Credits
- Director information from crew data
- Videos / trailers
- Recommendations
- Similar movies
- Watch providers
- TMDB images

### Stores

Zustand is used only for small client-side UI state such as the selected category, search input and theme. Remote/server state is handled by TanStack Query because it provides caching, deduplication, request cancellation, stale-time control and pagination primitives.

This is an intentional adaptation of the Store concept for a modern React application: the store owns client state while TanStack Query owns remote state.

### Components

Components own presentation, user interaction and view updates. Atomic Design is applied at the reusable presentation boundary:

- **Atoms:** Button, Poster, Skeleton, Spinner
- **Molecules:** SearchBar, CategoryTabs, MovieCard
- **Organisms:** Header, MovieGrid, States, TrailerPlayer
- **Page components:** MovieListPage and MovieDetailPage

Page-specific components remain inside the `pages/movies` vertical slice. Truly reusable UI lives under `shared/components`.

## Core features

- TMDB movie discovery
- Now Playing / Popular / Top Rated / Upcoming
- Movie search
- Search autocomplete
- Debounced search requests
- Infinite scrolling using `IntersectionObserver`
- Movie details
- Cast and director
- Recommendations
- Similar movies
- Trailer playback
- Watch providers
- Loading / skeleton states
- Empty states
- Error states with retry
- Dark / light theme
- Responsive desktop / tablet / mobile UI
- Accessibility-focused interactions

## Performance decisions

- TanStack Query cache and stale-time strategy
- AbortSignal propagation to cancel obsolete API requests
- Debounced autocomplete requests
- `IntersectionObserver` instead of scroll listeners for infinite loading
- Lazy-loaded images
- Image fallbacks for missing/failed TMDB assets
- Poster-first trailer player before iframe loading
- Vite manual chunks for major vendor groups
- Memoized derived movie collections
- `useCallback` for stable pagination callbacks
- Reduced-motion support

## TMDB configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Then configure:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## Installation

This repository is configured for **pnpm**.

```bash
corepack enable
pnpm install
```

## Development

```bash
pnpm dev
```

The Vite development server runs on the default Vite port unless overridden.

## Unit tests

```bash
pnpm test
```

Watch mode:

```bash
pnpm test:watch
```

## Coverage

```bash
pnpm test:coverage
```

The Vitest configuration enforces a coverage gate above 95% for lines, functions and statements, with a high branch-coverage threshold as well.

## Playwright E2E

Install Chromium once:

```bash
pnpm exec playwright install chromium
```

Run the critical flows:

```bash
pnpm e2e
```

Interactive UI mode:

```bash
pnpm e2e:ui
```

The E2E suite covers critical flows such as browsing movies, opening movie details, search/autocomplete interaction, navigation and theme interaction.

## Quality checks

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:coverage
pnpm build
```

Combined check:

```bash
pnpm check
```

CI-style check including E2E:

```bash
pnpm ci
```

## Production build

```bash
pnpm build
pnpm preview
```

The production bundle is generated in `dist/`.

## Technical decisions

### Why Vite

Vite provides a fast development loop, native ESM-based development and a straightforward production build for a client-side React application.

### Why TanStack Query

TMDB data is remote state. TanStack Query gives the application caching, pagination, request cancellation and stale-data management without turning remote data into global UI state.

### Why Zustand

Only lightweight client/UI state is global: category, search input and theme. Zustand keeps this state explicit without introducing reducers and boilerplate that are not needed for this scope.

### Why vertical slices

Movie-specific entities, services, stores and page components are colocated. If the movie feature is removed or replaced, its dependencies are easier to locate. Shared code is promoted only when there is a real reuse opportunity.

### Why Atomic Design

Atomic Design is used as a presentation organization technique rather than as the architecture itself. Clean Architecture determines dependency boundaries; Atomic Design determines reusable UI composition.

### Why Tailwind

Tailwind provides a consistent utility layer for responsive layout, states, gradients, patterns and theme variants while keeping component styling close to the UI implementation.

### Why API aggregation

Movie details use TMDB's `append_to_response` capability to fetch related resources such as credits, videos, recommendations, similar movies and providers in one logical request, reducing client orchestration and unnecessary round trips.

## Application flow

```text
User interaction
      ↓
React component
      ↓
Zustand UI state / TanStack Query
      ↓
Movie service
      ↓
HTTP boundary
      ↓
TMDB API
      ↓
DTO
      ↓
Entity mapper
      ↓
Application entity
      ↓
React UI
```

For search specifically:

```text
Typing
  ↓
Debounce 350ms
  ↓
TanStack Query
  ↓
TMDB /search/movie
  ↓
Entity mapping
  ↓
Autocomplete suggestions
```

For infinite scrolling:

```text
Viewport reaches sentinel
          ↓
IntersectionObserver
          ↓
TanStack infinite query
          ↓
Next TMDB page
          ↓
Append entities to current list
```

## Version

`1.0.0`

## Internationalization

The UI uses `i18next` + `react-i18next`. English (`en`) is the default and Indonesian (`id`) is included as the first additional locale. The language switcher is intentionally small and lives in the shared header.

## Visual system

WikiMovies uses a cinematic dark gradient, a custom WikiMovies mark, soft motion, animated theme controls, a responsive layout and a short startup splash that yields to the application without blocking the browser after initialization.
