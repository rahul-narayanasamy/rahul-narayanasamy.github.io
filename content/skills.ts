import type { Skill } from "./types";

export const skills: Skill[] = [
  {
    name: "TypeScript / JavaScript",
    as: "As primary weapon",
    usedFor: "Eight years of it — props that make misuse a compile error, and a commercial component library before that.",
    seenIn: ["Every EPAM engagement", "Syncfusion EJ2", "Vault", "Markdown Editor"],
  },
  {
    name: "React & Next.js",
    as: "As daily driver",
    usedFor: "Component architecture, routing, server and static rendering — including this site.",
    seenIn: ["Insurance platform", "AEM migration", "Vault", "Atmosphere"],
  },
  {
    name: "GraphQL & Node.js",
    as: "As data plumbing",
    usedFor: "BFF work, tooling, API contracts agreed before the UI exists, and MCP servers.",
    seenIn: ["Trade automation", "Agent experiments"],
  },
  {
    name: "Tailwind CSS & Framer Motion",
    as: "As interface craft",
    usedFor: "Utility-first styling on product teams, and motion that explains state instead of decorating it.",
    seenIn: ["Terminal Portfolio", "Atmosphere"],
  },
  {
    name: "GSAP & ScrollTrigger",
    as: "As special effects",
    usedFor: "Scroll-driven pacing where the motion is the product.",
    seenIn: ["Apogee"],
  },
  {
    name: "Prisma & Supabase",
    as: "As records keeper",
    usedFor: "Typed data access and hosted Postgres for full-stack side projects.",
    seenIn: ["Vault"],
  },
  {
    name: "Blazor & C#",
    as: "As enterprise sidearm",
    usedFor: "Grid and Gantt components for the .NET side of a commercial UI library.",
    seenIn: ["Grid Systems", "Syncfusion"],
  },
  {
    name: "PostgreSQL",
    as: "As source of truth",
    usedFor: "Relational data with one owner per fact — most bugs I've fixed came from two.",
    seenIn: ["Vault"],
  },
  {
    name: "System design",
    as: "As the blueprint",
    usedFor: "Rendering strategy, caching layers, BFF boundaries and the team lines that shape them.",
    seenIn: ["Insurance platform", "Trade automation"],
  },
  {
    name: "CI/CD & testing",
    as: "As extraction protocol",
    usedFor: "Coverage held at 85%+, Sonar and Sigrid quality gates, and pipelines that ship on green.",
    seenIn: ["Trade automation", "GitHub Actions"],
  },
];

export const toolbox = [
  "Vite",
  "Tailwind",
  "CodeMirror",
  "Streamlit",
  "Clerk",
  "Jest",
  "React Testing Library",
  "Playwright",
  "GitHub Actions",
  "Figma",
  "RJSF",
  "AEM",
  "TanStack Query",
  "Redux Toolkit",
  "Claude · MCP",
  "Cursor",
  "Postman",
  "Sonar",
] as const;

/** Glyphs for the scrolling tech ticker on the home page. */
export const ticker = ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "GSAP", "C#", "MCP"] as const;
