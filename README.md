# Portfolio — Rahul Narayanasamy

Personal portfolio site for **Rahul Narayanasamy**, a software engineer based in Bengaluru. Built with React, Vite, and GSAP — a cinematic, motion-led frontend with client-side routing and no backend.

## Features

- **Cinematic loader** — entry animation before the main site
- **Hero** — live Bengaluru time, weather (Open-Meteo), and year progress
- **GitHub contribution graph** — last 12 months via public API
- **Projects, skills & experience** — content driven from a single data file
- **Contact & connect** — mailto links and social profiles
- **Footer** — rotating dev quotes and visitor counter
- **Scroll animations** — GSAP + ScrollTrigger throughout

## Tech stack

| Layer | Tools |
|-------|-------|
| UI | React 19 |
| Build | Vite 8 |
| Motion | GSAP, ScrollTrigger |
| Lint | Oxlint |
| Fonts | JetBrains Mono (Google Fonts) |

## Project structure

```
src/
  components/   # UI sections (Hero, Nav, Projects, Footer, …)
  pages/        # Home, Experience
  data/         # content.js — edit copy, projects, skills here
  hooks/        # useSectionAnimations
public/         # Static assets (avatar, favicons, icons)
```

All portfolio copy, projects, and links live in `src/data/content.js`. Update that file to change what appears on the site.

## Getting started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Deployment

Build the static site and deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, etc.):

```bash
npm run build
```

`dist/` is gitignored — CI/CD should run `npm run build` on deploy rather than committing build output.

## External services

These public APIs are called at runtime (no API keys required):

- [Open-Meteo](https://open-meteo.com/) — weather
- [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api) — contribution graph
- [DummyJSON](https://dummyjson.com/) / [RealInspire](https://api.realinspire.xyz/) — footer quotes (with local fallbacks)
- [Abacus](https://abacus.jasoncameron.dev/) — visitor counter

## License

Private project. All rights reserved unless otherwise noted.
