# Site Index (yuzhang-io.github.io)

This document is a **quick map of the repo**: routes → source files, plus key components, data, and assets.

## Routes (Astro pages)

- **`/`** → `src/pages/index.astro`
- **`/research`** → `src/pages/research.astro`
- **`/publications`** → `src/pages/publications.astro`
- **`/software`** → `src/pages/software.astro`
- **`/hiking`** → `src/pages/hiking.astro`

## Layouts

- **Base layout (SEO + header/nav + footer)**: `src/layouts/BaseLayout.astro`
  - Sets canonical URL, OG/Twitter tags, favicon, and the site-wide header nav.

## Components

- **Card**: `src/components/Card.astro`
  - Generic link “card” component (title/desc/tag).
- **FourteenerMap**: `src/components/FourteenerMap.astro`
  - Leaflet map + list for Colorado 14ers, driven by JSON in `public/data/`.
  - Loads Leaflet from CDN and uses Mapbox + other tile sources.

## Styles

- **Global styles**: `src/styles/global.css`
  - Tailwind import
  - BibBase overrides (hide logo/header/bibtex links; bold author name)

## Data (served from `public/`)

These are fetched at runtime by the hiking page / map component.

- `public/data/co-14ers.json`
- `public/data/my-14ers.json`
- `public/data/my-nh4k.json`

## Public assets (direct URLs)

Everything in `public/` is served at the same path (e.g. `public/img/logo.svg` → `/img/logo.svg`).

- **Favicon**: `public/favicon.svg` → `/favicon.svg`
- **Logo**: `public/img/logo.svg` → `/img/logo.svg`
- **OpenGraph images**: `public/og/og.png`, `public/og/og.webp` → `/og/og.png`, `/og/og.webp`
- **Homepage card images (PNG)**: `public/img/index/*` → `/img/index/*`
- **Featured images**: `public/img/featured/*` → `/img/featured/*`
- **Hiking gallery images**: `public/img/hiking/gallery/*` → `/img/hiking/gallery/*`
- **CV PDF**: `public/Yu_Zhang_CV.pdf` → `/Yu_Zhang_CV.pdf`

## Bundled assets (Astro-processed)

These live under `src/assets/` and are imported from `.astro` files (often via `astro:assets`).

- **Homepage icons (webp)**: `src/assets/img/index/*`
- **Research images (webp)**: `src/assets/img/research/*`
- **Software banners (webp)**: `src/assets/img/software/*`
- **Portrait**: `src/assets/img/portrait.jpg`

## Config / tooling

- **Astro config**: `astro.config.mjs` (site set to `https://yuzhang-io.github.io`)
- **Dependencies / scripts**: `package.json`
- **TypeScript config**: `tsconfig.json` (extends Astro strict)


