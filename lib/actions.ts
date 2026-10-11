import { profile } from "@/content/profile";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>("toast", { detail: message }));
}

/** Copies the email address, falling back to a mailto where the clipboard API is blocked. */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied to clipboard");
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
}

export type Palette = "mono" | "ember" | "moss";

/** Order the P key cycles through. Mono is the default. */
export const PALETTES: { id: Palette; label: string; note: string }[] = [
  { id: "mono", label: "Mono", note: "black & white" },
  { id: "ember", label: "Ember", note: "red" },
  { id: "moss", label: "Moss", note: "green" },
];

/** The active palette. Ember is the base theme, so it is the absence of a data attribute. */
export function getPalette(): Palette {
  const p = document.documentElement.dataset.palette;
  return p === "mono" || p === "moss" ? p : "ember";
}

/** Applies and remembers a palette. Independent of light / dark. */
export function setPalette(next: Palette) {
  const root = document.documentElement;
  if (next === "ember") delete root.dataset.palette;
  else root.dataset.palette = next;
  try {
    localStorage.setItem("palette", next);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  const meta = PALETTES.find((p) => p.id === next)!;
  toast(`Palette · ${meta.label} (${meta.note})`);
}

export function cyclePalette() {
  const i = PALETTES.findIndex((p) => p.id === getPalette());
  setPalette(PALETTES[(i + 1) % PALETTES.length].id);
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
}

/** True when the keyboard event started inside something the user is typing into. */
export function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}
