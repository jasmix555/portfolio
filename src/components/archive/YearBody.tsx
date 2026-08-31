import { records } from "@/data/records";
import type { Phase } from "@/data/profile";
import { useLang } from "./LanguageProvider";
import { bodyFace, t, ui } from "./i18n";
import type { ModalTarget } from "./useArchiveRoute";

/**
 * The YEAR kind — a phase now, not a single year. Same panel as a record,
 * fewer fields: what the stretch was, what shipped in it, and the records
 * filed under it, each openable, so the track is a way into the archive
 * rather than a list beside it.
 */
export default function YearBody({
  year,
  stepLabel,
  onOpen,
}: {
  year: Phase;
  stepLabel: string;
  onOpen: (next: NonNullable<ModalTarget>) => void;
}) {
  const { lang } = useLang();
  const filed = records.filter((r) => r.year >= year.from && r.year <= year.to);
  const span =
    year.from === year.to ? `${year.from}` : `${year.from}–${year.to}`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-g5 pb-5">
        <div className="flex items-end gap-4">
          {/* A span of years is a number, not copy — Latin in both locales. */}
          <h2 className="text-[40px] font-extrabold tracking-[-0.045em] [font-stretch:112%] lg:text-[64px]">
            {span}
          </h2>
          {year.now && (
            <span className="mb-2 bg-signal px-1.5 py-0.5 font-mono text-[12px] font-semibold tracking-btn text-ground">
              {t(ui.profile.now, lang)}
            </span>
          )}
        </div>
        <span className="font-mono text-label text-g5">{stepLabel}</span>
      </div>

      <p className={`mt-8 max-w-prose text-g7 ${bodyFace(lang)}`}>
        {t(year.text, lang)}
      </p>

      {year.repos.length > 0 && (
        <div className="mt-10 grid gap-2 border-t border-rule pt-4 lg:grid-cols-[110px_1fr] lg:gap-6">
          <span className="font-mono text-label text-g6">
            {t(ui.modal.repos, lang)}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {year.repos.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-g5 font-mono text-[13px] text-g7 transition-colors duration-flick ease-snap hover:border-signal hover:text-signal"
              >
                {r.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 border-t-[3px] border-bone pt-6">
        <span className="font-mono text-label text-g6">
          {t(ui.modal.filedThisYear, lang)}
        </span>

        {filed.length === 0 ? (
          <p className="mt-4 font-mono text-[13px] text-g5">
            {t(ui.modal.noneThisYear, lang)}
          </p>
        ) : (
          <div className="mt-3">
            {filed.map((r, i) => (
              <button
                key={r.slug}
                type="button"
                onClick={() => onOpen({ kind: "record", id: r.slug })}
                className={`group flex w-full items-baseline justify-between gap-5 border-t border-rule py-3.5 text-left transition-colors duration-flick ease-snap hover:bg-g2 ${
                  i === filed.length - 1 ? "border-b border-b-g5" : ""
                }`}
              >
                <span className="flex min-w-0 items-baseline gap-3 lg:gap-4">
                  <span className="shrink-0 font-mono text-[12px] text-g5 transition-colors duration-flick ease-snap group-hover:text-signal">
                    {r.rec}
                  </span>
                  {/* `min-w-0`, or the row cannot shrink below the width of the
                      title: `word-break: keep-all` is set globally for kinsoku,
                      which leaves a Japanese title one unbreakable run as far as
                      intrinsic sizing is concerned, and a flex item at
                      `min-width: auto` sizes to exactly that. */}
                  <span
                    className={`min-w-0 border-b-2 border-transparent pb-px transition-colors duration-flick ease-snap group-hover:border-signal ${
                      lang === "jp"
                        ? "font-jp jp-wrap text-[19px] font-bold leading-[1.4] sm:text-[24px] lg:text-title"
                        : "text-[22px] font-semibold leading-[1.2] sm:text-[26px] lg:text-title"
                    }`}
                  >
                    {t(r.title, lang)}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[13px] tabular-nums text-bone">
                  {r.hours}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
