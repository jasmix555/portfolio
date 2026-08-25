import { useEffect, useRef } from "react";
import { useMotionEnabled } from "../MotionToggle";

/**
 * Identity layer — the interference dot field.
 *
 * A lattice of bone dots whose alpha comes from two wave sources beating
 * against each other, so the ground pulses in a moiré that never repeats
 * cleanly. Over that, scroll *velocity* gates a thin scatter of cells that
 * brighten and decay. At rest almost nothing fires: the ground is alive only
 * while the reader moves, so it can never compete with reading.
 *
 * The flare is deliberately under-tuned — enough to register that the ground
 * responded, not enough to look at. Every number worth turning is a named
 * constant below; everything under them is just the lattice.
 *
 * The randomness is hashed off each cell's coordinates rather than generated
 * per frame, so a given scroll offset always resolves the same cells. That is
 * what makes it read as the ground being *read* rather than as static.
 *
 * The canvas paints its own opaque ground fill, which is what hides the static
 * CSS halftone in globals.css: same negative z-index, later in tree order.
 */

/* — The grain —
   Bigger marks, fewer of them. The study's 12px/1.5px read as a fine screen
   that turned to noise at any distance; an 18px pitch with a 4.4px dot puts
   almost the same amount of ink on the page in marks you can actually resolve
   as marks. Coverage is what stays constant when you trade pitch for radius:
   π·R² / PITCH², here about 4.7% either way. */
const PITCH = 18;
const R = 2.2;

/* — The ink —
   The lattice runs LATTICE_MIN → LATTICE_MIN + LATTICE_RANGE. Two wave sources
   beating against each other move each dot through that range. Keep the whole
   thing under FLARE_A: the bucket ladder is scaled to the brightest alpha the
   field ever draws, so raising the ceiling costs the lattice its resolution. */
const LATTICE_MIN = 0.03;
const LATTICE_RANGE = 0.055;

/* — The flare —
   Turn FLARE_MOVE up for a busier ground, FLARE_A up for a brighter one. The
   study ran 0.012 / 0.10 / 0.30 and read as snow on the page: at full velocity
   roughly one cell in seven was lit at the ceiling alpha, which is a lot of
   white to put behind body copy. These are a third of the density at half the
   brightness — the ground reports that it noticed you scrolled, and then goes
   back to being a ground. */
/** How many cells are lit when the page is still. */
const FLARE_REST = 0.004;
/** How many more are lit at full scroll velocity. */
const FLARE_MOVE = 0.03;
/** Peak alpha of a lit bone dot. */
const FLARE_A = 0.16;
/** Cells above this hash flare in signal instead of bone — the rare one. */
const FLARE_RED = 0.93;

/** Alpha is quantised so the field draws as 14 paths, not 6,000 fillStyles.
    The ladder spans 0 → the brightest alpha drawn, so no bucket is wasted. */
const BUCKETS = 14;
const MAXA = FLARE_A;
/** 30fps. The field is texture; it does not need to be smooth, it needs to be cheap. */
const FRAME_MS = 33;

/** Deterministic per-cell value — the "random" that is stable under scroll. */
const hash = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * Everything about a cell that depends only on where it is, computed once per
 * resize instead of 30 times a second. At 1920×1080 that is 6,400 cells; the
 * three hashes and two distances per cell are what would otherwise make this
 * a quarter of a million transcendental calls a second.
 */
function buildCells(w: number, h: number) {
  const cols = Math.ceil(w / PITCH);
  const rows = Math.ceil(h / PITCH);
  const n = cols * rows;
  const cell = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    // Phase offsets of the two wave sources, pre-scaled.
    k1: new Float32Array(n),
    k2: new Float32Array(n),
    // Flare: `h` is where the cell sits in its cycle, `drive` how fast that
    // cycle advances with scroll, `dwell` how long it stays lit. Three
    // independent hashes, so cells fire at their own pace instead of marching.
    h: new Float32Array(n),
    drive: new Float32Array(n),
    dwell: new Float32Array(n),
    red: new Uint8Array(n),
  };

  let i = 0;
  for (let row = 0; row < rows; row++) {
    const y = PITCH / 2 + row * PITCH;
    for (let col = 0; col < cols; col++, i++) {
      const x = PITCH / 2 + col * PITCH;
      cell.x[i] = x;
      cell.y[i] = y;
      cell.k1[i] = Math.hypot(x - 110, y - 70) * 0.055;
      cell.k2[i] = Math.hypot(x - w + 90, y - h + 60) * 0.048;
      const h2 = hash(x + 37.7, y - 91.3);
      const h3 = hash(x - 12.1, y + 58.9);
      cell.h[i] = hash(x, y);
      cell.drive[i] = 0.0007 + 0.0028 * h2;
      cell.dwell[i] = 0.35 + 1.9 * h3;
      cell.red[i] = h3 > FLARE_RED ? 1 : 0;
    }
  }
  return cell;
}

function Field({ assemble }: { assemble: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let cells = buildCells(1, 1);
    let w = 0;
    let h = 0;

    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = buildCells(w, h);
    };

    // Scroll position drives the flare; velocity decides how much of it fires.
    let scroll = window.scrollY;
    let lastY = scroll;
    let vel = 0;
    const onScroll = () => {
      const y = window.scrollY;
      vel = Math.min(60, vel + Math.abs(y - lastY));
      lastY = y;
      scroll = y;
    };

    // Reused between frames: `length = 0` keeps the backing stores allocated.
    const paths: number[][] = [];
    for (let b = 0; b < BUCKETS; b++) paths.push([]);
    const signal: number[] = [];

    const draw = (t: number) => {
      ctx.fillStyle = "#0B0B0B";
      ctx.fillRect(0, 0, w, h);
      for (let b = 0; b < BUCKETS; b++) paths[b].length = 0;
      signal.length = 0;

      const t1 = t * 0.9;
      const t2 = t * 0.6;
      const gate = FLARE_REST + FLARE_MOVE * Math.min(1, vel / 26);

      for (let i = 0; i < cells.n; i++) {
        const band = gate * cells.dwell[i];
        const phase = (cells.h[i] + scroll * cells.drive[i]) % 1;
        if (phase < band) {
          // `k` is how far into its dwell the cell is: 1 at the moment it
          // catches, 0 as it lets go. Radius barely moves — a dot that swells
          // reads as a bubble, and this is a grain of light coming up.
          const k = 1 - phase / band;
          if (cells.red[i]) {
            signal.push(cells.x[i], cells.y[i], R + 0.4 * k, 0.04 + 0.12 * k);
          } else {
            // Ramped from the lattice floor, not from nothing: a flare that
            // decayed to zero would leave a hole where a dot ought to be, and
            // the field would read as pitted rather than lit.
            const a = LATTICE_MIN + (FLARE_A - LATTICE_MIN) * k;
            const b = ((a / MAXA) * BUCKETS) | 0;
            paths[b < BUCKETS - 1 ? b : BUCKETS - 1].push(
              cells.x[i],
              cells.y[i],
              R + 0.3 * k
            );
          }
          continue;
        }
        const v = Math.sin(cells.k1[i] - t1) * Math.sin(cells.k2[i] + t2);
        const a = LATTICE_MIN + LATTICE_RANGE * (v < 0 ? -v : v);
        const b = ((a / MAXA) * BUCKETS) | 0;
        paths[b < BUCKETS - 1 ? b : BUCKETS - 1].push(cells.x[i], cells.y[i], R);
      }

      for (let b = 0; b < BUCKETS; b++) {
        const list = paths[b];
        if (!list.length) continue;
        ctx.fillStyle = `rgba(242,240,235,${(((b + 0.5) / BUCKETS) * MAXA).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < list.length; i += 3) {
          // `moveTo` before each arc, or the fill strings them into one path.
          ctx.moveTo(list[i] + list[i + 2], list[i + 1]);
          ctx.arc(list[i], list[i + 1], list[i + 2], 0, 6.283);
        }
        ctx.fill();
      }
      // Signal dots carry their own alpha, so they cannot share a path.
      for (let i = 0; i < signal.length; i += 4) {
        ctx.fillStyle = `rgba(229,57,10,${signal[i + 3].toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(signal[i], signal[i + 1], signal[i + 2], 0, 6.283);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      vel *= 0.88;
      draw(now / 1000);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    size();
    draw(0);
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      // z-index −1 and later in tree order than `body::before`: the opaque
      // ground fill covers the static halftone, and `body::after` — the column
      // rules — still paints on top of both.
      className={`pointer-events-none fixed inset-0 z-[-1] block h-full w-full ${
        assemble ? "load-ground" : ""
      }`}
    />
  );
}

/**
 * Under reduced motion the canvas is not mounted at all — the ground falls
 * back to the static CSS print in `globals.css`, which is a legitimate state
 * of the design rather than a degraded one.
 */
export default function DotField({ assemble = false }: { assemble?: boolean }) {
  const { enabled } = useMotionEnabled();
  return enabled ? <Field assemble={assemble} /> : null;
}
