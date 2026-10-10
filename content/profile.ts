export const profile = {
  name: "Rahul Narayanasamy",
  first: "Rahul",
  last: "Narayanasamy",
  initials: "RN",
  role: "Software Engineer",
  location: "Bengaluru, IN",
  coords: { lat: 12.9716, lon: 77.5946 },
  timezone: "Asia/Kolkata",
  experience: "8+",
  email: "rahulkishore227@gmail.com",
  github: "https://github.com/rahul-narayanasamy",
  githubHandle: "rahul-narayanasamy",
  linkedin: "https://www.linkedin.com/in/rahul-narayanasamy-51ab41143",
  medium: "https://medium.com/@rahulkishore227",
  siteUrl: "https://rahul-narayanasamy.github.io",
  intro:
    "Software engineer with 8+ years building scalable web products — interfaces that feel fast, precise, and cinematic.",
  availability: "Open to conversations",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "System Design",
    "AI Agents",
    "Model Context Protocol",
    "Frontend Architecture",
  ],
} as const;

export const milestones = [
  { year: "2018", label: "First production grid shipped" },
  { year: "2022", label: "Moved to EPAM Systems" },
  { year: "now", label: "Open to conversations" },
] as const;

export const story = {
  tag: "Origins → Present",
  paragraphs: [
    "I'm [Rahul], a [Software Engineer] based in Bengaluru with 8+ years of experience building web products. I specialize in [React], [TypeScript], and interfaces that feel fast, precise, and cinematic — from enterprise data grids to motion-led product surfaces.",
    "At [Syncfusion], I spent four years inside a UI component platform used by thousands of teams — data grids, templates, editing models, and the unglamorous work that teaches you how interfaces actually behave at scale.",
    "These days at [EPAM], I build production web products for global clients where [performance], [design fidelity], and [maintainability] have to coexist. I care about motion, craft, and products people actually want to open twice.",
    "Outside of work, I enjoy exploring new tools, refining side projects, and pushing the boundaries of what frontend engineering can feel like.",
  ],
  quote: "I started building because interfaces fascinated me.",
  quoteSub: "Now I craft products where performance, motion, and design fidelity have to coexist.",
};

export const journey = [
  {
    phase: "Origins",
    year: "2014",
    title: "Where it all started",
    body: "Began my engineering journey in computer science — writing my first programs, discovering the craft of building software, and realizing that great interfaces are where logic meets feeling.",
  },
  {
    phase: "Enterprise",
    year: "2018",
    title: "Deep in the grid",
    body: "Joined Syncfusion and spent four years inside enterprise UI — virtualization, query pipelines, editing models, and template engines that have to survive millions of cells.",
  },
  {
    phase: "Growth",
    year: "2022",
    title: "Production at scale",
    body: "Moved to EPAM Systems to build scalable web products for global clients — frontend architecture, TypeScript-heavy React surfaces, and polish that survives design review and production traffic.",
  },
  {
    phase: "Present",
    year: "2026",
    title: "Building for the future",
    body: "Focusing on React architecture, AI agents and MCP, and the intersection of craft and performance — bridging beautiful interfaces and production-grade engineering.",
  },
] as const;

export const principles = [
  {
    no: "01",
    title: "Components are APIs.",
    body: "Props, events and states get designed before pixels. A component that is easy to misuse will be misused, usually by me six months later.",
  },
  {
    no: "02",
    title: "Describe, then render.",
    body: "When business rules change every few weeks, I move them into schemas and validators, so a new flow ships as configuration instead of a new code path.",
  },
  {
    no: "03",
    title: "Fast is a feature.",
    body: "Responsive on every device, accessible by default, and light enough that nobody waits for it. Performance gets a budget, like anything else.",
  },
  {
    no: "04",
    title: "Shipping is the midpoint.",
    body: "UAT, incidents and client tickets are where you learn what you actually built. I stay for that part, and I bring new teammates along.",
  },
] as const;

export const quotes = [
  { text: "First, solve the problem. Then, write the code.", by: "John Johnson" },
  { text: "Simplicity is prerequisite for reliability.", by: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", by: "Kent Beck" },
  { text: "Programs must be written for people to read.", by: "Harold Abelson" },
] as const;
