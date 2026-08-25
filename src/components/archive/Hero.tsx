import type { CSSProperties } from "react";
import { ledger } from "@/data/records";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { bodyFace, headline, t, ui } from "./i18n";
import GlyphResolve from "./GlyphResolve";
import { stagger } from "./motion";

const CELLS = [
  {
    label: ui.ledger.hours,
    short: ui.ledger.hoursShort,
    value: ledger.hours,
    // Records with unmeasured hours are counted honestly: not at zero, and not
    // guessed — the total just says it is a floor.
    suffix: ledger.hoursOpen ? "+" : "",
  },
  {
    label: ui.ledger.records,
    short: ui.ledger.recordsShort,
    value: ledger.records,
    pad: 2,
  },
  {
    label: ui.ledger.awards,
    short: ui.ledger.awardsShort,
    value: ledger.awards,
    pad: 2,
  },
  {
    label: ui.ledger.reviews,
    short: ui.ledger.reviewsShort,
    value: ledger.reviews,
    pad: 2,
    signal: true,
  },
  {
    label: ui.ledger.years,
    short: ui.ledger.yearsShort,
    value: ledger.years,
    wide: true,
  },
];

/** Printed at its final value — the ledger never counts and never animates. */
function Figure({
  value,
  pad,
  signal,
  suffix = "",
}: {
  value: number | string;
  pad?: number;
  signal?: boolean;
  suffix?: string;
}) {
  const text =
    typeof value === "number"
      ? String(value).padStart(pad ?? 0, "0") + suffix
      : value;

  return (
    <div
      className={`mt-0 font-mono text-title font-bold leading-none tabular-nums lg:mt-2 lg:text-sub ${
        signal ? "text-signal" : "text-bone"
      }`}
    >
      {text}
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const { enabled } = useMotionEnabled();

  // The display word is localised too: EN signs the archive with the name, JP
  // names the thing. The resolve runs left→right across whatever it is, so the
  // line offsets are counted from the lines actually on screen.
  const lines = t(ui.hero.wordmark, lang).split("\n");
  const wordLength = lines.reduce((n, l) => n + l.length, 0);
  const offsets: number[] = [];
  lines.reduce((n, l) => (offsets.push(n), n + l.length), 0);

  const metaFace = lang === "jp" ? "font-jp" : "font-mono";

  return (
    <section
      id="index"
      className="flex min-h-svh flex-col px-5 pb-6 pt-20 lg:min-h-[900px] lg:px-24 lg:pb-9 lg:pt-[120px]"
    >
      <div className="relative flex flex-col flex-1 w-full mx-auto max-w-content">
        {/* The two visible column rules — the grid, admitted. Two things keep
            them part of the ground rather than marks on top of it:

            `-z-10` — an absolutely positioned element paints *above* its static
            siblings whatever the DOM order, so without it these hairlines drew
            across the wordmark, the ledger and the CTA row instead of behind
            them. Negative z puts them back with the scroll field.

            Both sit on a multiple of 96 — x=96 and x=1056 (`right-72`) — so
            each lands on the scroll field's own 96px lattice and reads as one
            emphasised column. The original x=1044 was off-lattice: it printed
            a second hairline 12px from a background rule, which reads as a
            stray line rather than a column. */}
        <span
          aria-hidden
          className="absolute -top-[64px] bottom-0 left-0 -z-10 hidden w-px bg-[rgba(242,240,235,0.10)] lg:block"
        />
        <span
          aria-hidden
          className="absolute -top-[64px] bottom-0 right-72 -z-10 hidden w-px bg-[rgba(242,240,235,0.10)] lg:block"
        />

        <div
          className={`flex flex-col text-label leading-[1.9] text-g6 lg:flex-row lg:gap-10 lg:leading-[1.6] ${metaFace}`}
        >
          <span>{t(ui.hero.role, lang)}</span>
          <span>{t(ui.hero.place, lang)}</span>
          <span className="text-signal">{t(ui.hero.open, lang)}</span>
        </div>

        <div className="mt-7 lg:mt-[52px] lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-16">
          <h1
            className={`${lang === "jp" ? "lg:-ml-2" : "lg:-ml-3.5"} ${headline(
              lang,
              "text-[88px] leading-[0.84] tracking-[-0.05em] lg:text-[196px] lg:tracking-[-0.055em]",
              "text-[44px] leading-[1.15] lg:text-[136px] lg:leading-[1.04]"
            )}`}
          >
            {lines.map((line, i) => (
              <span
                key={line}
                className={`block ${enabled ? "wipe-down" : ""}`}
                style={{ "--delay": `${i * stagger.row}ms` } as CSSProperties}
              >
                <GlyphResolve
                  text={line}
                  startAt={offsets[i]}
                  total={wordLength}
                />
              </span>
            ))}
          </h1>

          <div className="mt-6 flex flex-col gap-3 lg:mt-[26px] lg:border-t lg:border-g5 lg:pt-3.5">
            <span className={`hidden text-label text-g6 lg:block ${metaFace}`}>
              {t(ui.hero.fileLabel, lang)}
            </span>
            {/* One locale, complete. The other language is not printed beneath
                it — that was the gloss habit this system removes. */}
            <p className={`max-w-prose text-g7 ${bodyFace(lang)}`}>
              {t(ui.hero.file, lang)}
            </p>
          </div>
        </div>

        {/* Ledger — only real numbers, all of them derived from the records.
            Every cell is boxed: the 1px gap draws the rules between them and
            `border-x` closes the two outer edges, so it reads as a complete
            register rather than a strip that trails off at the margins. */}
        <div className="mt-8 grid grid-cols-2 gap-px border border-x-rule border-y-g5 bg-rule lg:mt-auto lg:grid-cols-5">
          {CELLS.map((c) => (
            <div
              key={c.label.en}
              className={`bg-ground px-3 py-3.5 text-center lg:py-[18px] ${
                c.wide ? "hidden lg:block" : ""
              }`}
            >
              <div
                className={`text-label ${metaFace} ${
                  c.signal ? "text-signal" : "text-g6"
                }`}
              >
                <span className="lg:hidden">{t(c.short, lang)}</span>
                <span className="hidden lg:inline">{t(c.label, lang)}</span>
              </div>
              <Figure
                value={c.value}
                pad={c.pad}
                suffix={c.suffix}
                signal={c.signal}
              />
            </div>
          ))}
        </div>

        <div className="mt-auto lg:mt-12 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="lg:flex lg:items-end lg:gap-16">
            {/* The concept line is typeset in each locale, never transliterated:
                Mincho carries the JP, Archivo sets the English. */}
            <p
              lang={lang === "jp" ? "ja" : "en"}
              className={`text-[21px] leading-[1.5] text-g7 lg:text-jp-accent ${
                lang === "jp"
                  ? "font-mincho"
                  : "font-semibold tracking-[-0.02em]"
              }`}
            >
              {t(ui.hero.spine, lang)}
            </p>
            <p
              className={`hidden text-label leading-[1.9] text-g6 lg:block ${metaFace}`}
            >
              {t(ui.hero.scroll, lang)}
            </p>
          </div>

          <div className="mt-4 flex gap-2 lg:mt-0 lg:gap-2.5">
            <a
              href="mailto:Jasmix555@gmail.com"
              className={`flex-1 border border-signal bg-signal px-4 py-4 text-center text-label font-semibold tracking-btn text-ground transition-colors duration-flick ease-snap hover:border-bone hover:bg-bone lg:flex-none lg:py-3 ${metaFace}`}
            >
              {t(ui.buttons.mail, lang)}
            </a>
            <a
              href="/cv_jason.pdf"
              className={`flex-1 border border-g5 px-4 py-4 text-center text-label tracking-btn text-bone transition-colors duration-flick ease-snap hover:border-bone hover:bg-bone hover:text-ground lg:flex-none lg:py-3 ${metaFace}`}
            >
              {t(ui.buttons.cv, lang)}
            </a>
          </div>

          <p
            className={`mt-3.5 text-label tracking-btn text-g5 lg:hidden ${metaFace}`}
          >
            {t(ui.hero.scroll, lang)}
          </p>
        </div>
      </div>
    </section>
  );
}
