export type SideProject = {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  href: string;
  /** Picks the generated poster motif drawn for the project. */
  motif: "orbit" | "ledger" | "terminal" | "split" | "signal" | "isobar" | "grid";
  tone: "red" | "steel" | "green" | "amber";
};

export type CaseStudy = {
  id: string;
  title: string;
  domain: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  /** Left-to-right flow drawn as the project's schematic. `focus` marks the part Rahul owned. */
  flow: { label: string; focus?: boolean }[];
  stack: string[];
};

export type Role = {
  period: string;
  place: string;
  org: string;
  title: string;
  current?: boolean;
  summary: string;
  stack: string[];
  engagements: { period: string; context: string; notes: string[] }[];
};

export type Skill = {
  name: string;
  as: string;
  usedFor: string;
  seenIn: string[];
};

export type ArchLayer = {
  id: string;
  label: string;
  sub: string;
  lane: "request" | "app";
  owns: string;
  decisions: string;
  tradeoff: string;
};

export type AgentActor = "user" | "ui" | "model" | "client" | "server";
export type AgentStep = {
  from: AgentActor;
  to: AgentActor;
  label: string;
  kind: "call" | "return" | "self";
};

export type Article = {
  topic: string;
  date: string;
  minutes: number;
  title: string;
  summary: string;
  href: string;
};

export type Credential = {
  title: string;
  issuer: string;
  status: "in-progress" | "ongoing" | "completed";
  year: string;
  detail: string;
};
