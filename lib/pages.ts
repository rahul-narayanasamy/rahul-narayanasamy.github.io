/** Every route, in reading order. Drives the nav, the home directory, the pager and the command menu. */
export const pages = [
  { href: "/", no: "00", title: "Index", eyebrow: "Home", blurb: "Start here.", primary: false },
  {
    href: "/about/",
    no: "01",
    title: "About",
    eyebrow: "Who I am",
    blurb: "The story so far — Syncfusion grids to EPAM products.",
    primary: true,
  },
  {
    href: "/projects/",
    no: "02",
    title: "Projects",
    eyebrow: "Selected work",
    blurb: "Client case studies, then Apogee, Vault, Signal & more.",
    primary: true,
  },
  {
    href: "/skills/",
    no: "03",
    title: "Skills",
    eyebrow: "What I work with",
    blurb: "React · TypeScript · GraphQL · GSAP · Node.js",
    primary: true,
  },
  {
    href: "/experience/",
    no: "04",
    title: "Experience",
    eyebrow: "Career history",
    blurb: "EPAM Systems & Syncfusion — the full career timeline.",
    primary: true,
  },
  {
    href: "/systems/",
    no: "05",
    title: "Systems",
    eyebrow: "System design",
    blurb: "How I draw a frontend platform, layer by layer.",
    primary: false,
  },
  {
    href: "/agents/",
    no: "06",
    title: "Agents",
    eyebrow: "AI · MCP",
    blurb: "One agent turn, traced end to end through an MCP server.",
    primary: false,
  },
  {
    href: "/blog/",
    no: "07",
    title: "Blog",
    eyebrow: "Writing · Medium",
    blurb: "Notes on AI agents, frontend craft, and lessons learned.",
    primary: false,
  },
  {
    href: "/resume/",
    no: "08",
    title: "Resume",
    eyebrow: "Curriculum vitae",
    blurb: "The two-page version, to read or download.",
    primary: false,
  },
  {
    href: "/contact/",
    no: "09",
    title: "Contact",
    eyebrow: "Let's talk",
    blurb: "rahulkishore227@gmail.com · Open to conversations",
    primary: false,
  },
] as const;

export type PageEntry = (typeof pages)[number];

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function pageFor(pathname: string): PageEntry | undefined {
  return pages.find((p) => norm(p.href) === norm(pathname));
}

export function neighbours(pathname: string) {
  const i = pages.findIndex((p) => norm(p.href) === norm(pathname));
  if (i < 0) return { prev: undefined, next: undefined };
  return { prev: pages[i - 1], next: pages[i + 1] ?? pages[0] };
}
