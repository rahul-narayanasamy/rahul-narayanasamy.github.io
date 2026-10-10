import type { AgentStep, ArchLayer } from "./types";

export const layers: ArchLayer[] = [
  {
    id: "edge",
    label: "Edge / CDN",
    sub: "cache · headers",
    lane: "request",
    owns: "Static assets, cached pages and security headers, served from the closest region.",
    decisions: "What can be static, what revalidates on a timer, and what must render per request.",
    tradeoff: "Aggressive caching is fast until content goes stale for the one user who needed it fresh.",
  },
  {
    id: "next",
    label: "Next.js app",
    sub: "RSC · SSR · CSR",
    lane: "request",
    owns: "Routing, the rendering strategy for each route, and the shell every feature mounts into.",
    decisions: "Server components for data-heavy, read-mostly views; client components only where interaction needs them.",
    tradeoff: "More work on the server ships less JavaScript, but couples the page to backend latency.",
  },
  {
    id: "bff",
    label: "BFF",
    sub: "API contracts",
    lane: "request",
    owns: "Shaping backend data for screens, aggregating calls, and hiding service churn from the UI.",
    decisions: "The response contract, agreed with backend teams and mocked before the UI is built.",
    tradeoff: "A BFF per product stays clean. A BFF per screen becomes a second monolith.",
  },
  {
    id: "services",
    label: "Domain services",
    sub: "policies · trades · data",
    lane: "request",
    owns: "The domain rules. The frontend never re-implements them.",
    decisions: "Which rules the UI mirrors for instant feedback, and which it only displays.",
    tradeoff: "Duplicated validation feels fast to users but has to stay in sync with the source.",
  },
  {
    id: "design-system",
    label: "Design system",
    sub: "tokens · primitives",
    lane: "app",
    owns: "Tokens, accessible primitives and documented component APIs.",
    decisions: "What is a primitive, what is a pattern, and what belongs to one feature only.",
    tradeoff: "Share a component too early and you freeze the wrong abstraction. Too late and five versions exist.",
  },
  {
    id: "features",
    label: "Feature modules",
    sub: "routes · schemas · tests",
    lane: "app",
    owns: "Each business capability with its routes, forms and tests in one place.",
    decisions: "Boundaries drawn around domains and teams, with schema-driven configuration where rules change often.",
    tradeoff: "Strong boundaries slow down the first feature and speed up every one after it.",
  },
  {
    id: "data",
    label: "Data layer",
    sub: "query cache · state",
    lane: "app",
    owns: "Server cache, optimistic updates, and the small amount of real client state.",
    decisions: "TanStack Query for server state; Redux Toolkit or context only for state the server doesn't own.",
    tradeoff: "One global store is easy to start and hard to reason about at fifty features.",
  },
];

export const designQuestions = [
  {
    q: "Who changes this, and how often?",
    a: "Frequent business changes push logic toward configuration. Rare ones stay in code, where they're easier to read.",
  },
  {
    q: "Where does the truth live?",
    a: "Server state, URL state and local UI state each get one owner. Most bugs I've fixed came from two owners.",
  },
  {
    q: "What breaks first at 10×?",
    a: "Rendering cost, bundle size, or the team itself. The answer decides whether to virtualize, split or modularize.",
  },
] as const;

export const actors: { id: AgentStep["from"]; label: string }[] = [
  { id: "user", label: "User" },
  { id: "ui", label: "Agent UI" },
  { id: "model", label: "Model" },
  { id: "client", label: "MCP client" },
  { id: "server", label: "MCP server" },
];

/** One illustrative tool-using turn, drawn as a sequence diagram. */
export const agentTurn: AgentStep[] = [
  { from: "user", to: "ui", label: "“Which transactions failed today, and why?”", kind: "call" },
  { from: "ui", to: "model", label: "messages + 2 tool definitions", kind: "call" },
  { from: "model", to: "ui", label: "stop_reason: tool_use · transactions.search", kind: "return" },
  { from: "ui", to: "client", label: "run tool", kind: "call" },
  { from: "client", to: "server", label: "tools/call {status: failed, date: today}", kind: "call" },
  { from: "server", to: "client", label: "12 records", kind: "return" },
  { from: "ui", to: "model", label: "tool_result (matching id)", kind: "call" },
  { from: "model", to: "ui", label: "stop_reason: end_turn", kind: "return" },
  { from: "ui", to: "user", label: "streamed summary, tool call visible", kind: "return" },
];
