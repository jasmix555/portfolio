import { useEffect, useRef, useState } from "react";
import { ui } from "./i18n";

/**
 * REC ARCHIVE motion tokens — 3 curves, 4 durations. No springs, no bounce,
 * no parallax. Nothing fades: every reveal is a clip-path wipe, because print
 * doesn't fade in. Nothing exceeds 420ms, first paint included.
 *
 * The wipes themselves live in globals.css as `.wipe-down` / `.wipe-right`.
 * They are keyframe animations rather than JS-driven values on purpose: the
 * final state is the element's default, so a reveal that never runs — no JS,
 * a stalled frame loop, a crawler — leaves the content on the page instead of
 * clipping it away.
 */
export const ease = {
  snap: [0.2, 0, 0, 1] as [number, number, number, number], // block wipes, reveals
  drive: [0.65, 0, 0.35, 1] as [number, number, number, number], // position, nav
};

/** Seconds, for Framer Motion. */
export const dur = { flick: 0.08, quick: 0.18, move: 0.42 };

/** Milliseconds, for the CSS wipes' `--delay`. */
export const stagger = { row: 40 };


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

/**
 * Flips to true the first time the element is `amount` in view, then stops
 * watching — reveals happen once. Content is visible either way; this only
 * decides whether the wipe class gets attached.
 */
export function useInView<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return { ref, shown };
}
