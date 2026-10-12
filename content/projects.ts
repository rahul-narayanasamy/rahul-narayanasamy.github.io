import type { CaseStudy, SideProject } from "./types";

const gh = (repo = "") => `https://github.com/rahul-narayanasamy${repo ? `/${repo}` : ""}`;

/** Personal builds, all public on GitHub. */
export const sideProjects: SideProject[] = [
  {
    id: "apogee",
    title: "Apogee",
    kind: "Motion design",
    year: "2026",
    summary:
      "A scroll-driven GSAP landing built for the CodeTV × Webflow Cloud hackathon. Atmosphere, pacing, and type as the product.",
    stack: ["GSAP", "ScrollTrigger", "Webflow Cloud", "TypeScript"],
    href: gh("apogee-gsap-landing"),
    motif: "orbit",
    tone: "red",
  },
  {
    id: "vault",
    title: "Vault",
    kind: "Full-stack app",
    year: "2026",
    summary:
      "Full-stack expense tracker with auth, transactions, analytics, and budgets — Next.js, Clerk, Prisma, and Supabase.",
    stack: ["Next.js", "Prisma", "Clerk", "Supabase"],
    href: gh("vault-expense-tracker"),
    motif: "ledger",
    tone: "steel",
  },
  {
    id: "terminal",
    title: "Terminal Portfolio",
    kind: "Terminal UI",
    year: "2026",
    summary:
      "Interactive terminal-style portfolio — explore projects, skills, and contact through typed commands and shell output.",
    stack: ["Next.js", "TypeScript", "Terminal UI", "Tailwind CSS"],
    href: gh("terminal-portfolio"),
    motif: "terminal",
    tone: "green",
  },
  {
    id: "markdown",
    title: "Markdown Editor",
    kind: "Developer tool",
    year: "2026",
    summary:
      "Browser-based markdown editor with live preview, autosave, and export — CodeMirror 6, GFM rendering, local persistence.",
    stack: ["React", "CodeMirror", "Vite", "TypeScript"],
    href: gh("markdown-editor"),
    motif: "split",
    tone: "amber",
  },
  {
    id: "signal",
    title: "Signal",
    kind: "AI pipeline",
    year: "2026",
    summary:
      "Local-first pipeline that turns Hacker News and RSS into high-signal developer posts — Groq, Gemini, or Ollama.",
    stack: ["Python", "LLMs", "Streamlit", "RSS"],
    href: gh(),
    motif: "signal",
    tone: "red",
  },
  {
    id: "atmosphere",
    title: "Atmosphere",
    kind: "Frontend app",
    year: "2025",
    summary:
      "Next.js weather surface focused on hierarchy and calm — forecast as typography, not a widget dump.",
    stack: ["Next.js", "Weather API", "Tailwind CSS"],
    href: gh("weather-app-nextjs"),
    motif: "isobar",
    tone: "steel",
  },
  {
    id: "grid-systems",
    title: "Grid Systems",
    kind: "Enterprise UI",
    year: "2018–22",
    summary:
      "Years of grid, template, and editing work at Syncfusion — UI that has to be correct for millions of cells.",
    stack: ["Blazor", "EJ2", "C#", "Data grids"],
    href: gh("blazor-wasm-gantt-grid-poc"),
    motif: "grid",
    tone: "amber",
  },
];

// Client names are intentionally omitted. Domains describe the shape of each engagement.
export const caseStudies: CaseStudy[] = [
  {
    id: "schema-engine",
    title: "Schema-driven transaction engine",
    domain: "Insurance technology platform",
    period: "Feb 2025 – Aug 2026",
    role: "Feature owner · rollout · production support",
    summary:
      "A real-time transaction and case-management application whose workflows are configurable: new business processes are onboarded as JSON Schema rather than hand-built screens.",
    problem:
      "Every new business process needed its own transaction screens, validations and rollout, and the rules changed often.",
    approach: [
      "Schema-based workflows rendered with RJSF.",
      "Configurable transaction screens and custom widgets with typed contracts.",
      "Business-rule validation kept in the configuration layer, not in components.",
    ],
    outcome:
      "New flows move from requirement analysis to production through configuration. I also lead UAT, incident resolution and client-specific tickets for them.",
    flow: [
      { label: "JSON Schema" },
      { label: "UI Schema" },
      { label: "RJSF renderer", focus: true },
      { label: "Rule validators", focus: true },
      { label: "Transaction API" },
    ],
    stack: ["React", "TypeScript", "RJSF", "JSON Schema"],
  },
  {
    id: "cms-migration",
    title: "CMS → AEM component migration",
    domain: "Global financial-data provider",
    period: "Jun 2024 – Jan 2025",
    role: "UI component engineer",
    summary:
      "Reusable React components integrated into Adobe Experience Manager, moving two separate CMS platforms onto one.",
    problem:
      "Two CMS platforms with their own markup and behaviour had to land on AEM without breaking pages for readers on any device.",
    approach: [
      "Reusable React components mapped to AEM authoring.",
      "Integration with the AEM framework alongside backend developers.",
      "Responsive, cross-browser behaviour verified per component.",
    ],
    outcome:
      "Components rendered consistently across devices and browsers, and integration bugs were fixed inside the components rather than patched page by page.",
    flow: [
      { label: "AEM authoring" },
      { label: "Content model" },
      { label: "React component", focus: true },
      { label: "Rendered page" },
    ],
    stack: ["React", "AEM", "JavaScript", "CSS"],
  },
  {
    id: "trade-automation",
    title: "Trade compliance portal",
    domain: "Global trade compliance platform",
    period: "Aug 2022 – Apr 2024",
    role: "Frontend engineer",
    summary:
      "Reusable UI for tariff code search, trade lane comparison and a product catalog, built against API contracts agreed with BFF and backend teams before the screens existed.",
    problem:
      "A complex trade domain, several teams, and a quality bar measured by coverage, Sonar and Sigrid scores.",
    approach: [
      "Shared component set for search, comparison and catalog screens, with real-time validation.",
      "API contracts defined with BFF and backend teams up front.",
      "Unit tests shipped with every feature.",
    ],
    outcome: "Coverage held at 85% or higher, fewer Sonar code smells, and a better Sigrid maintainability score.",
    flow: [
      { label: "UI components", focus: true },
      { label: "API contract", focus: true },
      { label: "BFF" },
      { label: "Trade services" },
    ],
    stack: ["React", "TypeScript", "BFF", "Unit testing", "SonarQube"],
  },
  {
    id: "datagrid",
    title: "Enterprise DataGrid",
    domain: "Syncfusion UI component library",
    period: "Apr 2018 – May 2022",
    role: "Senior software engineer",
    summary:
      "The DataGrid, DataManager and Pager web components in a commercial UI library used by developers building data-heavy applications.",
    problem:
      "A grid used by thousands of external developers in combinations no one can predict, where every release has to stay stable.",
    approach: [
      "DataManager for querying local and remote data sources.",
      "Grid rendering kept separate from the data layer.",
      "Pager built as an independent, composable component.",
    ],
    outcome: "Customer-requested features shipped release after release, with customer bugs triaged and fixed through support.",
    flow: [
      { label: "Data source" },
      { label: "DataManager", focus: true },
      { label: "Grid", focus: true },
      { label: "Pager", focus: true },
    ],
    stack: ["JavaScript", "TypeScript", "Web components"],
  },
];
