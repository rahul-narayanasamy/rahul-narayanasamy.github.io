"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pages } from "@/lib/pages";
import { profile } from "@/content/profile";
import { copyEmail, cyclePalette, isTyping, PALETTES, setPalette, toggleTheme } from "@/lib/actions";
import styles from "./CommandMenu.module.css";

type Command = { id: string; label: string; hint: string; group: "Pages" | "Actions" | "Links"; run: () => void };

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const ext = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      ...pages.map((p) => ({
        id: p.href,
        label: p.no === "00" ? "Home" : p.title,
        hint: p.no,
        group: "Pages" as const,
        run: () => router.push(p.href),
      })),
      { id: "copy", label: "Copy email address", hint: "⌘C", group: "Actions", run: copyEmail },
      { id: "theme", label: "Toggle light / dark", hint: "T", group: "Actions", run: toggleTheme },
      { id: "palette", label: "Next palette", hint: "P", group: "Actions", run: cyclePalette },
      ...PALETTES.map((p) => ({
        id: `palette-${p.id}`,
        label: `Palette: ${p.label} (${p.note})`,
        hint: "",
        group: "Actions" as const,
        run: () => setPalette(p.id),
      })),
      {
        id: "trace",
        label: "Replay the agent trace",
        hint: "▶",
        group: "Actions",
        run: () => {
          router.push("/agents/");
          window.setTimeout(() => window.dispatchEvent(new CustomEvent("agent:play")), 700);
        },
      },
      { id: "resume", label: "Download resume (PDF)", hint: "↓", group: "Actions", run: ext("/resume.pdf") },
      { id: "gh", label: "GitHub", hint: "↗", group: "Links", run: ext(profile.github) },
      { id: "li", label: "LinkedIn", hint: "↗", group: "Links", run: ext(profile.linkedin) },
      { id: "md", label: "Medium", hint: "↗", group: "Links", run: ext(profile.medium) },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group} ${c.hint}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setIndex(0);
      d.showModal();
      inputRef.current?.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  // Global shortcuts: ⌘K / Ctrl+K and "/" open the menu; "t" toggles light / dark; "p" switches palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
        return;
      }
      if (open || isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        onOpenChange(true);
      } else if (e.key.toLowerCase() === "t") {
        toggleTheme();
      } else if (e.key.toLowerCase() === "p") {
        cyclePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    document.getElementById(`cmd-${index}`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (i: number) => {
    const c = results[i];
    if (!c) return;
    close();
    c.run();
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command menu"
      onClose={close}
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      <div className={styles.head}>
        <span className="red">&gt;</span>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={results[index] ? `cmd-${index}` : undefined}
          placeholder="Jump to a page or run a command"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((i) => (i + 1) % Math.max(results.length, 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              run(index);
            }
          }}
        />
        <kbd className={styles.esc}>esc</kbd>
      </div>
      <ul id="command-list" role="listbox" className={styles.list}>
        {results.length === 0 && <li className={styles.empty}>No command matches “{query}”.</li>}
        {results.map((c, i) => {
          const header = c.group !== lastGroup ? c.group : null;
          lastGroup = c.group;
          return (
            <li key={c.id} role="presentation">
              {header && <p className={styles.group}>{header}</p>}
              <div
                id={`cmd-${i}`}
                role="option"
                aria-selected={i === index}
                className={styles.option}
                onMouseMove={() => setIndex(i)}
                onClick={() => run(i)}
              >
                <span>{c.label}</span>
                <span className={styles.hint}>{c.hint}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.foot}>
        <span>↑↓ move</span>
        <span>↵ open</span>
        <span>[ ] prev / next page</span>
        <span>T mode</span>
        <span>P palette</span>
      </div>
    </dialog>
  );
}
