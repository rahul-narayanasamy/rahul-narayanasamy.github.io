"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { formatDay, monthLabels, useContributions, type Contribs, type Day } from "@/lib/contributions";
import { isTyping } from "@/lib/actions";
import styles from "./SnakeGraph.module.css";

type P = { x: number; y: number };
type Mode = "auto" | "play" | "over" | "won";

const ROWS = 7;
const DIRS: Record<string, P> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const KEYS: Record<string, keyof typeof DIRS> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};
const AUTO_STEP_MS = 72;
const AUTO_MAX_LEN = 12;

const key = (p: P) => p.y * 1000 + p.x;

/** Reads theme colours from CSS custom properties, so the canvas follows light / dark. */
function palette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string) => cs.getPropertyValue(n).trim();
  return { empty: v("--bg-3"), red: v("--red"), ink: v("--ink"), line: v("--line-strong"), bg: v("--bg") };
}

/**
 * The GitHub contribution graph as a playable snake.
 * Autopilot hunts the nearest commit with breadth-first search; "Play" hands over the controls
 * (arrow keys / WASD / swipe). Rendering interpolates between grid steps, so motion stays smooth.
 */
export function SnakeGraph() {
  const { data, failed } = useContributions();
  const months = useMemo(() => (data ? monthLabels(data.weeks) : []), [data]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setModeState] = useState<Mode>("auto");
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState({ eaten: 0, total: 0, best: 0 });
  const [hover, setHover] = useState<Day | null>(null);

  // Mutable game state lives in a ref; React only renders the HUD.
  const game = useRef({
    cols: 0,
    snake: [] as P[],
    prev: [] as P[],
    dir: DIRS.right,
    queued: [] as P[],
    grow: 0,
    food: new Map<number, number>(), // cell key → level
    pops: [] as { p: P; t: number }[],
    lastStep: 0,
    stepMs: AUTO_STEP_MS,
    mode: "auto" as Mode,
    paused: false,
    visible: true,
    eaten: 0,
    best: 0,
  });

  const setMode = useCallback((m: Mode) => {
    game.current.mode = m;
    setModeState(m);
  }, []);

  /** (Re)fills the board from the real contribution data and places a fresh snake. */
  const reset = useCallback((d: Contribs, m: Mode) => {
    const g = game.current;
    g.cols = d.weeks.length;
    g.food = new Map();
    d.weeks.forEach((w, x) => w.forEach((day, y) => day && day.level > 0 && g.food.set(key({ x, y }), day.level)));
    g.snake = [{ x: 0, y: 3 }];
    g.prev = [{ x: 0, y: 3 }];
    g.dir = DIRS.right;
    g.queued = [];
    g.grow = 3;
    g.eaten = 0;
    g.pops = [];
    g.stepMs = m === "play" ? 130 : AUTO_STEP_MS;
    setMode(m);
    setScore((s) => ({ ...s, eaten: 0, total: g.food.size }));
  }, [setMode]);

  // Best score persists per browser.
  useEffect(() => {
    try {
      const best = Number(localStorage.getItem("snake-best")) || 0;
      game.current.best = best;
      setScore((s) => ({ ...s, best }));
    } catch {}
  }, []);

  useEffect(() => {
    if (!data) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    reset(data, "auto");
    if (reduce) {
      game.current.paused = true;
      setPaused(true);
    }
  }, [data, reset]);

  // ─── Simulation ──────────────────────────────────────────────
  const inBounds = (p: P) => p.x >= 0 && p.y >= 0 && p.x < game.current.cols && p.y < ROWS;

  /** Breadth-first search from the head to the nearest food, avoiding the body. Returns the first step. */
  const autoStep = (): P | null => {
    const g = game.current;
    const head = g.snake[0];
    // The tail moves away this step unless the snake is growing.
    const blocked = new Set((g.grow > 0 ? g.snake : g.snake.slice(0, -1)).map(key));
    const seen = new Map<number, P | null>([[key(head), null]]);
    const queue: P[] = [head];
    while (queue.length) {
      const cur = queue.shift()!;
      if (g.food.has(key(cur)) && (cur.x !== head.x || cur.y !== head.y)) {
        let step = cur;
        while (true) {
          const parent = seen.get(key(step))!;
          if (parent && (parent.x !== head.x || parent.y !== head.y)) step = parent;
          else break;
        }
        return { x: step.x - head.x, y: step.y - head.y };
      }
      for (const d of Object.values(DIRS)) {
        const n = { x: cur.x + d.x, y: cur.y + d.y };
        if (inBounds(n) && !blocked.has(key(n)) && !seen.has(key(n))) {
          seen.set(key(n), cur);
          queue.push(n);
        }
      }
    }
    // No reachable food: take any safe move.
    for (const d of Object.values(DIRS)) {
      const n = { x: head.x + d.x, y: head.y + d.y };
      if (inBounds(n) && !blocked.has(key(n))) return d;
    }
    return null;
  };

  const step = (now: number) => {
    const g = game.current;
    if (!data) return;
    let dir: P | null = g.dir;
    if (g.mode === "auto") dir = autoStep();
    else if (g.queued.length) {
      const q = g.queued.shift()!;
      if (q.x !== -g.dir.x || q.y !== -g.dir.y) dir = q;
    }
    if (!dir) return reset(data, "auto");
    const head = g.snake[0];
    const next = { x: head.x + dir.x, y: head.y + dir.y };
    const hitsSelf = g.snake.slice(0, g.grow > 0 ? g.snake.length : -1).some((s) => s.x === next.x && s.y === next.y);
    if (!inBounds(next) || hitsSelf) {
      if (g.mode === "play") {
        if (g.eaten > g.best) {
          g.best = g.eaten;
          try {
            localStorage.setItem("snake-best", String(g.best));
          } catch {}
        }
        setScore((s) => ({ ...s, best: g.best }));
        setMode("over");
      } else reset(data, "auto");
      return;
    }
    g.dir = dir;
    // Each segment slides from where segment i was to where it is now; a growing tail stays put.
    g.prev = g.snake.map((s) => ({ ...s }));
    g.snake.unshift(next);
    if (g.grow > 0) {
      g.grow -= 1;
      g.prev.push({ ...g.prev[g.prev.length - 1] });
    } else g.snake.pop();

    const k = key(next);
    if (g.food.has(k)) {
      g.food.delete(k);
      g.eaten += 1;
      g.pops.push({ p: next, t: now });
      if (g.mode === "play" || g.snake.length + g.grow < AUTO_MAX_LEN) g.grow += 1;
      if (g.mode === "play") g.stepMs = Math.max(70, 130 - g.eaten * 2);
      setScore((s) => ({ ...s, eaten: g.eaten }));
      if (g.food.size === 0) {
        if (g.mode === "play") {
          g.best = Math.max(g.best, g.eaten);
          setMode("won");
        } else window.setTimeout(() => game.current.mode === "auto" && reset(data, "auto"), 1400);
      }
    }
  };

  // ─── Render loop ─────────────────────────────────────────────
  useEffect(() => {
    if (!data) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let colors = palette();
    let raf = 0;
    let size = { w: 0, h: 0, cell: 0 };
    const levels = [0, 0.3, 0.52, 0.76, 1];

    const resize = () => {
      const w = canvas.clientWidth;
      const cell = w / game.current.cols;
      const h = cell * ROWS;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = { w, h, cell };
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onTheme = () => (colors = palette());
    window.addEventListener("themechange", onTheme);

    const io = new IntersectionObserver(([e]) => (game.current.visible = e.isIntersecting));
    io.observe(canvas);

    const rect = (x: number, y: number, s: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, s, s, r);
      ctx.fill();
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const g = game.current;
      const running = (g.mode === "auto" || g.mode === "play") && !g.paused && g.visible && !document.hidden;
      if (running && now - g.lastStep >= g.stepMs) {
        g.lastStep = now;
        step(now);
      }
      if (!g.visible) return;

      const { w, h, cell } = size;
      const gap = Math.max(1.5, cell * 0.18);
      const s = cell - gap;
      const r = Math.min(2, s * 0.2);
      ctx.clearRect(0, 0, w, h);

      // Board: empty cells, then remaining commits by level.
      data.weeks.forEach((wk, x) =>
        wk.forEach((day, y) => {
          if (!day) return;
          const level = g.food.get(key({ x, y }));
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.empty;
          rect(x * cell + gap / 2, y * cell + gap / 2, s, r);
          if (level) {
            ctx.globalAlpha = levels[level];
            ctx.fillStyle = colors.red;
            rect(x * cell + gap / 2, y * cell + gap / 2, s, r);
          }
        })
      );

      // Eat pops: a ring that expands and fades.
      g.pops = g.pops.filter((p) => now - p.t < 420);
      for (const p of g.pops) {
        const t = (now - p.t) / 420;
        ctx.globalAlpha = 1 - t;
        ctx.strokeStyle = colors.red;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.p.x * cell + cell / 2, p.p.y * cell + cell / 2, cell * (0.4 + t * 1.1), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Snake, interpolated between the previous and current step.
      const t = running ? Math.min(1, (now - g.lastStep) / g.stepMs) : 1;
      for (let i = g.snake.length - 1; i >= 0; i--) {
        const a = g.prev[i] ?? g.snake[i];
        const b = g.snake[i];
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const head = i === 0;
        const inset = head ? gap / 2 - 1 : gap / 2 + Math.min(i * 0.25, s * 0.22);
        // Body sits a step back from the head, so the head reads even when accent = ink (Mono).
        ctx.globalAlpha = head ? 1 : Math.max(0.3, 0.72 - (i / (g.snake.length + 4)) * 0.6);
        ctx.fillStyle = head ? colors.red : colors.ink;
        rect(x * cell + inset, y * cell + inset, cell - inset * 2, r + 1);
        if (head) {
          // Eyes face the direction of travel.
          ctx.fillStyle = colors.bg;
          const cx = x * cell + cell / 2 + g.dir.x * cell * 0.15;
          const cy = y * cell + cell / 2 + g.dir.y * cell * 0.15;
          const ox = g.dir.y * cell * 0.17;
          const oy = g.dir.x * cell * 0.17;
          const er = Math.max(0.8, cell * 0.07);
          ctx.beginPath();
          ctx.arc(cx + ox, cy + oy, er, 0, Math.PI * 2);
          ctx.arc(cx - ox, cy - oy, er, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("themechange", onTheme);
    };
    // step/reset read refs; re-binding only when data changes is intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ─── Controls ────────────────────────────────────────────────
  const start = () => {
    if (!data) return;
    reset(data, "play");
    game.current.paused = false;
    setPaused(false);
    wrapRef.current?.focus({ preventScroll: true });
  };
  const toAuto = () => {
    if (!data) return;
    reset(data, "auto");
    game.current.paused = false;
    setPaused(false);
  };
  const togglePause = () => {
    game.current.paused = !game.current.paused;
    setPaused(game.current.paused);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const g = game.current;
      if (g.mode !== "play" || isTyping(e)) return;
      const dirName = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dirName) {
        e.preventDefault();
        if (g.queued.length < 3) g.queued.push(DIRS[dirName]);
      } else if (e.key === " ") {
        e.preventDefault();
        togglePause();
      } else if (e.key === "Escape") toAuto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Swipe to steer on touch screens.
  const touch = useRef<P | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (game.current.mode !== "play" || !touch.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    game.current.queued.push(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? DIRS.right : DIRS.left) : dy > 0 ? DIRS.down : DIRS.up);
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!data) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cell = r.width / data.weeks.length;
    const x = Math.floor((e.clientX - r.left) / cell);
    const y = Math.floor((e.clientY - r.top) / cell);
    setHover(data.weeks[x]?.[y] ?? null);
  };

  if (failed) {
    return (
      <div className={`card ${styles.panel}`}>
        <p className="eyebrow">GitHub · @{profile.githubHandle}</p>
        <p className={styles.error}>
          Couldn&apos;t load the graph right now —{" "}
          <a className="red" href={profile.github} target="_blank" rel="noopener noreferrer">
            view the profile on GitHub ↗
          </a>
        </p>
      </div>
    );
  }

  const playing = mode === "play";
  const status =
    mode === "over"
      ? `Game over · ${score.eaten} eaten`
      : mode === "won"
        ? `Cleared all ${score.total} — the year is yours`
        : playing
          ? paused
            ? "Paused · space to resume"
            : "Arrows / WASD / swipe · space pause · esc quit"
          : paused
            ? "Autopilot paused"
            : "Autopilot · hunting the nearest commit";

  return (
    <div
      ref={wrapRef}
      tabIndex={-1}
      className={`card ${styles.panel} ${playing ? styles.live : ""}`}
      aria-label="GitHub contribution snake"
    >
      <div className={styles.head}>
        <p className="eyebrow">
          GitHub ·{" "}
          <a className="red" href={profile.github} target="_blank" rel="noopener noreferrer">
            @{profile.githubHandle}
          </a>
        </p>
        <dl className={styles.hud}>
          <div>
            <dt>Eaten</dt>
            <dd>
              {score.eaten}
              <small>/{score.total || "—"}</small>
            </dd>
          </div>
          <div>
            <dt>Contributions</dt>
            <dd>{data ? data.total : "—"}</dd>
          </div>
          <div>
            <dt>Best</dt>
            <dd>{score.best}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.scroll}>
        <div className={styles.board}>
          <div className={styles.months} aria-hidden="true">
            {months.map((m) => (
              <span key={`${m.label}-${m.col}`} style={{ left: `${(m.col / (data?.weeks.length || 53)) * 100}%` }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className={styles.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              role="img"
              aria-label={data ? `${data.total} contributions in the last year, played as a snake game` : "Loading contributions"}
              onMouseMove={onMove}
              onMouseLeave={() => setHover(null)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
            />
            {!data && <p className={styles.loading}>Loading contribution data…</p>}
            {(mode === "over" || mode === "won") && (
              <div className={styles.overlay}>
                <p className={styles.overTitle}>{mode === "won" ? "Year cleared" : "Game over"}</p>
                <p className="label">
                  {score.eaten} eaten · best {score.best}
                </p>
                <div className={styles.overActions}>
                  <button type="button" className="btn btn-solid" onClick={start}>
                    Play again
                  </button>
                  <button type="button" className="btn" onClick={toAuto}>
                    Autopilot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <p className={styles.status} aria-live="polite">
          <span className={`${styles.dot} ${playing && !paused ? styles.dotLive : ""}`} />
          {hover ? formatDay(hover) : status}
        </p>
        <div className={styles.controls}>
          {playing ? (
            <>
              <button type="button" className={styles.ctl} onClick={togglePause}>
                {paused ? "▶ Resume" : "❚❚ Pause"}
              </button>
              <button type="button" className={styles.ctl} onClick={toAuto}>
                Quit
              </button>
            </>
          ) : (
            <>
              {mode === "auto" && (
                <button type="button" className={styles.ctl} onClick={togglePause} disabled={!data}>
                  {paused ? "▶ Run" : "❚❚ Pause"}
                </button>
              )}
              <button type="button" className={`${styles.ctl} ${styles.ctlPrimary}`} onClick={start} disabled={!data}>
                ▶ Play snake
              </button>
            </>
          )}
        </div>
      </div>
      {playing && (
        <div className={styles.pad} aria-label="Direction controls">
          {(["up", "left", "down", "right"] as const).map((d) => (
            <button
              key={d}
              type="button"
              className={styles[d]}
              aria-label={d}
              onClick={() => game.current.queued.push(DIRS[d])}
            >
              {{ up: "↑", down: "↓", left: "←", right: "→" }[d]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
