import { useMemo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  awardCount,
  ledger,
  records,
  totalHours,
  type RecordRow,
} from "@/data/records";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { headline, t, ui, type Lang, type Pair } from "./i18n";
import { dur, ease, useReveal } from "./motion";
import type { ModalTarget, Query } from "./useArchiveRoute";

const COLS =
  "grid-cols-[52px_88px_minmax(0,1fr)_minmax(0,260px)_150px_96px_150px]";

type Sort = "recent" | "hours" | "awards" | "az";
type Filter = "all" | "apps" | "concept" | "awarded";

const SORTS: { key: Sort; label: Pair }[] = [
  { key: "recent", label: ui.records.sortRecent },
  { key: "hours", label: ui.records.sortHours },
  { key: "awards", label: ui.records.sortAwards },
  { key: "az", label: ui.records.sortAz },
];

const FILTERS: {
  key: Filter;
  label: Pair;
  match: (r: RecordRow) => boolean;
}[] = [
  { key: "all", label: ui.records.filterAll, match: () => true },
  { key: "apps", label: ui.records.filterApps, match: (r) => !r.concept },
  {
    key: "concept",
    label: ui.records.filterConcept,
    match: (r) => Boolean(r.concept),
  },
  {
    key: "awarded",
    label: ui.records.filterAwarded,
    match: (r) => awardCount(r) > 0,
  },
];

/** `REC 04 · 2024/11—2025/02 · 企業賞` — the mobile row's whole first line. */
const metaLine = (r: RecordRow, lang: Lang) =>
  [
    `REC ${r.rec}`,
    r.period,
    r.concept ? t(ui.records.concept, lang) : null,
    t(r.award, lang) !== "—" ? t(r.award, lang) : null,
  ]
    .filter(Boolean)
    .join(" · ");

/** 88×56 contact-sheet crop, or the empty plate for a record with no capture. */
function Thumb({ src }: { src: string }) {
  if (!src) {
    return (
      <span className="flex h-14 w-[88px] items-center justify-center border border-rule font-mono text-[12px] tracking-[0.1em] text-g5">
        —
      </span>
    );
  }
  return (
    // Greyscale at rest; on row hover it takes its colour back, gains a bone
    // edge and grows 1.12× from its centre, so the ~5px of growth splits across
    // both sides of the 20px gutter and never crowds the title.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={88}
      height={56}
      loading="lazy"
      className="relative z-[1] block h-14 w-[88px] object-cover brightness-[0.85] contrast-125 grayscale outline-bone transition-[transform,filter] duration-quick ease-snap group-hover:z-[5] group-hover:scale-[1.12] group-hover:outline group-hover:outline-1 group-hover:brightness-100 group-hover:contrast-[1.06] group-hover:saturate-[1.04] group-hover:grayscale-0"
    />
  );
}

export default function Records({
  onOpen,
  query,
  onQuery,
}: {
  onOpen: (next: NonNullable<ModalTarget>) => void;
  query: Query;
  onQuery: (patch: Record<string, string | null>) => void;
}) {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();

  // The controls live in the URL, so a sorted, filtered view is a link you can
  // send. Anything the URL offers is checked against the keys that exist —
  // `?sort=' OR 1=1` just gets the default, it does not become a state value.
  const sort = SORTS.some((s) => s.key === query.sort)
    ? (query.sort as Sort)
    : "recent";
  const filter = FILTERS.some((f) => f.key === query.filter)
    ? (query.filter as Filter)
    : "all";
  // Defaults are dropped rather than written, so a plain visit stays `/`.
  const setSort = (key: Sort) =>
    onQuery({ sort: key === "recent" ? null : key });
  const setFilter = (key: Filter) =>
    onQuery({ filter: key === "all" ? null : key });

  const rows = useMemo(() => {
    const match = FILTERS.find((f) => f.key === filter)!.match;
    const r = records.filter(match);
    if (sort === "hours")
      return [...r].sort((a, b) => b.hoursValue - a.hoursValue);
    if (sort === "awards")
      return [...r].sort((a, b) => awardCount(b) - awardCount(a));
    if (sort === "az")
      // Sorted in the locale actually on screen, not in English behind it.
      return [...r].sort((a, b) => a.title[lang].localeCompare(b.title[lang]));
    return r; // file order
  }, [sort, filter, lang]);

  // Three groups. Inside the header nothing carries an explicit delay: the
  // token classes already order themselves — rule at 0, head at 80ms, label
  // and meta at 160ms — so the sequence lives in one place, in the CSS.
  const head = useReveal<HTMLElement>();
  const table = useReveal<HTMLDivElement>();
  const stack = useReveal<HTMLDivElement>();

  // Reordering is a FLIP on y only — Framer's `layout` is exactly that.
  const flip = enabled
    ? {
        layout: "position" as const,
        transition: { duration: dur.move, ease: ease.drive },
      }
    : {};

  const titleFace =
    lang === "jp"
      ? "font-jp text-[30px] font-bold leading-[1.15] tracking-[-0.01em]"
      : "text-title";

  const open = (r: RecordRow) => onOpen({ kind: "record", id: r.slug });

  return (
    <section
      id="records"
      className="px-5 pb-16 pt-16 lg:px-24 lg:pb-[72px] lg:pt-16"
    >
      <div className="mx-auto w-full max-w-content">
        {/* The 3px rule is an element rather than a border because it draws
            itself: scaleX from the left, with the head 80ms behind it. A
            border cannot be animated from nothing, and the rule arriving
            first is what makes the head look filed rather than dropped. */}
        <header
          ref={head.ref}
          className="flex flex-col pb-3.5 lg:flex-row lg:items-end lg:justify-between lg:gap-6"
        >
          <div className="min-w-0">
            <div
              className={`font-mono text-label text-signal ${head.rv("text")}`}
            >
              {t(ui.records.label, lang)}
            </div>
            {/* At 1440 the head and the meta column together fill the content
                width exactly, so the head only earns its single line there. */}
            <h2
              className={`mt-2.5 whitespace-pre-line ${headline(
                lang,
                "text-sub leading-[0.9] lg:text-head lg:leading-[0.86]",
                "text-[32px] leading-[1.2] lg:text-[60px] lg:leading-[1.06]"
              )} min-[1440px]:whitespace-nowrap ${head.rv("head")}`}
            >
              {t(ui.records.head, lang)}
            </h2>
          </div>

          {/* Header meta is pure metadata — sort and filter get their own bar. */}
          <div
            className={`mt-2 text-label leading-[1.9] tracking-meta text-g6 lg:mt-0 lg:text-right min-[1440px]:shrink-0 min-[1440px]:whitespace-nowrap ${
              lang === "jp" ? "font-jp" : "font-mono"
            } ${head.rv("text")}`}
          >
            <div className="hidden lg:block">
              {lang === "jp"
                ? `${ledger.records}作品 · ${totalHours} 時間 · 2023—2026`
                : `${ledger.records} RECORDS · ${totalHours} HRS · 2023—2026`}
            </div>
            <div>{t(ui.records.nda, lang)}</div>
          </div>
        </header>
        <span
          aria-hidden
          className={`block h-[3px] bg-bone ${head.rv("rule")}`}
        />

        {/* — Sort / filter control bar — */}
        <div className="mt-8 hidden items-center justify-between gap-10 border-b border-rule border-t-g5 py-3.5 lg:flex lg:border-t">
          <div className="flex items-center gap-5">
            <span
              className={`text-label text-g6 ${
                lang === "jp" ? "font-jp" : "font-mono"
              }`}
            >
              {t(ui.records.sort, lang)}
            </span>
            <div className="flex">
              {SORTS.map((s) => {
                const on = sort === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSort(s.key)}
                    aria-pressed={on}
                    className={`border px-4 py-2.5 text-label tracking-btn transition-colors duration-flick ease-snap [&:not(:first-child)]:border-l-0 ${
                      lang === "jp" ? "font-jp" : "font-mono"
                    } ${
                      on
                        ? "border-bone bg-bone font-semibold text-ground"
                        : "border-g5 text-g7 hover:text-bone"
                    }`}
                  >
                    {t(s.label, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span
              className={`text-label text-g6 ${
                lang === "jp" ? "font-jp" : "font-mono"
              }`}
            >
              {t(ui.records.filter, lang)}
            </span>
            <div className="flex gap-2">
              {FILTERS.map((f) => {
                const on = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={on}
                    className={`border px-2.5 py-1 text-label tracking-btn transition-colors duration-flick ease-snap ${
                      lang === "jp" ? "font-jp" : "font-mono"
                    } ${
                      on
                        ? "border-bone text-bone"
                        : "border-[rgba(242,240,235,0.28)] text-g6 hover:text-bone"
                    }`}
                  >
                    {t(f.label, lang)}
                  </button>
                );
              })}
            </div>
            <span
              aria-live="polite"
              className={`text-label tracking-meta text-g5 ${
                lang === "jp" ? "font-jp" : "font-mono"
              }`}
            >
              {lang === "jp" ? `${rows.length}件表示` : `SHOWING ${rows.length}`}
            </span>
          </div>
        </div>

        {/* — Table: the design width and up. Below it the title column cannot
            hold a 34px record title, so the stack takes over. — */}
        <div className="hidden min-[1440px]:block">
          <div
            className={`grid ${COLS} gap-5 border-b border-g5 py-3 text-label text-g6 ${
              lang === "jp" ? "font-jp" : "font-mono"
            }`}
          >
            <span className="font-mono">REC</span>
            <span />
            <span>{t(ui.records.colTitle, lang)}</span>
            <span className="font-mono">STACK</span>
            <span>{t(ui.records.colPeriod, lang)}</span>
            <span>{t(ui.records.colHours, lang)}</span>
            <span>{t(ui.records.colAward, lang)}</span>
          </div>

          <div ref={table.ref}>
            {rows.map((r, i) => (
              <motion.button
                key={r.slug}
                type="button"
                onClick={() => open(r)}
                {...flip}
                style={table.delay(i)}
                className={`group relative grid ${COLS} w-full items-center gap-5 border-b py-3.5 text-left transition-colors duration-flick ease-snap hover:bg-g2 ${
                  i === rows.length - 1 ? "border-g5" : "border-rule"
                } ${table.rv("row")}`}
              >
                <span className="font-mono text-[12px] text-g5 transition-colors duration-flick ease-snap group-hover:text-signal">
                  {r.rec}
                </span>
                <Thumb src={r.work.thumbnail} />
                <span className="min-w-0">
                  {/* The rule's space is reserved at rest, so the title's
                      metrics never move — no reflow, no wrap. */}
                  <span
                    className={`whitespace-nowrap border-b-2 border-transparent pb-px transition-colors duration-flick ease-snap group-hover:border-signal ${titleFace}`}
                  >
                    {t(r.title, lang)}
                  </span>{" "}
                  {r.concept && (
                    <span
                      className={`whitespace-nowrap border border-g5 px-1.5 py-0.5 text-[12px] tracking-btn text-g6 ${
                        lang === "jp" ? "font-jp" : "font-mono"
                      }`}
                    >
                      {t(ui.records.concept, lang)}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[12px] text-g7">{r.stack}</span>
                <span className="font-mono text-[12px] text-g7">{r.period}</span>
                <span className="font-mono text-[13px] tabular-nums text-bone">
                  {r.hours}
                </span>
                {/* The award, or nothing. A review tick that is true of every
                    row tells the reader nothing, so the column doesn't print
                    one. */}
                <span
                  className={`text-[12px] text-g6 transition-colors duration-flick ease-snap group-hover:text-g7 ${
                    lang === "jp" ? "font-jp" : "font-mono"
                  }`}
                >
                  {t(r.award, lang)}
                </span>
              </motion.button>
            ))}
          </div>

          <div
            className={`mt-4 flex justify-between gap-10 text-label tracking-meta text-g5 ${
              lang === "jp" ? "font-jp" : "font-mono"
            }`}
          >
            <span>{t(ui.records.footer, lang)}</span>
            <span className="shrink-0">
              {lang === "jp"
                ? `合計 ${totalHours} 時間`
                : `TOTAL ${totalHours} HRS`}
            </span>
          </div>
        </div>

        {/* — Stack: below the design width. The table is dropped, not scrolled
            sideways. — */}
        <div ref={stack.ref} className="mt-5 min-[1440px]:hidden">
          {rows.map((r, i) => (
            <motion.button
              key={r.slug}
              type="button"
              onClick={() => open(r)}
              {...flip}
              style={stack.delay(i)}
              className={`grid w-full grid-cols-[minmax(0,1fr)_64px] gap-3 border-t py-3.5 text-left ${
                i === 0 ? "border-g5" : "border-rule"
              } ${i === rows.length - 1 ? "border-b border-b-g5" : ""} ${stack.rv("row")}`}
            >
              <div className="min-w-0">
                <div
                  className={`text-[12px] text-g5 ${
                    lang === "jp" ? "font-jp" : "font-mono"
                  }`}
                >
                  {metaLine(r, lang)}
                </div>
                <div className={`leading-[1.1] ${titleFace}`}>
                  {t(r.title, lang)}
                </div>
                <div className="font-mono text-[12px] tracking-[0.1em] text-g6">
                  {r.stack}
                </div>
              </div>
              <div className="text-right font-mono text-[13px] tabular-nums text-bone">
                {r.hours}
                <div className="text-[12px] text-g5">
                  {t(ui.records.colHours, lang)}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div
          className={`mt-3 flex flex-col gap-1 text-label tracking-meta text-g5 min-[1440px]:hidden ${
            lang === "jp" ? "font-jp" : "font-mono"
          }`}
        >
          <span>{t(ui.records.tapFooter, lang)}</span>
          <span>
            {lang === "jp"
              ? `合計 ${totalHours} 時間`
              : `TOTAL ${totalHours} HRS`}
          </span>
        </div>
      </div>
    </section>
  );
}
