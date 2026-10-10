import type { Role } from "./types";

export const roles: Role[] = [
  {
    period: "May 2022 — Present",
    place: "Bengaluru",
    org: "EPAM Systems",
    title: "Software Engineer",
    current: true,
    summary:
      "Frontend architecture, TypeScript-heavy React surfaces, and polish that survives design review and production traffic.",
    stack: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js"],
    engagements: [
      {
        period: "2025 – now",
        context: "Insurance technology platform",
        notes: [
          "Lead onboarding of new business processes and transaction flows, from requirement analysis to production rollout.",
          "Build schema-based workflows with configurable transaction screens and business-rule validation using RJSF.",
          "Own production support: incident resolution, UAT validation and client-specific tickets.",
          "Mentor new engineers on workflow and coding standards; run code reviews.",
        ],
      },
      {
        period: "2024 – 2025",
        context: "Global financial-data provider",
        notes: [
          "Designed and built UI components supporting the migration of two CMS platforms to Adobe Experience Manager.",
          "Integrated reusable React components with AEM alongside backend developers; responsive and cross-browser.",
          "Found and fixed complex component bugs during integration.",
        ],
      },
      {
        period: "2022 – 2024",
        context: "Global logistics · trade automation",
        notes: [
          "Built reusable UI components for a global trade-automation service.",
          "Defined API contracts with BFF and backend teams; worked with BAs and UX on new features.",
          "Held unit-test coverage at 85% or higher and reduced Sonar code smells to improve the Sigrid score.",
        ],
      },
    ],
  },
  {
    period: "Apr 2018 — May 2022",
    place: "Chennai",
    org: "Syncfusion",
    title: "Software Engineer",
    summary:
      "Four years inside a UI component platform used by thousands of teams — data grids, templates, editing models, and the unglamorous work that teaches you how interfaces actually behave at scale.",
    stack: ["JavaScript", "TypeScript", "Blazor", "C#", "EJ2"],
    engagements: [
      {
        period: "2018 – 2022",
        context: "DataGrid · DataManager · Pager",
        notes: [
          "Developed and maintained the DataGrid, DataManager and Pager web components.",
          "Shipped customer-requested Grid features while keeping releases stable.",
          "Diagnosed and fixed customer-reported bugs; ran support tickets and calls.",
          "Mentored junior engineers on component internals.",
        ],
      },
    ],
  },
];

export const education = {
  title: "Computer Science & Engineering",
  school: "TKS College of Technology · Theni",
  degree: "Bachelor of Engineering",
  period: "2013 — 2017",
};
