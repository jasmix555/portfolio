import Reveal from "../Reveal";
import RevealImage from "./RevealImage";
import { useLang } from "./LanguageProvider";
import { ui, t, bilingual } from "./i18n";
import type { Lang } from "./i18n";
import { works, type Work } from "@/data/works";

const concepts = works.filter((w) => w.group === "concept");

// Pull a few short reflective fragments out of a concept's notes (in the active
// language) so they "accumulate" as the reader scrolls — each fades up and stays.
function fragments(w: Work, lang: Lang): string[] {
  const pool = [w.growth, w.learnt, w.regret]
    .map((f) => t(bilingual(f), lang))
    .filter(Boolean);
  const splitter = lang === "jp" ? /(?<=[。])/ : /(?<=[.])\s+/;
  return pool
    .flatMap((p) => p.split(splitter))
    .map((s) => s.trim())
    .filter((s) => s.length > (lang === "jp" ? 10 : 24))
    .slice(0, 4);
}

export default function Ideas() {
  const { lang } = useLang();

  return (
    <section id="ideas" className="bg-paper-2/60 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-editorial">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-clay">
          <span className="h-px w-8 bg-clay" /> 03 — {t(ui.ideas.kicker, lang)}
        </div>
        <h2 className="heading-wrap max-w-3xl font-serif text-[clamp(34px,6vw,76px)] font-semibold leading-[0.95] text-ink">
          {t(ui.ideas.title, lang)}
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
          {t(ui.ideas.desc, lang)}
        </p>

        <div className="mt-16 space-y-24">
          {concepts.map((w) => (
            <div key={w.title} className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  <span className="rounded-full border border-clay/50 px-2.5 py-0.5 text-clay">
                    {w.status ?? "Concept"}
                  </span>
                  <span>{w.dateCreated.replace(/\s/g, "")}</span>
                </div>
                <h3 className="mt-4 font-serif text-[clamp(30px,4.5vw,60px)] font-semibold leading-none text-ink">
                  {w.title}
                </h3>
                {w.thumbnail && (
                  <div className="mt-6 max-w-[280px] overflow-hidden border border-line bg-paper-3">
                    <RevealImage
                      src={w.thumbnail}
                      alt={w.title}
                      className="aspect-[5/3] w-full"
                      from="left"
                    />
                  </div>
                )}
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  {t(bilingual(w.summary), lang)}
                </p>
                {w.awards && w.awards.length > 0 && (
                  <p className="mt-4 font-serif text-[15px] italic text-clay">
                    {w.awards.map((a) => a.title).join(" · ")}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {w.method.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-ink/15 px-3 py-1 text-[12px] text-ink-soft"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                {w.link[0] && (
                  <a
                    href={w.link[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="mt-7 inline-block border-b border-ink/30 pb-0.5 text-sm text-ink transition-colors hover:border-clay hover:text-clay"
                  >
                    {t(ui.ideas.view, lang)}
                  </a>
                )}
              </Reveal>

              <div className="space-y-6 md:border-l md:border-line md:pl-10">
                <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {t(ui.ideas.notes, lang)}
                </span>
                {fragments(w, lang).map((frag, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <p className="font-serif text-[clamp(18px,2.2vw,26px)] leading-snug text-ink">
                      {frag}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
