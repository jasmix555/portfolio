import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { t, ui } from "./i18n";

// Deliberate, but not a wait: 600ms read as a stall on a field you already
// meant to open. The gesture still has to be held — it just costs less.
const HOLD_MS = 350;

/** The nine ragged bars, in the widths the board draws them. */
const BARS = [100, 96, 88, 99, 74, 92, 60, 84, 46];

/**
 * — Redacted postmortem, the signature mechanic —
 *
 * LEARNT and GROWTH are open. REGRET's text is always in the DOM — screen
 * readers get it unredacted, always — and sealed under **one opaque plate**.
 *
 * The plate is a single `#E5390A` fill at `inset:-8px`. The halftone, the nine
 * ragged bars and the misregistration ghost are its children, painted on top as
 * texture only. That ordering is the whole point: a stack of gapped bars leaks
 * glyphs between the lines the moment the mask pitch and the line-height
 * disagree, and no amount of tuning fixes it for every string. One plate cannot
 * leak, at any font size, in any locale.
 *
 * It lifts on a deliberate 600ms press-and-hold, because choosing to look at
 * your own failure should cost a gesture. Under reduced motion it becomes a 1px
 * signal outline with a single tap — same information, no timer, no wipe.
 */
export default function Redaction({
  children,
  keyEl,
  labelId,
}: {
  children: ReactNode;
  /** The `REGRET` chip — it shares the header row with the state label. */
  keyEl: ReactNode;
  /** The visible state label doubles as the control's accessible name. */
  labelId: string;
}) {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  const [state, setState] = useState<"sealed" | "holding" | "open">("sealed");
  const timer = useRef<number>();

  const clear = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  useEffect(() => clear, [clear]);

  // A finished hold and an aborted one both end in pointerup, so the release
  // handler only ever undoes a hold that is still running.
  const release = useCallback(() => {
    clear();
    setState((s) => (s === "holding" ? "sealed" : s));
  }, [clear]);

  const press = useCallback(() => {
    if (!enabled) {
      // Reduced motion: one tap, no timer.
      setState((s) => (s === "open" ? "sealed" : "open"));
      return;
    }
    setState((s) => {
      if (s === "open") return "sealed"; // click a revealed field to re-seal
      if (s === "holding") return s;
      clear();
      timer.current = window.setTimeout(() => setState("open"), HOLD_MS);
      return "holding";
    });
  }, [clear, enabled]);

  const label = t(
    !enabled
      ? state === "open"
        ? ui.redact.open
        : ui.redact.still
      : state === "open"
        ? ui.redact.open
        : state === "holding"
          ? ui.redact.holding
          : ui.redact.sealed,
    lang
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        {keyEl}
        <span
          id={labelId}
          className="font-mono text-[12px] tracking-meta text-g6"
          aria-live="polite"
        >
          {label}
        </span>
      </div>

      <div className="relative mt-4 select-none">
        {children}

        {/* The plate stays mounted so the reveal is a wipe and the re-seal is
            the same wipe run backwards — one transition, both directions. */}
        {enabled ? (
          <div
            aria-hidden
            style={{
              clipPath: state === "open" ? "inset(0 0 0 100%)" : "inset(0)",
            }}
            className="absolute -inset-2 bg-signal transition-[clip-path] duration-quick ease-snap"
          >
            <span className="absolute inset-0 bg-[radial-gradient(rgba(11,11,11,0.45)_1px,transparent_1.4px)] bg-[length:6px_6px]" />
            <span className="absolute inset-0 flex flex-col gap-1 overflow-hidden p-2">
              {BARS.map((w, i) => (
                <span
                  key={i}
                  style={{ width: `${w}%` }}
                  className={`h-[22px] shrink-0 bg-[rgba(11,11,11,0.13)] ${
                    i % 2 === 0
                      ? "bg-[radial-gradient(rgba(11,11,11,0.4)_1px,transparent_1.4px)] bg-[length:6px_6px]"
                      : ""
                  }`}
                />
              ))}
            </span>
            {/* 3px misregistration ghost — the plate printed slightly off. */}
            <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] left-[3px] top-[3px] bg-signal opacity-[0.55] mix-blend-screen" />
          </div>
        ) : (
          state !== "open" && (
            // Reduced motion: an outlined frame, not a fill. The word does the
            // work the plate was doing.
            <div
              aria-hidden
              className="absolute -inset-2 flex items-center justify-center border border-signal bg-ground"
            >
              <span className="px-2 text-center font-mono text-[12px] tracking-meta text-signal">
                {t(ui.redact.still, lang)}
              </span>
            </div>
          )
        )}

        {/* The gesture target. Covers the field so a press anywhere on it counts;
            the text underneath stays in the accessibility tree regardless. */}
        <button
          type="button"
          aria-labelledby={labelId}
          aria-pressed={state === "open"}
          onPointerDown={press}
          onPointerUp={release}
          onPointerCancel={release}
          onPointerLeave={release}
          onBlur={release}
          onKeyDown={(e) => {
            if (e.code !== "Space" || e.repeat) return;
            e.preventDefault(); // also stops the browser's keyup-click
            press();
          }}
          onKeyUp={(e) => {
            if (e.code === "Space") release();
          }}
          className="absolute -inset-2 z-[2] cursor-pointer"
        />

        {/* Progress rule — fills for exactly as long as the hold must last. */}
        {state === "holding" && (
          <span
            aria-hidden
            className="absolute -bottom-2 left-0 right-0 z-[3] h-[3px] bg-g3"
          >
            <span
              className="hold-fill block h-full origin-left bg-bone"
              // Driven from the same constant as the timer, so the rule cannot
              // finish before the plate lifts or keep filling after it has.
              style={{ animationDuration: `${HOLD_MS}ms` }}
            />
          </span>
        )}
      </div>
    </>
  );
}
