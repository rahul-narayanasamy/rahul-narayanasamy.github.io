import type { Article, Credential } from "./types";

export const articles: Article[] = [
  {
    topic: "AI & ML",
    date: "Aug 24, 2026",
    minutes: 8,
    title: "Multi-agent orchestration: how multiple AI agents work together",
    summary:
      "A practical guide to coordinating multiple AI agents — sequential pipelines, parallel fan-out, hierarchical managers, and event-driven handoffs.",
    href: "https://medium.com/@rahulkishore227/%EF%B8%8F-multi-agent-orchestration-how-multiple-ai-agents-work-together-f5cba8f3615c",
  },
  {
    topic: "AI & ML",
    date: "Aug 21, 2026",
    minutes: 6,
    title: "Agentic loops: the core execution cycle behind AI agents",
    summary:
      "How AI agents use stop_reason, tool execution, and conversation history to keep working until a task is actually complete.",
    href: "https://medium.com/@rahulkishore227/agentic-loops-the-core-execution-cycle-behind-ai-agents-0c1bf0cb159f",
  },
];

export const credentials: Credential[] = [
  {
    title: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    status: "in-progress",
    year: "2026",
    detail:
      "Agentic loops, tool-use handling, stop_reason logic in the API, and designing reliable multi-step agent systems.",
  },
  {
    title: "Frontend system design",
    issuer: "Self-directed",
    status: "ongoing",
    year: "2026",
    detail: "Rendering strategies, caching layers, micro-frontends, and the team boundaries that shape them.",
  },
  {
    title: "Bachelor of Engineering, CSE",
    issuer: "TKS College of Technology",
    status: "completed",
    year: "2017",
    detail: "Computer Science & Engineering, Theni, Tamil Nadu.",
  },
];
