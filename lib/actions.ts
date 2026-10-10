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

export type Palette = "ember" | "mono";

/** Switches between black & white "Mono" (the default) and the red "Ember" palette. Independent of light / dark. */
export function togglePalette() {
  const root = document.documentElement;
  const next: Palette = root.dataset.palette === "mono" ? "ember" : "mono";
  if (next === "mono") root.dataset.palette = "mono";
  else delete root.dataset.palette;
  try {
    localStorage.setItem("palette", next);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  toast(next === "mono" ? "Palette · Mono (black & white)" : "Palette · Ember (red)");
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
