"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pages, pageFor } from "@/lib/pages";
import { profile } from "@/content/profile";
import { togglePalette, toggleTheme } from "@/lib/actions";
import { useSessionClock } from "@/lib/hooks";
import { CommandMenu } from "./CommandMenu";
import styles from "./SiteNav.module.css";

const primary = pages.filter((p) => p.primary);
const more = pages.filter((p) => !p.primary && p.no !== "00");

export function SiteNav() {
  const pathname = usePathname();
  const current = pageFor(pathname);
  const clock = useSessionClock();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const moreRef = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ mono: false, light: false });

  // Mirror the palette and mode set on <html> (by the boot script, buttons, keys or ⌘K).
  useEffect(() => {
    const read = () => {
      const d = document.documentElement.dataset;
      setLook({ mono: d.palette === "mono", light: d.theme === "light" });
    };
    read();
    window.addEventListener("themechange", read);
    return () => window.removeEventListener("themechange", read);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Hide on scroll down, reveal on scroll up; track reading progress.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      setHidden(y > 240 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => current?.href === href;
  const moreActive = more.some((p) => isActive(p.href));

  return (
    <>
      <header className={`${styles.nav} ${hidden && !menuOpen ? styles.hidden : ""}`}>
        <div className={`wrap ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${profile.name}, home`}>
            <b>{profile.initials}</b>
            <span className={styles.brandRole}>/{profile.role}</span>
          </Link>

          <nav aria-label="Primary" className={styles.links}>
            {primary.map((p) => (
              <Link key={p.href} href={p.href} aria-current={isActive(p.href) ? "page" : undefined}>
                <span className={styles.no}>{p.no}</span>
                {p.title}
              </Link>
            ))}
            <div className={styles.more} ref={moreRef}>
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={moreActive ? styles.moreActive : undefined}
                onClick={() => setMoreOpen((o) => !o)}
              >
                More · {more.length} <span className={styles.caret}>▾</span>
              </button>
              <div className={`${styles.dropdown} ${moreOpen ? styles.dropdownOpen : ""}`}>
                {more.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    tabIndex={moreOpen ? 0 : -1}
                    aria-current={isActive(p.href) ? "page" : undefined}
                  >
                    <span className={styles.no}>{p.no}</span>
                    <span>{p.title}</span>
                    <span className={styles.ddArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className={styles.tools}>
            <span className={styles.clock} title="Time since you opened this portfolio">
              {clock}
            </span>
            <button type="button" className={styles.icon} onClick={() => setCmdOpen(true)} aria-label="Open command menu">
              <kbd>⌘K</kbd>
            </button>
            <button
              type="button"
              className={`${styles.icon} ${styles.paletteBtn}`}
              onClick={togglePalette}
              aria-label={`Palette: ${look.mono ? "Mono, black and white" : "Ember, red"}. Switch palette`}
              title={`Palette · ${look.mono ? "Mono" : "Ember"} (P)`}
            >
              <span className={`${styles.swatch} ${look.mono ? styles.swatchMono : ""}`} aria-hidden="true" />
              <span className={styles.paletteName}>{look.mono ? "Mono" : "Ember"}</span>
            </button>
            <button
              type="button"
              className={styles.icon}
              onClick={toggleTheme}
              aria-label={`Switch to ${look.light ? "dark" : "light"} mode`}
              title={`${look.light ? "Light" : "Dark"} mode (T)`}
            >
              <span className={styles.sun}>{look.light ? "☾" : "☀"}</span>
            </button>
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div id="site-menu" className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`} hidden={!menuOpen}>
        <nav aria-label="All pages" className="wrap">
          <ol className={styles.overlayList}>
            {pages.map((p, i) => (
              <li key={p.href} style={{ "--i": i } as React.CSSProperties}>
                <Link href={p.href} aria-current={isActive(p.href) ? "page" : undefined}>
                  <span className={styles.overlayNo}>{p.no}</span>
                  <span>{p.no === "00" ? "Home" : p.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className={styles.overlayLook}>
            <button type="button" onClick={togglePalette}>
              <span className={`${styles.swatch} ${look.mono ? styles.swatchMono : ""}`} aria-hidden="true" />
              Palette · {look.mono ? "Mono" : "Ember"}
            </button>
            <button type="button" onClick={toggleTheme}>
              {look.light ? "☾" : "☀"} Mode · {look.light ? "Light" : "Dark"}
            </button>
          </div>
          <div className={styles.overlayFoot}>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>
              <span className="status-dot" /> {profile.location}
            </span>
          </div>
        </nav>
      </div>

      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
