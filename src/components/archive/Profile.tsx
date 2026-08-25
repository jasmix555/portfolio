import {
  alsoInUse,
  AXIS_MONTHS,
  band,
  phases,
  stack,
  type StackRow,
} from "@/data/profile";
import { ledger, totalHours } from "@/data/records";
import { useLang } from "./LanguageProvider";
import { headline, t, ui, type Pair } from "./i18n";
import { stagger, useReveal } from "./motion";
import type { ModalTarget } from "./useArchiveRoute";

/** The dashed 32.7px tick track that heads each stack band. */
const TICKS =
  "h-px bg-[repeating-linear-gradient(90deg,rgba(242,240,235,0.28)_0_1px,transparent_1px_32.7px)]";

const ROW =
  "grid grid-cols-[minmax(0,130px)_1fr_44px] items-center gap-4 lg:grid-cols-[180px_1fr_56px]";

export default function Profile({
  onOpen,
}: {
  onOpen: (next: NonNullable<ModalTarget>) => void;
}) {
  const { lang } = useLang();
  // Four groups, top to bottom. `stack` is already the data import, so the
  // reveal over the bars is `bars`.
  const head = useReveal<HTMLDivElement>();
  const glance = useReveal<HTMLDivElement>();
  const track = useReveal<HTMLDivElement>();
  const bars = useReveal<HTMLDivElement>();

  /**
   * Four figures before anything else. Two are derived from the records so
   * they cannot drift; the board printed "ACROSS 12 RECORDS" against a table
   * of 8, which is exactly the drift deriving them prevents.
   */
  const figures: { value: string; label: Pair }[] = [
    { value: "4", label: ui.profile.glanceYears },
    {
      value: totalHours,
      label: {
        en: `${t(ui.profile.glanceHours, "en")} ${ledger.records} RECORDS`,
        jp: `${t(ui.profile.glanceHours, "jp")} ${ledger.records}件`,
      },
    },
    { value: "2", label: ui.profile.glanceTeams },
    { value: "4", label: ui.profile.glanceLanguages },
  ];

  const daily = stack.filter((s) => s.group === "daily");
  const product = stack.filter((s) => s.group === "product");

  // Only the bar itself reveals. The row around it — the name, and above all
  // the number — is on the page from frame 0, so the measurement never lives
  // inside an animation and a stalled frame loop costs the chart nothing but
  // its entrance.
  const bar = (s: StackRow, i: number) => (
    <div key={s.name} className={`${ROW} border-t border-rule py-2.5`}>
      <span className={`text-[14px] lg:text-[16px] ${lang === "jp" ? "font-jp" : ""}`}>
        {s.name}
      </span>
      <span
        style={{
          width: `${(s.months / AXIS_MONTHS) * 100}%`,
          ...bars.delay(i, stagger.bar),
        }}
        className={`block h-3.5 ${band(s.months)} ${bars.rv("bar")}`}
      />
      <span className="text-right font-mono text-[13px] tabular-nums text-bone lg:text-[14px]">
        {s.months}
      </span>
    </div>
  );

  const bandHead = (label: Pair, unit?: boolean) => (
    <div className={`${ROW} border-t border-g5 py-2.5 ${bars.rv("text")}`}>
      <span
        className={`text-[12px] tracking-meta text-g5 ${
          lang === "jp" ? "font-jp" : "font-mono"
        }`}
      >
        {t(label, lang)}
      </span>
      <span className={TICKS} />
      {unit ? (
        <span className="text-right font-mono text-[12px] text-g5">
          {t(ui.profile.months, lang)}
        </span>
      ) : (
        <span />
      )}
    </div>
  );

  return (
    <section id="profile" className="px-5 py-14 lg:px-24 lg:pb-[72px] lg:pt-16">
      <div className="mx-auto w-full max-w-content">
        {/* Header */}
        <div
          ref={head.ref}
          className="grid items-end gap-8 pb-7 lg:grid-cols-[1fr_400px] lg:gap-16"
        >
          <div>
            <div
              className={`font-mono text-label text-signal ${head.rv("text")}`}
            >
              {t(ui.profile.label, lang)}
            </div>
            <h2
              className={`mt-3 whitespace-pre-line ${headline(
                lang,
                "text-[44px] leading-[0.9] lg:text-[88px] lg:leading-[0.88]",
                "text-[30px] leading-[1.2] lg:text-[60px] lg:leading-[1.06]"
              )} ${head.rv("head")}`}
            >
              {t(ui.profile.head, lang)}
            </h2>
          </div>

          <div className={`group flex items-end gap-5 ${head.rv("strip")}`}>
            {/* The only colour image on the site — a person is not a specimen.
                It grows a little under the pointer, from its own centre, so the
                one photograph here answers a hover like everything else does. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile/profile.webp"
              alt="Jason Ng"
              width={140}
              height={180}
              loading="lazy"
              className="block h-[180px] w-[140px] shrink-0 border border-[rgba(242,240,235,0.28)] object-cover contrast-[1.06] saturate-[1.02] transition-transform duration-quick ease-snap group-hover:scale-[1.04]"
            />
            <div
              className={`whitespace-pre-line font-mono text-[13px] leading-[1.95] tracking-[0.1em] text-g7 ${
                lang === "jp" ? "font-jp" : ""
              }`}
            >
              {t(ui.profile.card, lang)}
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className={`block h-[3px] bg-bone ${head.rv("rule")}`}
        />

        {/* Glance strip — the five-second read. One reveal for the whole
            register: four figures arriving one after another would read as a
            list of numbers being counted out, and it is one fact in four
            parts. */}
        <div
          ref={glance.ref}
          className={`mt-8 grid grid-cols-2 gap-8 border-b border-g5 pb-8 lg:mt-10 lg:grid-cols-4 lg:gap-12 lg:pb-9 ${glance.rv(
            "strip"
          )}`}
        >
          {figures.map((g) => (
            <div key={g.label.en} className="flex flex-col gap-2.5">
              <span className="font-extrabold leading-[0.82] tracking-[-0.05em] [font-stretch:112%] text-[52px] tabular-nums lg:text-[76px]">
                {g.value}
              </span>
              <span
                className={`whitespace-pre-line text-[12px] leading-[1.8] tracking-meta text-g6 ${
                  lang === "jp" ? "font-jp" : "font-mono"
                }`}
              >
                {t(g.label, lang)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-12 lg:mt-11 lg:grid-cols-[1fr_620px] lg:gap-[88px]">
          {/* — Bio + track — */}
          <div ref={track.ref}>
            <div className={`font-mono text-label text-g6 ${track.rv("text")}`}>
              {t(ui.profile.bio, lang)}
            </div>
            <p
              style={track.delay(1)}
              className={`mt-4 text-[21px] leading-[1.4] tracking-[-0.015em] text-bone lg:text-[25px] ${
                lang === "jp" ? "font-jp jp-wrap leading-[1.7]" : ""
              } ${track.rv("text")}`}
            >
              {t(ui.profile.lead, lang)}
            </p>
            <p
              style={track.delay(2)}
              className={`mt-5 max-w-prose text-[16px] leading-[1.7] text-g7 ${
                lang === "jp" ? "font-jp jp-wrap leading-[1.9]" : ""
              } ${track.rv("text")}`}
            >
              {t(ui.profile.body, lang)}
            </p>

            <div
              style={track.delay(3)}
              className={`mt-10 font-mono text-label text-g6 lg:mt-11 ${track.rv("text")}`}
            >
              {t(ui.profile.timeline, lang)}
            </div>

            <div className="mt-4 flex flex-col">
              {phases.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpen({ kind: "year", id: p.id })}
                  style={track.delay(i + 4)}
                  className={`group grid grid-cols-[72px_1fr] gap-5 border-t py-4 text-left transition-colors duration-flick ease-snap lg:grid-cols-[96px_1fr] lg:gap-6 ${track.rv("row")} ${
                    p.now
                      ? "border-t-g5 border-b border-g5 bg-g1"
                      : "border-rule hover:bg-g2"
                  }`}
                >
                  <span
                    className={`whitespace-pre-line font-mono text-[13px] leading-[1.7] tracking-[0.1em] ${
                      p.now ? "text-signal" : "text-g5 group-hover:text-signal"
                    }`}
                  >
                    {p.now ? `2026\n${t(ui.profile.now, lang)}` : p.label}
                  </span>
                  <span
                    className={`text-[16px] leading-[1.55] lg:text-[17px] ${
                      p.now ? "text-bone" : "text-g7"
                    } ${lang === "jp" ? "font-jp jp-wrap leading-[1.9]" : ""}`}
                  >
                    {t(p.text, lang)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* — Core stack as measured data, never badges — */}
          <div ref={bars.ref}>
            <div
              className={`flex justify-between gap-5 font-mono text-label text-g6 ${bars.rv("text")}`}
            >
              <span className={lang === "jp" ? "font-jp" : undefined}>
                {t(ui.profile.stack, lang)}
              </span>
              <span className="hidden lg:inline">{t(ui.profile.axis, lang)}</span>
            </div>

            {/* The stagger runs continuously down both bands rather than
                restarting at PRODUCT WORK — seven rows read as one cascade,
                and a restart halfway looks like a stutter. */}
            <div className="mt-4 flex flex-col">
              {bandHead(ui.profile.groupDaily, true)}
              {daily.map((s, i) => bar(s, i))}
              {bandHead(ui.profile.groupProduct)}
              {product.map((s, i) => bar(s, daily.length + i))}

              {/* Everything real but not worth a bar of its own. */}
              <div
                className={`mt-0.5 border-t border-g5 pt-3.5 text-[12px] leading-[2] tracking-[0.12em] text-g6 ${
                  lang === "jp" ? "font-jp" : "font-mono"
                } ${bars.rv("text")}`}
              >
                {t(ui.profile.alsoInUse, lang)} — {alsoInUse}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
