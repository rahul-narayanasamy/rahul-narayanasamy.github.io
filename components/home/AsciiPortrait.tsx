"use client";

import { useEffect, useRef } from "react";
import styles from "./AsciiPortrait.module.css";

type Particle = {
  ch: string;
  x: number;
  y: number;
  bx: number;
  by: number;
  /** Spring stiffness divisor: higher = lazier. Gives the settle its organic stagger. */
  d: number;
  /** 0 = highlight (ink), 1 = midtone (muted), 2 = shadow (faint). */
  tone: 0 | 1 | 2;
};

// Logical drawing space. The canvas is scaled to its CSS size × devicePixelRatio, so text stays crisp.
const W = 480;
const H = 480;
const COLS = 120;
const ROWS = 80;
const STEP_X = W / COLS;
const STEP_Y = H / ROWS;
const FONT_PX = 6.4;

// Characters per brightness level, light to dense. Two per level breaks up banding.
const RAMP: string[][] = [
  [".", "·"],
  [":", ","],
  ["-", ";"],
  ["=", "+"],
  ["*", "x"],
  ["#", "o"],
  ["%", "&"],
  ["@", "W"],
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Brightness bands in the photo: black hair and hoodie < 0.085, the grey backdrop up to 0.24, skin above.
const DARK_MAX = 0.085;
const BRIGHT_MIN = 0.24;
const DISC = 0.93;

/**
 * The photo's backdrop holds a code snippet (left) and a </> icon (right), in fixed places. They would
 * read as stray noise next to the figure, so cells there are left blank. (u, w) run from -1 to 1.
 */
const isBackdropArt = (u: number, w: number) => (u < -0.52 && w < 0.38) || (u > 0.5 && w < 0.12);

/**
 * How much ink a cell gets (0 = blank, 1 = densest). The backdrop is always blank. On a dark page the
 * skin glows and the dark features recede; on a light page it flips, like a pen drawing: hair, glasses
 * and beard are dense and bare skin is left almost empty.
 */
function density(lum: number, light: boolean) {
  if (lum < DARK_MAX) return light ? 0.92 - 0.1 * (lum / DARK_MAX) : 0.44 - 0.14 * (lum / DARK_MAX);
  if (lum < BRIGHT_MIN) return 0;
  const t = clamp01((lum - BRIGHT_MIN) / 0.66);
  return light ? 0.06 + 0.6 * Math.pow(1 - t, 1.4) : 0.26 + 0.52 * t;
}

/** Samples the photo into a grid of characters, then optionally scatters each one for the intro. */
function buildParticles(img: HTMLImageElement, scatter: boolean, light: boolean): Particle[] {
  const sample = document.createElement("canvas");
  sample.width = COLS;
  sample.height = ROWS;
  const sx = sample.getContext("2d", { willReadFrequently: true })!;
  sx.imageSmoothingQuality = "high";
  sx.drawImage(img, 0, 0, COLS, ROWS);
  const px = sx.getImageData(0, 0, COLS, ROWS).data;

  // Pass 1: ink amount per cell.
  const ink = new Float32Array(COLS * ROWS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Outside the photo's circular frame there is nothing to draw.
      const u = ((c + 0.5) / COLS) * 2 - 1;
      const w = ((r + 0.5) / ROWS) * 2 - 1;
      if (u * u + w * w > DISC * DISC || isBackdropArt(u, w)) continue;
      const i = (r * COLS + c) * 4;
      ink[r * COLS + c] = density((0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255, light);
    }
  }

  // Pass 2: keep only the main figure. The photo's backdrop has a code snippet and a </> icon; as
  // separate islands of ink they would read as noise, so drop everything but the biggest shape.
  const label = new Int32Array(COLS * ROWS).fill(-1);
  let best = -1;
  let bestSize = 0;
  let next = 0;
  for (let start = 0; start < ink.length; start++) {
    if (ink[start] <= 0 || label[start] >= 0) continue;
    const stack = [start];
    label[start] = next;
    let size = 0;
    while (stack.length) {
      const k = stack.pop()!;
      size++;
      const kr = Math.floor(k / COLS);
      const kc = k % COLS;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = kr + dr;
          const nc = kc + dc;
          if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) continue;
          const n = nr * COLS + nc;
          if (ink[n] > 0 && label[n] < 0) {
            label[n] = next;
            stack.push(n);
          }
        }
      }
    }
    if (size > bestSize) {
      bestSize = size;
      best = next;
    }
    next++;
  }

  // Pass 3: turn cells into particles.
  const out: Particle[] = [];
  const cx = W / 2;
  const cy = H / 2;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = ink[r * COLS + c];
      if (label[r * COLS + c] !== best) continue;
      // Level 0 is empty space; 1..8 index the ramp. A little noise dithers the edges.
      const level = Math.floor(v * (RAMP.length + 1) + (Math.random() - 0.5) * 0.4);
      if (level < 1) continue;
      const set = RAMP[Math.min(RAMP.length, level) - 1];

      const bx = c * STEP_X + 0.5;
      const by = r * STEP_Y + FONT_PX;
      let x = bx;
      let y = by;
      if (scatter) {
        // Same entrance as the original: out on a spiral, then pulled home.
        const ang = Math.atan2(by - cy, bx - cx) + Math.random() * 2;
        const rad = Math.hypot(bx - cx, by - cy) + Math.random() * 350 + 150;
        x = cx + Math.cos(ang) * rad;
        y = cy + Math.sin(ang) * rad;
      }
      out.push({
        ch: set[Math.random() < 0.5 ? 0 : 1],
        x,
        y,
        bx,
        by,
        d: Math.random() * 15 + 5,
        tone: v > 0.62 ? 0 : v > 0.3 ? 1 : 2,
      });
    }
  }
  // Group by tone so fillStyle changes are rare while drawing.
  return out.sort((a, b) => a.tone - b.tone);
}

/**
 * Your photo, drawn as ~4,000 text characters that assemble when the page opens and swirl away from
 * the cursor. Colours come from the active theme's CSS variables, so every palette and mode gets its
 * own version. The loop sleeps whenever nothing is moving, and is skipped under reduced motion.
 */
export function AsciiPortrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let parts: Particle[] = [];
    let colors = { ink: "#fff", muted: "#aaa", faint: "#777", accent: "#fff" };
    let font = "monospace";
    let scale = 1;
    let raf = 0;
    let last = 0;
    let alive = true;
    let visible = true;
    let seenIntro = false;
    let light = false;
    let image: HTMLImageElement | null = null;
    let sweepStart = -1;
    let sweepDone = false;
    let touched = false;
    const cursor = { x: -9999, y: -9999 };

    /** Light and dark pages need different drawings, so a mode change re-forms the portrait. */
    const rebuild = (scatter: boolean) => {
      if (!image) return;
      light = root.dataset.theme === "light";
      parts = buildParticles(image, scatter, light);
      seenIntro = false;
      sweepDone = true;
    };

    const readColors = () => {
      const cs = getComputedStyle(root);
      const v = (n: string) => cs.getPropertyValue(n).trim();
      colors = { ink: v("--ink"), muted: v("--muted"), faint: v("--faint"), accent: v("--red") };
      font = getComputedStyle(document.body).fontFamily || "monospace";
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.font = `500 ${FONT_PX}px ${font}`;
      ctx.textBaseline = "alphabetic";
      const tones = [colors.ink, colors.muted, colors.faint];
      let current = "";
      for (const p of parts) {
        // Anything out of place glows in the theme's accent: the intro and the swirl pick it up.
        const away = (p.x - p.bx) ** 2 + (p.y - p.by) ** 2 > 2;
        const fill = away ? colors.accent : tones[p.tone];
        if (fill !== current) {
          ctx.fillStyle = fill;
          current = fill;
        }
        ctx.fillText(p.ch, p.x, p.y);
      }
    };

    /** Advances physics by `k` 60fps-frames. Returns true while anything is still moving. */
    const step = (k: number) => {
      const radius = window.innerWidth > 768 ? 60 : 70;
      const r2 = radius * radius;
      let moving = false;
      for (const p of parts) {
        const vx = cursor.x - p.x;
        const vy = cursor.y - p.y;
        const d2 = vx * vx + vy * vy;
        if (d2 < r2 && d2 > 0) {
          // Pushed away, with a quarter-turn of swirl so the characters spiral round the pointer.
          const dist = Math.sqrt(d2);
          const nx = vx / dist;
          const ny = vy / dist;
          const f = ((radius - dist) / radius) * p.d * k;
          p.x -= (nx + ny * 1.5) * f;
          p.y -= (ny - nx * 1.5) * f;
          moving = true;
        } else {
          const ease = 1 - Math.pow(1 - 1 / (p.d * 0.85), k);
          const dx = p.x - p.bx;
          const dy = p.y - p.by;
          p.x = Math.abs(dx) < 0.5 ? p.bx : p.x - dx * ease;
          p.y = Math.abs(dy) < 0.5 ? p.by : p.y - dy * ease;
          if (p.x !== p.bx || p.y !== p.by) moving = true;
        }
      }
      return moving;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      // Hold the intro until the boot loader has lifted.
      if (root.classList.contains("booting")) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = last ? Math.min(now - last, 50) : 16.7;
      last = now;

      // A single pass of the "cursor" once the portrait has formed, so touch screens see it's alive too.
      if (sweepStart >= 0) {
        const t = (now - sweepStart) / 1500;
        if (t >= 1 || touched) {
          sweepStart = -1;
          sweepDone = true;
          if (!touched) {
            cursor.x = -9999;
            cursor.y = -9999;
          }
        } else {
          cursor.x = W * (0.1 + 0.8 * t);
          cursor.y = H * (0.42 + 0.14 * Math.sin(t * Math.PI * 3));
        }
      }

      const moving = step(dt / 16.67);
      draw();
      if (moving) seenIntro = true;
      else if (seenIntro && !sweepDone && sweepStart < 0 && !touched && !reduce) sweepStart = now;

      if (visible && (moving || sweepStart >= 0 || cursor.x > -1000)) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    const wake = () => {
      if (alive && !raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.width = w;
      canvas.height = Math.round((w * H) / W);
      scale = w / W;
      draw();
    };

    const aim = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      cursor.x = ((e.clientX - r.left) * W) / r.width;
      cursor.y = ((e.clientY - r.top) * H) / r.height;
      touched = true;
      wake();
    };
    const release = () => {
      cursor.x = -9999;
      cursor.y = -9999;
      wake();
    };

    const img = new Image();
    img.src = src;
    img.decode().then(
      async () => {
        if (!alive) return;
        await document.fonts?.ready;
        image = img;
        readColors();
        rebuild(!reduce);
        sweepDone = false;
        resize();
        wake();
      },
      () => {},
    );

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) wake();
    });
    io.observe(canvas);
    // Theme, palette and the loader all flip attributes on <html>; recolour or restart on any of them.
    const mo = new MutationObserver(() => {
      readColors();
      if (image && (root.dataset.theme === "light") !== light) rebuild(!reduce);
      draw();
      wake();
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-palette", "class"] });

    if (!reduce) {
      canvas.addEventListener("pointermove", aim);
      canvas.addEventListener("pointerleave", release);
      canvas.addEventListener("pointercancel", release);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", aim);
      canvas.removeEventListener("pointerleave", release);
      canvas.removeEventListener("pointercancel", release);
    };
  }, [src]);

  return <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label={alt} />;
}
