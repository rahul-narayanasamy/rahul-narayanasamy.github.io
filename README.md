# rahul-narayanasamy.github.io

Personal portfolio of Rahul Narayanasamy, Software Engineer, Bengaluru.
**Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules**, statically exported for GitHub Pages.

The visual language: JetBrains Mono everywhere, warm black with one red,
film grain + scanlines + vignette, a terminal boot loader, and numbered pages with outlined indices.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Pages

| No. | Route | What's there |
| --- | --- | --- |
| 00 | `/` | Hero (live IST clock, weather, year progress), current role, site directory, GitHub graph, contact |
| 01 | `/about/` | Story, principles, journey timeline, certifications |
| 02 | `/projects/` | Client case studies (accordion + flow schematic) and side projects (generated posters) |
| 03 | `/skills/` | Expandable skill rows, toolbox |
| 04 | `/experience/` | EPAM and Syncfusion, with each client engagement |
| 05 | `/systems/` | Interactive frontend architecture diagram |
| 06 | `/agents/` | Playable sequence diagram of one MCP tool-using turn |
| 07 | `/blog/` | Medium articles |
| 08 | `/resume/` | Inline PDF, open / download |
| 09 | `/contact/` | Click-to-copy email, contact cards, socials |

The order lives in `lib/pages.ts`; nav, directory, pager and ⌘K menu all read from it.

## Edit content

All copy lives in typed files under `content/`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, links, intro, story, journey, principles, footer quotes |
| `projects.ts` | Side projects (GitHub) and anonymised client case studies |
| `experience.ts` | Roles, engagements, education |
| `skills.ts` | Skill rows, toolbox, home ticker |
| `system.ts` | Architecture layers, design questions, agent sequence |
| `writing.ts` | Medium articles, certifications |

`public/avatar.png` and `public/resume.pdf` are the photo and resume.

## Interactions

- Boot loader runs once per browser session; any key or click skips it; off under reduced motion
- Route changes play a red curtain naming the page you're entering
- `[` / `]` previous / next page · `⌘K`, `Ctrl K` or `/` command menu · `T` toggles light / dark · `P` cycles palette
- Three palettes × two modes: **Mono** (black & white, the default), **Ember** (red) and **Moss** (sage green on warm black / parchment), each in dark and light. `P` cycles palettes; ⌘K can pick one directly. Tokens live in `app/globals.css`; the choice is remembered per browser

## Deploy

Push to `main` of the `rahul-narayanasamy.github.io` repo. `.github/workflows/deploy.yml` builds and
publishes `./out`. Set **Settings → Pages → Source** to **GitHub Actions** once.

## Home portrait

The hero portrait (`components/home/AsciiPortrait.tsx`) is generated in the browser from `public/avatar.png`:
the photo is sampled into ~3,000 text characters that spiral in when the page opens and swirl away from the
cursor. Colours come from the active theme's CSS variables, and light themes get a pen-drawing version
(dense hair and glasses, bare skin) while dark themes get a glowing one. The animation loop sleeps when
nothing is moving and is skipped under `prefers-reduced-motion`.
