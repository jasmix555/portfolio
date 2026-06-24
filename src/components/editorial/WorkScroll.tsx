import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { useLenis } from "@studio-freight/react-lenis";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";
import RevealImage from "./RevealImage";
import ProjectOverlay from "./ProjectOverlay";
import { works, type Work } from "@/data/works";

// Curated client work for the home page — featured first, then a few more.
// The full archive lives on /work.
const items = works
  .filter((w) => w.group === "work")
  .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity))
  .slice(0, 7);

const archiveCount = works.filter((w) => w.group === "work").length;
const year = (s: string) => s.match(/\d{4}/)?.[0] ?? s;

// strict grid: every card is an identical-size box — a clean cinematic reel
const CARD = "w-[78vw] sm:w-[360px]";
const CARD_IMG = "h-[240px] sm:h-[300px]";

export default function WorkScroll() {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  const lenis = useLenis();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<Work | null>(null);

  // True horizontal scroll area. Wheel → horizontal with lerp momentum; while
  // the pointer is inside the reel the PAGE scroll (Lenis) is paused so the
  // page no longer scrolls underneath — released at the track edges so the
  // vertical journey resumes. Mouse can also click-drag; touch swipes natively.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let target = el.scrollLeft;
    let raf = 0;
    const max = () => el.scrollWidth - el.clientWidth;

    const run = () => {
      const cur = el.scrollLeft;
      const next = cur + (target - cur) * 0.14;
      el.scrollLeft = next;
      if (Math.abs(target - next) > 0.4) raf = requestAnimationFrame(run);
      else {
        el.scrollLeft = target;
        raf = 0;
      }
    };

    const lockPage = () => lenis?.stop();
    const unlockPage = () => lenis?.start();

    const onEnter = () => lockPage();
    const onLeave = () => {
      if (!down) unlockPage();
    };

    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horizontal ? e.deltaX : e.deltaY;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max() - 1;
      const fwd = delta > 0;
      // at an edge in the travel direction → release the page so it scrolls on
      if ((fwd && atEnd) || (!fwd && atStart)) {
        unlockPage();
        return;
      }
      lockPage();
      e.preventDefault();
      if (!enabled) {
        el.scrollLeft += delta;
        return;
      }
      if (!raf) target = el.scrollLeft;
      target = Math.max(0, Math.min(max(), target + delta));
      if (!raf) raf = requestAnimationFrame(run);
    };

    // mouse click-drag (touch uses native scrolling). We only engage the drag
    // — and capture the pointer — AFTER the cursor passes a small threshold, so
    // a plain click still reaches the card / archive link underneath.
    let down = false;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let pid = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      dragging = false;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      pid = e.pointerId;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (!dragging && Math.abs(dx) > 6) {
        dragging = true;
        setDragging(true);
        lockPage();
        try {
          el.setPointerCapture(pid);
        } catch {}
      }
      if (dragging) {
        el.scrollLeft = startLeft - dx;
        target = el.scrollLeft;
      }
    };
    const onPointerUp = () => {
      if (!down) return;
      down = false;
      if (dragging) {
        dragging = false;
        setDragging(false);
        try {
          el.releasePointerCapture(pid);
        } catch {}
      }
    };
    // suppress the card / link click only if the user actually dragged
    const onClickCapture = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onScroll = () => {
      const m = max();
      setProgress(m > 0 ? el.scrollLeft / m : 0);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);
    onScroll();
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
      unlockPage();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, lenis]);

  return (
    <section id="work" className="bg-paper-2/60 py-24 md:py-32">
      {/* header */}
      <div className="mx-auto flex max-w-editorial items-end justify-between px-6 md:px-10">
        <div>
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-clay">
            <span className="h-px w-8 bg-clay" /> 01 — {t(ui.work.kicker, lang)}
          </div>
          <h2 className="heading-wrap font-serif text-[clamp(34px,6vw,76px)] font-semibold leading-[0.95] text-ink">
            {t(ui.work.title, lang)}
          </h2>
          <p className="mt-3 max-w-md text-sm text-ink-soft">
            {t(ui.work.desc, lang)}
          </p>
        </div>
        <Link
          href="/work"
          data-cursor
          className="group hidden shrink-0 items-center gap-2 border-b border-ink/30 pb-1 text-sm text-ink transition-colors hover:border-clay hover:text-clay md:inline-flex"
        >
          {t(ui.work.archive, lang)} ({archiveCount})
          <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* horizontal reel */}
      <div className="relative mt-12">
        {/* edge fades signalling overflow continuation */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper-2 to-transparent transition-opacity duration-300 md:w-20"
          style={{ opacity: progress > 0.02 ? 1 : 0 }}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper-2 to-transparent transition-opacity duration-300 md:w-20" style={{ opacity: progress < 0.98 ? 1 : 0 }} />

        <div
          ref={scrollerRef}
          className={`flex select-none items-start gap-6 overflow-x-auto overscroll-x-contain px-6 pb-6 md:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none [&_img]:[-webkit-user-drag:none] ${
            dragging ? "cursor-grabbing" : "md:cursor-grab"
          }`}
        >
          {items.map((w) => (
            <button
              key={w.title}
              type="button"
              onClick={() => setActive(w)}
              data-cursor
              className={`group relative block shrink-0 text-left ${CARD}`}
            >
              <div className={`relative ${CARD_IMG} w-full bg-paper-3`}>
                <RevealImage
                  src={w.thumbnail}
                  alt={w.title}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.07]"
                />
                <span className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper/85 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <FaArrowRight className="-rotate-45 text-sm" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="truncate font-serif text-xl leading-tight text-ink">
                  {w.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] text-ink-faint">
                  {year(w.dateCreated)}
                </span>
              </div>
              <div className="mt-1.5 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                {w.category.slice(0, 2).join(" · ")}
              </div>
            </button>
          ))}

          {/* tail panel → archive (same box width for grid consistency) */}
          <Link
            href="/work"
            data-cursor
            className={`group flex ${CARD} shrink-0 flex-col justify-center gap-3`}
            style={{ minHeight: "300px" }}
          >
            <span className="whitespace-pre-line font-serif text-3xl leading-tight text-ink underline-offset-8 group-hover:underline">
              {t(ui.work.archiveBig, lang)}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-clay">
              /work
              <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* progress + hint */}
        <div className="mx-auto mt-4 flex max-w-editorial items-center gap-4 px-6 md:px-10">
          <div className="relative h-px flex-1 bg-ink/15">
            <div
              className="absolute inset-y-0 left-0 bg-clay transition-[width] duration-150"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-ink-faint">
            {t(ui.work.hint, lang)} <FaArrowRightLong />
          </span>
        </div>
      </div>

      <ProjectOverlay work={active} onClose={() => setActive(null)} />
    </section>
  );
}
