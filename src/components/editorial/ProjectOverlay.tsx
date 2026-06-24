import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { FaArrowRight, FaXmark } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useLang } from "./LanguageProvider";
import { ui, t, bilingual, role } from "./i18n";
import { caseStudies } from "@/data/caseStudies";
import type { Work } from "@/data/works";

const year = (s: string) => s.replace(/\s/g, "");
const isGit = (label: string) => /git|github/i.test(label);

function Block({ label, body }: { label: string; body: string }) {
  if (!body) return null;
  return (
    <div className="border-t border-line pt-5">
      <h4 className="font-mono text-[11px] uppercase tracking-label text-clay">
        {label}
      </h4>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">
        {body}
      </p>
    </div>
  );
}

export default function ProjectOverlay({
  work,
  onClose,
}: {
  work: Work | null;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const lenis = useLenis();
  const cs = work ? caseStudies[work.title] : undefined;

  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop(); // pause the smooth-scrolled page behind the overlay
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [work, onClose, lenis]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="fixed inset-0 z-[200] bg-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-full flex-col">
            {/* bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4 md:px-10">
              <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                {year(work.dateCreated)} — {t(ui.projects.full, lang)}
              </span>
              <button
                onClick={onClose}
                data-cursor
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-clay hover:bg-clay hover:text-paper"
              >
                <FaXmark />
              </button>
            </div>

            {/* body */}
            <motion.div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto max-w-editorial px-6 py-12 md:px-10 md:py-16">
                <h2 className="max-w-3xl font-serif text-[clamp(34px,6vw,72px)] font-semibold leading-[0.98] text-ink">
                  {work.title}
                </h2>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  <span>{work.category.join(" · ")}</span>
                  {work.totalTime && <span>· {work.totalTime}</span>}
                </div>

                <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-paper-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-6">
                    <p className="whitespace-pre-line text-[16px] leading-relaxed text-ink">
                      {t(bilingual(work.summary), lang)}
                    </p>

                    {cs ? (
                      <>
                        <Block
                          label={t(ui.projects.problem, lang)}
                          body={t(cs.problem, lang)}
                        />
                        <Block
                          label={t(ui.projects.approach, lang)}
                          body={t(cs.approach, lang)}
                        />
                        <Block
                          label={t(ui.projects.outcome, lang)}
                          body={t(cs.outcome, lang)}
                        />
                      </>
                    ) : (
                      work.highlight && (
                        <Block
                          label={lang === "en" ? "What I focused on" : "注力した点"}
                          body={t(bilingual(work.highlight), lang)}
                        />
                      )
                    )}

                    <Block
                      label={t(ui.projects.learned, lang)}
                      body={t(bilingual(work.learnt), lang)}
                    />
                    <Block
                      label={t(ui.projects.regret, lang)}
                      body={t(bilingual(work.regret), lang)}
                    />
                    <Block
                      label={t(ui.projects.growth, lang)}
                      body={t(bilingual(work.growth), lang)}
                    />
                  </div>

                  {/* meta rail */}
                  <aside className="space-y-8">
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                        {t(ui.projects.role, lang)}
                      </h4>
                      <ul className="mt-3 space-y-1 text-[15px] text-ink">
                        {work.role.map((r) => (
                          <li key={r}>{role(r, lang)}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                        {t(ui.projects.stack, lang)}
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {work.method.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-ink/15 px-3 py-1 text-[12px] text-ink-soft"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    {work.awards && work.awards.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                          {lang === "en" ? "Awards" : "受賞"}
                        </h4>
                        <ul className="mt-3 space-y-1 font-serif text-[15px] italic text-clay">
                          {work.awards.map((a) => (
                            <li key={a.title}>{a.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-5 border-t border-line pt-6 text-sm">
                      {work.link.map((href, idx) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor
                          className="group inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-ink transition-colors hover:border-clay hover:text-clay"
                        >
                          {isGit(work.page[idx] ?? "") ? (
                            <>
                              <SiGithub className="text-[13px]" />{" "}
                              {t(ui.projects.code, lang)}
                            </>
                          ) : (
                            <>
                              {t(ui.projects.live, lang)}
                              <FaArrowRight className="-rotate-45 text-[12px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </a>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
