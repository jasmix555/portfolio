import { useCallback, useEffect, useRef } from "react";
import Head from "next/head";
import { bySlug, ideas, records } from "@/data/records";
import { byPhase, phases } from "@/data/profile";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { t, ui } from "./i18n";
import { hrefFor, type ModalTarget } from "./useArchiveRoute";
import RecordBody from "./RecordBody";
import YearBody from "./YearBody";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * — One modal, three kinds —
 *
 * A record, a concept and a timeline year are the same panel; only the fields
 * differ. Everything structural — the route, the scrim, the fixed bar, the
 * internal scroll, the focus trap, `← →`, ESC — lives here exactly once, so the
 * three kinds cannot drift apart.
 *
 * The panel scrolls internally rather than growing the page: the index behind
 * it keeps its scroll position, which is the whole reason the modal exists
 * instead of a route change.
 */
export default function Modal({
  target,
  onClose,
  onStep,
  onOpen,
}: {
  target: NonNullable<ModalTarget>;
  onClose: () => void;
  onStep: (next: NonNullable<ModalTarget>) => void;
  onOpen: (next: NonNullable<ModalTarget>) => void;
}) {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  const panel = useRef<HTMLDivElement>(null);

  // Siblings for `← →`. Each kind steps within its own run, never across.
  const ids =
    target.kind === "record"
      ? records.map((r) => r.slug)
      : target.kind === "concept"
        ? ideas.map((r) => r.slug)
        : phases.map((p) => p.id);
  const index = ids.indexOf(target.id);

  const step = useCallback(
    (delta: number) => {
      if (index < 0 || ids.length < 2) return;
      const next = (index + delta + ids.length) % ids.length;
      onStep({ kind: target.kind, id: ids[next] });
    },
    [ids, index, onStep, target.kind]
  );

  // Page scroll is locked while the panel is open; the panel itself carries
  // `data-lenis-prevent` so a wheel inside it scrolls the panel, not the page.
  useEffect(() => {
    document.documentElement.classList.add("modal-open");
    return () => document.documentElement.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    // Whatever opened the modal gets focus back when it closes — the row.
    const opener = document.activeElement as HTMLElement | null;
    el.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") return step(-1);
      if (e.key === "ArrowRight") return step(1);
      if (e.key !== "Tab") return;

      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose, step]);

  const record =
    target.kind === "year" ? undefined : bySlug(target.id);
  const year = target.kind === "year" ? byPhase(target.id) : undefined;

  // A URL that names nothing is a 404, not an empty panel.
  if (target.kind === "year" ? !year : !record) return null;

  const kindLabel = t(
    target.kind === "record"
      ? ui.modal.kindRecord
      : target.kind === "concept"
        ? ui.modal.kindConcept
        : ui.modal.kindYear,
    lang
  );
  const stepLabel = t(
    target.kind === "record"
      ? ui.modal.stepRecord
      : target.kind === "concept"
        ? ui.modal.stepConcept
        : ui.modal.stepYear,
    lang
  );
  // A phase label is two mono lines on the page; as a title it is one span.
  const heading = record
    ? t(record.title, lang)
    : year!.label.split("\n").join("–");
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    ids.length
  ).padStart(2, "0")}`;

  return (
    <div
      // Backdrop dismissal lives on the overlay itself: a click that lands on
      // the overlay and not on the panel closes. The dedicated scrim element
      // that used to sit here was a `<button>` with `aria-hidden` — a control
      // that is not a control — where ESC and CLOSE ✕ are the real affordances.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden p-5 pt-10 lg:p-10"
      role="presentation"
    >
      <Head>
        <title>{`Jason Ng — ${heading}`}</title>
      </Head>

      {/* Scrim: the index stays visible underneath, dimmed and screened. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-[rgba(11,11,11,0.82)] bg-[radial-gradient(rgba(11,11,11,0.6)_1px,transparent_1.4px)] bg-[length:6px_6px] ${
          enabled ? "scrim-in" : ""
        }`}
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${kindLabel} ${counter} — ${heading}`}
        tabIndex={-1}
        data-lenis-prevent
        className={`relative flex max-h-[calc(100vh-80px)] w-full max-w-[1288px] flex-col border border-bone bg-ground px-5 pb-10 pt-6 outline-none lg:px-16 lg:pb-14 lg:pt-9 ${
          enabled ? "wipe-down" : ""
        }`}
      >
        {/* Modal bar — fixed while the record body scrolls under it. */}
        <div className="mb-6 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-rule pb-3.5 font-mono text-label text-g6 lg:mb-7">
          <span className="flex flex-wrap items-center gap-3 lg:gap-5">
            <span className="text-bone">
              {kindLabel} {counter}
            </span>
            <span className="hidden lg:inline">{hrefFor(target)}</span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="hidden border border-g5 px-2 py-1 tracking-btn text-g7 lg:inline">
              ESC
            </span>
            <button
              type="button"
              onClick={onClose}
              className="bg-bone px-2.5 py-1 font-semibold tracking-btn text-ground transition-colors duration-flick ease-snap hover:bg-signal"
            >
              {t(ui.modal.close, lang)}
            </button>
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {record ? (
            <RecordBody record={record} stepLabel={stepLabel} />
          ) : (
            <YearBody year={year!} stepLabel={stepLabel} onOpen={onOpen} />
          )}
        </div>
      </div>
    </div>
  );
}
