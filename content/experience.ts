import type { Role } from "./types";

// Mirrors the resume at /resume.pdf. Client names are intentionally left out.
export const roles: Role[] = [
  {
    period: "May 2022 — Present",
    place: "Bengaluru",
    org: "EPAM Systems",
    title: "Software Engineer",
    current: true,
    summary:
      "Frontend architecture, TypeScript-heavy React surfaces, and polish that survives design review and production traffic.",
    stack: ["React", "TypeScript", "Next.js", "Redux", "TanStack Query"],
    engagements: [
      {
        period: "Feb 2025 – Aug 2026",
        context: "Insurance technology platform",
        notes: [
          "Built a real-time web application for transaction processing, live event tracking, and case management.",
          "Developed dynamic, schema-based workflows with configurable transaction screens and business-rule validations using RJSF.",
          "Managed onboarding of new business processes and transaction flows, from requirement analysis through production rollout.",
          "Led production support, including incident resolution, UAT validation, and client-specific ticket handling.",
          "Mentored new team members on development workflows and coding standards; ran frontend code reviews focused on performance, security, and maintainability.",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "CSS Modules", "Redux", "Context API", "TanStack Query", "Vercel"],
      },
      {
        period: "Jun 2024 – Jan 2025",
        context: "Content platform migration",
        notes: [
          "Designed and built reusable React components integrated with Adobe Experience Manager (AEM) during a two-platform CMS migration.",
          "Ensured components were responsive and compatible across devices and browsers; resolved integration issues in collaboration with AEM developers.",
        ],
        stack: ["React", "TypeScript", "Handlebars.js", "Tailwind CSS", "HTML", "CSS"],
      },
      {
        period: "Aug 2022 – Apr 2024",
        context: "Global trade compliance portal",
        notes: [
          "Built reusable UI components and features for tariff code search, trade lane comparison, and product catalog, including real-time validations.",
          "Worked with business analysts, UX, BFF, and backend teams to define feature behaviour, resolve edge cases, and agree on API contracts.",
          "Wrote unit tests achieving 85%+ code coverage; maintained code quality against Sonar and Sigrid standards.",
        ],
        stack: ["TypeScript", "React", "Redux Toolkit", "Material UI", "React Testing Library", "REST APIs", "Axios", "Jenkins"],
      },
    ],
  },
  {
    period: "Apr 2018 — May 2022",
    place: "Chennai",
    org: "Syncfusion",
    title: "Senior Software Engineer",
    summary:
      "Four years inside a UI component platform used by thousands of teams — data grids, templates, editing models, and the unglamorous work that teaches you how interfaces actually behave at scale.",
    stack: ["JavaScript", "TypeScript", "React", "Node.js", "Git", "GitLab", "Jira"],
    engagements: [
      {
        period: "Apr 2018 – May 2022",
        context: "DataGrid component · team of 30",
        notes: [
          "Developed and maintained a feature-rich data-table component with data binding, editing, Excel-style filtering, custom sorting, row aggregation, selection, and Excel/CSV/PDF export.",
          "Built client-requested features and fixed client-reported and internal bugs to keep releases stable.",
          "Documented Grid features and guided junior engineers on using them to complete their work on time.",
        ],
      },
      {
        period: "Apr 2018 – May 2022",
        context: "DataManager library · team of 30",
        notes: [
          "Developed and maintained the data-management package that binds data to components such as Grid, TreeGrid, and Dropdown List and performs data operations in client applications.",
          "Fixed client-reported and internal bugs and documented the library's features.",
        ],
      },
      {
        period: "Apr 2018 – May 2022",
        context: "Pager component · team of 10",
        notes: [
          "Maintained the stability of the paging component used alongside Grid and TreeGrid by fixing client-reported and internal issues.",
        ],
      },
    ],
  },
];

export const education = {
  title: "Computer Science & Engineering",
  school: "TKS College of Technology · Theni",
  degree: "Bachelor of Engineering",
  period: "Aug 2013 — Apr 2017",
};
