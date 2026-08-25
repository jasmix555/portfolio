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
    // The one cell in signal: four awards is the only figure here that is a
    // judgement rather than a count of what the archive holds.
    signal: true,
  },
  {
    label: ui.ledger.years,
    short: ui.ledger.yearsShort,
    value: ledger.years,
  },
];

/**
 * When the headline's own clip starts, in ms — the delay on `.load-2` in
 * globals.css. The glyph resolve is held until then so the two run together:
 * the resolve runs 640ms against a 420ms clip, so it is still going when the
 * wordmark is fully on screen — which is what the board means by the wordmark
 * resolving *alongside* the assembly rather than before it.
 */
const HEADLINE_AT = 360;

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
      className={`mt-0 whitespace-nowrap font-mono text-title font-bold leading-none tabular-nums lg:mt-2 lg:text-sub ${
        signal ? "text-signal" : "text-bone"
      }`}
    >
      {text}
    </div>
  );
}

export default function Hero({ assemble = false }: { assemble?: boolean }) {
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
  // First open only. The classes are printed by the server, so the assembly is
  // pure CSS from the first frame — nothing decides anything after paint, and
  // there is no state in which the page is shown and then taken away.
  // Named `load-*`, not `pl-*`: `pl-2` is Tailwind's padding-left utility and
  // would silently indent the hero the moment anything else in the project used
  // it.
  const pl = (n: 2 | 3 | 4) => (assemble ? ` load-${n}` : "");

  return (
    <section
      id="index"
      className="flex min-h-svh flex-col px-5 pb-6 pt-20 lg:min-h-[900px] lg:px-24 lg:pb-9 lg:pt-[120px]"
    >
      <div className="relative flex flex-col flex-1 w-full mx-auto max-w-content">


        <div
          className={`flex flex-col text-label leading-[1.9] text-g6 lg:flex-row lg:gap-10 lg:leading-[1.6] ${metaFace}${pl(2)}`}
        >
          <span>{t(ui.hero.role, lang)}</span>
          <span>{t(ui.hero.place, lang)}</span>
          <span className="text-signal">{t(ui.hero.open, lang)}</span>
        </div>

        <div
          className={`mt-7 lg:mt-[52px] lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-16${pl(2)}`}
        >
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
                // During the assembly the wordmark's own wipe would run under
                // the headline's, so the parent owns the entrance and the lines
                // just sit inside it. Off the assembly — a shared record link —
                // this is still the hero's entrance.
                className={`block ${enabled && !assemble ? "wipe-down" : ""}`}
                style={{ "--delay": `${i * stagger.row}ms` } as CSSProperties}
              >
                <GlyphResolve
                  text={line}
                  startAt={offsets[i]}
                  total={wordLength}
                  delayMs={assemble ? HEADLINE_AT : 0}
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
            the border closes the outer edges, so it reads as a complete
            register rather than a strip that trails off at the margins. One
            grey for the frame and the divisions alike — the g5 top and bottom
            it used to carry made the outer edge a different rule from the
            inner ones, which is a hierarchy the register does not have.
            Four cells, each a distinct fact: `REVIEWS WRITTEN` was
            `records.filter(hasReview).length`, identical to `RECORDS FILED`
            for as long as every published record is reviewed, so it printed
            the same fact twice. Four also divides on a phone, where five left
            a cell stranded and the years had to be hidden to hide it. */}
        <div
          className={`mt-8 grid grid-cols-2 border border-rule lg:mt-auto lg:grid-cols-4${pl(3)}`}
        >
          {CELLS.map((c) => (
            <div
              key={c.label.en}
              // The divisions are borders on the cells, not a 1px grid gap with
              // the container's colour showing through. 1248px of content less
              // the frame is 1246, and four `1fr` columns with three 1px gaps
              // put the middle divider at x=622.5: half its alpha on each of
              // two device pixels, which at 0.18 is nothing at all. The outer
              // two land on .75 and .25 and survive, which is why exactly one
              // line went missing. Borders get snapped to whole device pixels,
              // so they cannot evaporate at a fractional offset.
              className="border-rule bg-ground px-5 py-3.5 text-center [&:nth-child(2n)]:border-l [&:nth-child(n+3)]:border-t lg:border-l lg:border-t-0 lg:first:border-l-0"
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

        <div
          className={`mt-auto lg:mt-12 lg:flex lg:items-end lg:justify-between lg:gap-10${pl(4)}`}
        >
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
