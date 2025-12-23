# yuzhang-io.github.io

Personal website built with **Astro 5** + **Tailwind v4** (Vite plugin), deployed on **GitHub Pages**.

If you want a map of what lives where, see: `SITE_INDEX.md`.

## Development

```sh
npm run dev
```

Build / preview:

```sh
npm run build
npm run preview
```

## Where to edit content

- **Layout + nav + meta tags**: `src/layouts/BaseLayout.astro`
- **Homepage**: `src/pages/index.astro`
- **Research**: `src/pages/research.astro`
- **Publications**: `src/pages/publications.astro` (embeds BibBase)
- **Software**: `src/pages/software.astro`
- **Hiking**: `src/pages/hiking.astro` (Leaflet map + gallery)
- **Global CSS**: `src/styles/global.css`

## Assets (quick rules)

- **Public assets** (`public/`): served as-is at `/...` (e.g. `public/img/logo.svg` → `/img/logo.svg`)
- **Bundled assets** (`src/assets/`): processed by Astro (`astro:assets`) and referenced from `.astro` pages

