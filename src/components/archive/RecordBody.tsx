import { caseStudies } from "@/data/caseStudies";
import { links, review, summary, type RecordRow } from "@/data/records";
import { useLang } from "./LanguageProvider";
import { bodyFace, headline, t, ui, type Pair } from "./i18n";
import Redaction from "./Redaction";
import GlyphResolve from "./GlyphResolve";

/** Route change: 3 steps of 60ms, at most 3 glyphs live. */
const ROUTE_RESOLVE = { steps: 3, stepMs: 60, maxBlocks: 3 };

/** `PERIOD` / `2024/11—2025/02` — one cell of the metadata strip. */
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    // `min-w-0`: a grid item defaults to `min-width: auto`, and with the
    // global `word-break: keep-all` a Japanese award or role is one
    // unbreakable run — the track would size to it and push the strip past the
    // panel on a phone.
    <div className="min-w-0 bg-ground px-4 py-4 lg:first:pl-0 lg:last:pr-0">
      <div className="font-mono text-label text-g6">{label}</div>
      <div className="mt-1.5 font-mono text-[13px] text-bone">{children}</div>
    </div>
  );
}

/** `PROBLEM` + its paragraph — a `110px 1fr` pair over a hairline. */
function Field({ label, text }: { label: string; text: string }) {
  const { lang } = useLang();
  return (
    <div className="grid gap-2 border-t border-rule pt-4 lg:grid-cols-[110px_1fr] lg:gap-6">
      <span className="font-mono text-label text-g6">{label}</span>
      <p className={`max-w-prose text-g7 ${bodyFace(lang)}`}>{text}</p>
    </div>
  );
}

/** One of the three review panels. REGRET is the one that arrives sealed. */
function ReviewPanel({
  label,
  text,
  slug,
  sealed = false,
}: {
  label: string;
  text: Pair | null;
  slug: string;
  sealed?: boolean;
}) {
  const { lang } = useLang();
  const keyEl = (
    <span
      className={`px-1.5 py-0.5 font-mono text-[12px] tracking-btn ${
        sealed ? "bg-signal font-semibold text-ground" : "border border-g5 text-g7"
      }`}
    >
      {label}
    </span>
  );

  return (
    <div className="bg-ground p-5 lg:p-6">
      {!text ? (
        <>
          {keyEl}
          <p className="mt-4 font-mono text-[13px] text-g5">
            {t(ui.modal.notWritten, lang)}
          </p>
        </>
      ) : sealed ? (
        <Redaction keyEl={keyEl} labelId={`redact-${slug}`}>
          <p className={`text-g7 ${bodyFace(lang)}`}>{t(text, lang)}</p>
        </Redaction>
      ) : (
        <>
          {keyEl}
          <p className={`mt-4 text-g7 ${bodyFace(lang)}`}>{t(text, lang)}</p>
        </>
      )}
    </div>
  );
}

export default function RecordBody({
  record,
  stepLabel,
}: {
  record: RecordRow;
  stepLabel: string;
}) {
  const { lang } = useLang();
  const study = caseStudies[record.work.title];
  const { learnt, regret, growth } = review(record);
  const { live, code } = links(record);
  const thumb = record.work.thumbnail;
  const award = record.awardLong ?? record.award;
  const hasAward = t(record.award, lang) !== "—";
  const hasHours = record.hours !== "—";
  // No case study written for this record — the summary is what exists, so
  // print that rather than three empty headings.
  const overview = study ? null : summary(record);

  return (
    <>
      {/* Header */}
      {/* On a phone the file number takes its own line: beside the title it
          costs 52px of a 308px column, which is the difference between the
          record's name fitting and breaking across two lines. */}
      <div className="grid gap-2 border-b border-g5 pb-5 lg:grid-cols-[52px_1fr_auto] lg:items-end lg:gap-5">
        <span className="font-mono text-label text-signal">
          <GlyphResolve key={`n${record.slug}`} text={record.rec} {...ROUTE_RESOLVE} />
        </span>
        <div className="min-w-0">
          {/* Route change: the incoming heading and its label resolve in 180ms.
              Nothing else moves — no layout, no nav, no background.

              Two size ladders, because the two locales are different kinds of
              string: JP titles are phrases (記憶のタイムカプセル is ten glyphs
              where "Reminiscape" is one word), and a phone panel gives the
              title ~308px either way. */}
          <h2
            className={`break-words ${headline(
              lang,
              "text-[40px] leading-[0.95] sm:text-sub sm:leading-[0.9] lg:text-head lg:leading-[0.88]",
              "text-[26px] leading-[1.3] sm:text-[34px] lg:text-[56px] lg:leading-[1.15]"
            )}`}
          >
            <GlyphResolve
              key={`${record.slug}-${lang}`}
              text={t(record.title, lang)}
              {...ROUTE_RESOLVE}
            />
          </h2>
          <div
            className={`mt-2.5 text-[13px] text-g6 lg:text-body ${
              lang === "jp" ? "font-jp" : "font-mono tracking-meta"
            }`}
          >
            {t(record.subtitle, lang)}
          </div>
        </div>
        <span className="whitespace-nowrap font-mono text-label text-g5 lg:text-right">
          {stepLabel}
        </span>
      </div>

      {/* Metadata strip — hairlines come from the 1px gap, so no cell can
          double up a rule against its neighbour. The columns are auto rather
          than a fixed six: a record with no hours and no award prints four
          cells that divide the width, not four cells and two empty tracks. */}
      <div className="grid grid-cols-2 gap-px border-b border-rule bg-rule lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        <Cell label={t(ui.modal.period, lang)}>{record.period}</Cell>
        {hasHours && (
          <Cell label={t(ui.modal.hours, lang)}>{record.hours}</Cell>
        )}
        <Cell label={t(ui.modal.role, lang)}>
          <span className={lang === "jp" ? "font-jp" : undefined}>
            {t(record.role, lang)}
          </span>
        </Cell>
        <Cell label="STACK">{record.stack}</Cell>
        {hasAward && (
          <Cell label={t(ui.modal.award, lang)}>
            <span className={lang === "jp" ? "font-jp" : undefined}>
              {t(award, lang)}
            </span>
          </Cell>
        )}
        <Cell label={t(ui.modal.links, lang)}>
          <span className="flex gap-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-g5 transition-colors duration-flick ease-snap hover:border-signal hover:text-signal"
              >
                {t(ui.modal.live, lang)}
              </a>
            )}
            {code && (
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-g5 transition-colors duration-flick ease-snap hover:border-signal hover:text-signal"
              >
                {t(ui.modal.code, lang)}
              </a>
            )}
          </span>
        </Cell>
      </div>

      {/* Body */}
      <div
        className={`mt-8 grid gap-8 lg:mt-10 lg:gap-16 ${
          thumb ? "lg:grid-cols-[1fr_496px]" : ""
        }`}
      >
        <div className="flex flex-col gap-6 lg:gap-8">
          {study ? (
            <>
              <Field label={t(ui.modal.problem, lang)} text={t(study.problem, lang)} />
              <Field label={t(ui.modal.approach, lang)} text={t(study.approach, lang)} />
              <Field label={t(ui.modal.outcome, lang)} text={t(study.outcome, lang)} />
            </>
          ) : (
            overview && (
              <Field label={t(ui.modal.overview, lang)} text={t(overview, lang)} />
            )
          )}
        </div>

        {thumb && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              width={496}
              height={310}
              className="block aspect-[496/310] w-full border border-rule object-cover brightness-90 contrast-[1.3] grayscale transition-[filter] duration-quick ease-snap hover:brightness-100 hover:contrast-[1.06] hover:saturate-[1.04] hover:grayscale-0"
            />
            <div className="mt-2.5 font-mono text-[12px] tracking-meta text-g5">
              FIG {record.rec}.1 — SCREEN CAPTURE
            </div>
          </div>
        )}
      </div>

      {/* Review band */}
      <div className="mt-12 border-t-[3px] border-bone pt-6 lg:mt-14">
        <div className="flex flex-wrap items-baseline gap-3 lg:gap-5">
          <h3
            className={headline(
              lang,
              "text-title lg:text-sub",
              "text-[26px] leading-[1.2] lg:text-[40px]"
            )}
          >
            {t(ui.modal.review, lang)}
          </h3>
          <span className="font-mono text-label text-g6">
            {t(ui.modal.reviewKeys, lang)}
          </span>
        </div>

        <div className="mt-6 grid gap-px border border-rule bg-rule lg:grid-cols-3">
          <ReviewPanel
            label={t(ui.modal.learnt, lang)}
            text={learnt}
            slug={record.slug}
          />
          <ReviewPanel
            label={t(ui.modal.regret, lang)}
            text={regret}
            slug={record.slug}
            sealed
          />
          <ReviewPanel
            label={t(ui.modal.growth, lang)}
            text={growth}
            slug={record.slug}
          />
        </div>
      </div>
    </>
  );
}
