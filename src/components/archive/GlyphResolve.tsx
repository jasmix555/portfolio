import { useEffect, useLayoutEffect, useState } from "react";
import { useMotionEnabled } from "../MotionToggle";

/**
 * Glyph resolve — the only entrance on the site.
 *
 * No loading screen, no counter, no curtain: the page paints complete on the
 * first frame and the wordmark locks out of mono glyphs in discrete steps. It
 * should read as a terminal locking onto a record, not as an animation playing
 * — hence steps rather than easing, and no movement or fade of any kind.
 *
 * The glyph set is IBM Plex Mono's, never the display face: Archivo has no
 * block-drawing characters, so a scramble rendered in it would be tofu. That
 * means the scrambling character is a different width from the one it stands
 * in for, so each slot reserves the *final* character's width and paints the
 * mono glyph over it — the line never reflows while it resolves.
 */
const GLYPHS = "▚▞▓▒░#%&$@*+=-<>/|01";

// First load: 6 × 70 = 420ms. A route change runs 3 × 60 = 180ms with at most
// three glyphs live at once, so the incoming heading resolves without the page
// reading as though it reloaded.
const STEPS = 6;
const STEP_MS = 70;

// Pre-paint on the client, no-op on the server — so the server (and anything
// without JS) keeps the finished wordmark and the client can drop straight
// into the scramble without a frame of the real text showing first.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function GlyphResolve({
  text,
  /** Character offset within a multi-line wordmark, so it locks left→right. */
  startAt = 0,
  total = text.length,
  steps = STEPS,
  stepMs = STEP_MS,
  /** Cap on how many glyphs scramble at once — a sweeping band, not a wall. */
  maxBlocks,
  className = "",
}: {
  text: string;
  startAt?: number;
  total?: number;
  steps?: number;
  stepMs?: number;
  maxBlocks?: number;
  className?: string;
}) {
  const { enabled } = useMotionEnabled();
  const [step, setStep] = useState(steps);
  const [seed, setSeed] = useState(0);

  useIsoLayoutEffect(() => {
    if (!enabled) {
      setStep(steps);
      return;
    }
    setStep(0);

    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setStep(n);
      setSeed((s) => s + 1);
      if (n >= steps) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [enabled, text, steps, stepMs]);

  // Once every character has locked there is nothing to stage: render the
  // word as plain text so the served markup, selection and assistive tech all
  // see "JASON" rather than five separate spans.
  if (step >= steps) return <span className={className}>{text}</span>;

  // One character group locks per step, left to right across the whole wordmark.
  const locked = Math.ceil((step / steps) * total) - startAt;
  const ceiling = maxBlocks === undefined ? Infinity : locked + maxBlocks;

  return (
    <span className={className}>
      {/* The staging is decoration — half of it is placeholder glyphs and
          width-holding copies, so the whole run is hidden from assistive tech
          and the real word is exposed once, below. */}
      <span aria-hidden>
        {[...text].map((char, i) => {
          if (char === " " || i < locked || i >= ceiling)
            return <span key={i}>{char}</span>;
          // The slot holds the final character's width; the mono glyph paints
          // over it, so nothing moves as the wordmark resolves.
          const glyph =
            GLYPHS[(i * 7 + seed * 13 + startAt * 3) % GLYPHS.length];
          return (
            <span key={i} className="relative inline-block">
              <span className="invisible">{char}</span>
              <span className="absolute inset-0 font-mono">{glyph}</span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
