import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionEnabled } from "../MotionToggle";
import { ui } from "./i18n";

/**
 * REC ARCHIVE motion tokens — 3 curves, 4 durations. No springs, no bounce,
 * no parallax. Nothing fades: every reveal is a clip-path wipe, because print
 * doesn't fade in. Nothing exceeds 420ms, first paint included.
 *
 * The wipes themselves live in globals.css as `.wipe-down` / `.wipe-right`,
 * with `.reveal-down` / `.reveal-right` holding an element clipped until its
 * turn. They are keyframe animations rather than JS-driven values on purpose:
 * the final state is the element's own default, so once a wipe has run there
 * is no inline style left behind to fight with. What decides whether the
 * clipped state applies at all is a media query, not this file — a reveal
 * that cannot run is not allowed to hide anything.
 */
export const ease = {
  snap: [0.2, 0, 0, 1] as [number, number, number, number], // block wipes, reveals
  drive: [0.65, 0, 0.35, 1] as [number, number, number, number], // position, nav
};

/** Seconds, for Framer Motion. */
export const dur = { flick: 0.08, quick: 0.18, move: 0.42 };

/** Milliseconds, for the CSS wipes' `--delay`. `bar` is tighter because a
    stack of seven bars is one object; `cap` is where a cascade turns into a
    queue and the last row starts feeling like a wait. */
export const stagger = { row: 40, bar: 24, cap: 7 };


/** The five sections the nav tracks, in page order. Labels switch with locale. */
export const SECTIONS = [
  { id: "index", label: ui.nav.index },
  { id: "records", label: ui.nav.records },
  { id: "ideas", label: ui.nav.ideas },
  { id: "profile", label: ui.nav.profile },
  { id: "contact", label: ui.nav.contact },
];

/**
 * Whichever section owns at least half the viewport. Only sections actually
 * present in the DOM are observed, so the nav stays truthful if a board is
 * ever removed.
 */
export function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const present = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!present.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    present.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}

/* — The reveal driver —
 *
 * IntersectionObserver is the optimisation, never the mechanism. There are
 * hosts — embedded frames, some preview and capture environments — where it
 * reports no intersection at all, and every clipped element on the page is
 * then stranded invisible forever. Nothing that can hide content may depend
 * on it alone.
 *
 * So: one passive `scroll` listener, rAF-throttled, doing a rect check. One
 * listener and one pending list for the whole page, however many groups
 * register.
 */

/** An element reveals once its top clears this much of the viewport. */
const TRIGGER_MARGIN = 140;
/** If the driver never ran at all, show everything rather than hide it. */
const FALLBACK_MS = 1500;
/** Backstop sample rate while anything is still waiting. */
const POLL_MS = 250;

type Entry = {
  el: HTMLElement;
  /** `true` = play the reveal, `false` = it was already on screen at load. */
  fire: (play: boolean) => void;
};

const pending = new Set<Entry>();
/** Set inside the rAF callback — proof the driver actually sampled. */
let sampled = false;
/** The first pass is the load pass: what it finds was never scrolled to. */
let firstPass = true;
let raf = 0;
let listening = false;
let fallback: ReturnType<typeof setTimeout> | undefined;
let poll: ReturnType<typeof setInterval> | undefined;

function sweep() {
  raf = 0;
  sampled = true;
  const doc = document.documentElement;
  // At the end of the document there is no more scrolling to do, so the margin
  // has to go: anything still held in that last screenful — the whole footer,
  // every time — can never cross a line 140px up from the bottom, and would
  // stay clipped for the life of the page. This is not an edge case, it is
  // where the page always ends.
  const atEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
  const limit = window.innerHeight - (atEnd ? 0 : TRIGGER_MARGIN);
  // Deliberately no "entering from below" gate. An element the driver failed
  // to sample while it was on screen — a resize, a collapsed section, a frame
  // the loop missed — must still reveal when it is next seen, or it stays
  // clipped for the life of the page.
  for (const entry of Array.from(pending)) {
    if (entry.el.getBoundingClientRect().top < limit) {
      pending.delete(entry);
      entry.fire(!firstPass);
    }
  }
  firstPass = false;
  if (!pending.size) stop();
}

const onScroll = () => {
  if (!raf) raf = requestAnimationFrame(sweep);
};

function start() {
  if (listening) return;
  listening = true;
  // Detached before it is ever reattached — `listening` is the only thing that
  // decides, so a second start cannot leave a second listener behind.
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // A slow backstop, calling `sweep` directly rather than through the rAF
  // gate: the cost of one missed sample here is content that never appears,
  // and a scroll animated by Lenis does not reliably deliver its final
  // position as an event. One rect check per element every 250ms, and it stops
  // itself the moment nothing is left to reveal.
  poll = setInterval(sweep, POLL_MS);
  fallback = setTimeout(() => {
    // Only if the driver never ran. Never "if nothing has revealed yet" —
    // that is true of any page whose first viewport holds no reveals, and it
    // would fire the whole page off at 1.5s on a perfectly healthy load.
    if (sampled) return;
    for (const entry of Array.from(pending)) {
      pending.delete(entry);
      entry.fire(false);
    }
  }, FALLBACK_MS);
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  clearInterval(poll);
  clearTimeout(fallback);
}

function register(entry: Entry) {
  pending.add(entry);
  start();
  // Sample now rather than waiting for a scroll that may never come: on a tall
  // viewport most of the page can already be in view at load.
  if (!raf) raf = requestAnimationFrame(sweep);
  return () => {
    pending.delete(entry);
    if (!pending.size) stop();
  };
}

/** The seven reveal tokens. See `.rv-*` in globals.css for what each does. */
export type RevealToken =
  | "display"
  | "rule"
  | "head"
  | "strip"
  | "row"
  | "bar"
  | "text";

/** Which held state a token needs before its turn. */
const HOLD: Record<RevealToken, string> = {
  display: "reveal-down",
  rule: "reveal-scale",
  head: "reveal-down",
  strip: "reveal-down",
  row: "reveal-right",
  bar: "reveal-scale",
  text: "reveal-down",
};

/**
 * A scroll reveal, in one call: put `ref` on the group, `rv(token)` on each
 * thing inside it, and `delay(i)` on anything that follows the one above it.
 *
 *   const head = useReveal<HTMLDivElement>();
 *   <div ref={head.ref}>
 *     <h2 className={head.rv("display")}>…</h2>
 *     <p  className={head.rv("text")}>…</p>
 *
 * One reveal per visual group, not per section: a single group spanning a
 * whole section fires when its top edge appears, and everything further down
 * has already finished by the time the reader gets to it.
 *
 * `rv()` returns the held class before its turn and the token class after, so
 * the element starts clipped rather than painting in full and then wiping
 * itself back in. Whether the held class hides anything is decided in CSS by
 * `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`.
 * Nothing here has to know: with no JS the class is inert, so content that can
 * never be revealed is never hidden in the first place.
 */
export function useReveal<T extends HTMLElement>() {
  const { enabled } = useMotionEnabled();
  const ref = useRef<T>(null);
  const [state, setState] = useState<"hold" | "play" | "skip">("hold");

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    return register({
      el,
      // Anything already on screen at load is not revealed, it is simply
      // there: that first viewport belongs to the load transition.
      fire: (play) => setState(play ? "play" : "skip"),
    });
  }, [enabled]);

  return {
    ref,
    shown: state !== "hold",
    rv: (token: RevealToken) => {
      if (!enabled || state === "skip") return "";
      return state === "play" ? `rv-${token}` : HOLD[token];
    },
    /**
     * Stagger for item `i`. Capped, because past the seventh row a stagger
     * stops reading as a cascade and starts reading as a queue.
     */
    delay: (i: number, step = stagger.row, cap = stagger.cap) =>
      ({ "--delay": `${Math.min(i, cap) * step}ms` }) as CSSProperties,
  };
}
