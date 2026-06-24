import {
  CSSProperties,
  ElementType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMotionEnabled } from "../MotionToggle";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** stagger chars up into place when scrolled into view */
  reveal?: boolean;
  /** chars push away from the cursor like ink displaced by a fingertip */
  repulse?: boolean;
  /** repulse radius in px */
  radius?: number;
  /** repulse strength in px */
  strength?: number;
  style?: CSSProperties;
};

/**
 * Editorial display type that is split per-character so it can (a) stagger in
 * on scroll and (b) deform away from the cursor on hover. Words are kept whole
 * (each word is an inline-block) so lines never break mid-word — important for
 * the bilingual EN / JP headlines in the brief.
 *
 * Two nested spans per char: the outer handles the reveal transform, the inner
 * handles the cursor repulse, so the two never fight over `transform`.
 */
export default function KineticText({
  text,
  as: Tag = "span",
  className = "",
  reveal = false,
  repulse = false,
  radius = 120,
  strength = 26,
  style,
}: Props) {
  const { enabled } = useMotionEnabled();
  const wrapRef = useRef<HTMLElement | null>(null);
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [shown, setShown] = useState(false);
  const [fine, setFine] = useState(false);

  // words → chars, with a global char index for stagger timing
  const words = useMemo(() => {
    let gi = 0;
    return text.split(" ").map((word) => ({
      chars: Array.from(word).map((c) => ({ c, i: gi++ })),
    }));
  }, [text]);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // reveal on scroll
  useEffect(() => {
    if (!reveal || !enabled) {
      setShown(true);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal, enabled]);

  // cursor repulse
  useEffect(() => {
    if (!repulse || !enabled || !fine) return;
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      for (const span of innerRefs.current) {
        if (!span) continue;
        const r = span.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const f = (1 - dist / radius) * strength;
          const ang = Math.atan2(dy, dx);
          span.style.transform = `translate(${Math.cos(ang) * f}px, ${
            Math.sin(ang) * f
          }px)`;
        } else {
          span.style.transform = "translate(0px, 0px)";
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      for (const span of innerRefs.current) {
        if (span) span.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [repulse, enabled, fine, radius, strength]);

  innerRefs.current = [];

  return (
    <Tag
      ref={wrapRef as never}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.chars.map(({ c, i }) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: shown ? "translateY(0)" : "translateY(0.55em)",
                opacity: shown ? 1 : 0,
                transition: enabled
                  ? `transform 0.7s cubic-bezier(.2,.8,.2,1) ${
                      i * 0.022
                    }s, opacity 0.6s ease ${i * 0.022}s`
                  : "none",
              }}
            >
              <span
                ref={(node) => {
                  innerRefs.current[i] = node;
                }}
                style={{
                  display: "inline-block",
                  transition: "transform 0.45s cubic-bezier(.2,.8,.2,1)",
                  willChange: repulse ? "transform" : undefined,
                }}
              >
                {c}
              </span>
            </span>
          ))}
          {/* real space between words so lines wrap between words only */}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
