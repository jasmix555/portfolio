import { ideas } from "@/data/records";
import { useLang } from "./LanguageProvider";
import { headline, t, ui } from "./i18n";
import { useReveal } from "./motion";
import type { ModalTarget } from "./useArchiveRoute";

/**
 * 02 IDEAS — two concepts, one point each.
 *
 * This was a poster: a 160px title and 168px of air above two thumbnails in a
 * hairline strip. It looked considered and said almost nothing. Each entry now
 * leads with the single thing a reader should take from it — that one was the
 * first team he led, that the other went from blank file to judged work in a
 * weekend — stated in the signal colour before any detail.
 *
 * These two are still the only place the `OPEN ↗` tag appears: a click target
 * with room around it, where the records table would repeat itself eight times.
 */
export default function Ideas({
  onOpen,
}: {
  onOpen: (next: NonNullable<ModalTarget>) => void;
}) {
  const { lang } = useLang();
  // Two groups, because the entries sit a screen below the heading: one
  // observer on the section would have played both before either was read.
  const head = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <section id="ideas" className="px-5 py-14 lg:px-24 lg:pb-16 lg:pt-14">
      <div className="mx-auto w-full max-w-content">
        <div
          ref={head.ref}
          className={`flex justify-between gap-6 font-mono text-label text-g6 ${head.rv(
            "text"
          )}`}
        >
          <span className="text-signal">{t(ui.ideas.label, lang)}</span>
          <span className={`text-right ${lang === "jp" ? "font-jp" : ""}`}>
            {ideas.length} {t(ui.ideas.count, lang)}
          </span>
        </div>

        <div className="mt-8 grid items-end gap-6 pb-6 lg:grid-cols-[1fr_420px] lg:gap-20">
          <h2
            className={`whitespace-pre-line ${headline(
              lang,
              "text-[44px] leading-[0.9] lg:text-[88px] lg:leading-[0.88]",
              "text-[32px] leading-[1.15] lg:text-[60px] lg:leading-[1.06]"
            )} ${head.rv("head")}`}
          >
            {t(ui.ideas.head, lang)}
          </h2>
          <p
            className={`text-[17px] leading-[1.5] tracking-[-0.01em] text-g7 lg:text-[19px] ${
              lang === "jp" ? "font-jp jp-wrap leading-[1.8]" : ""
            } ${head.rv("text")}`}
          >
            {t(ui.ideas.standfirst, lang)}
          </p>
        </div>
        <span
          aria-hidden
          className={`block h-[3px] bg-bone ${head.rv("rule")}`}
        />

        <div
          ref={grid.ref}
          className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-[72px]"
        >
          {ideas.map((r, i) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => onOpen({ kind: "concept", id: r.slug })}
              style={grid.delay(i)}
              className={`group flex flex-col gap-4 text-left ${grid.rv(
                "strip"
              )}`}
            >
              {r.work.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.work.thumbnail}
                  alt=""
                  width={620}
                  height={200}
                  loading="lazy"
                  className="block h-[200px] w-full object-cover brightness-[0.85] contrast-125 grayscale outline-bone transition-[transform,filter] duration-quick ease-snap group-hover:scale-[1.04] group-hover:outline group-hover:outline-1 group-hover:brightness-100 group-hover:contrast-[1.06] group-hover:saturate-[1.04] group-hover:grayscale-0"
                />
              )}

              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <span
                  className={`leading-none ${
                    lang === "jp"
                      ? "font-jp text-[26px] font-bold leading-[1.2] lg:text-[30px]"
                      : "text-[32px] font-bold tracking-[-0.025em] lg:text-[40px]"
                  }`}
                >
                  {t(r.title, lang)}
                </span>
                {r.takeaway && (
                  <span
                    className={`whitespace-nowrap text-[12px] tracking-btn text-signal ${
                      lang === "jp" ? "font-jp" : "font-mono"
                    }`}
                  >
                    {t(r.takeaway, lang)}
                  </span>
                )}
              </div>

              {r.blurb && (
                <p
                  className={`max-w-[38ch] text-[17px] leading-[1.45] tracking-[-0.01em] text-g7 lg:text-[19px] ${
                    lang === "jp" ? "font-jp jp-wrap leading-[1.8]" : ""
                  }`}
                >
                  {t(r.blurb, lang)}
                </p>
              )}

              <div className="flex flex-wrap justify-between gap-x-5 gap-y-1 border-t border-rule pt-3 font-mono text-[12px] tracking-meta text-g5">
                <span className={lang === "jp" ? "font-jp" : undefined}>
                  {r.year} · {t(r.award, lang)} · {r.hours} HRS
                </span>
                <span className="text-g6 transition-colors duration-flick ease-snap group-hover:text-bone">
                  {t(ui.ideas.open, lang)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
