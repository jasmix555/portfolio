import { FaArrowRight } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import Reveal from "../Reveal";
import RevealImage from "./RevealImage";
import { useLang } from "./LanguageProvider";
import { ui, t, bilingual } from "./i18n";
import type { Work } from "@/data/works";

const year = (s: string) => s.replace(/\s/g, "");
const isGit = (label: string) => /git|github/i.test(label);

export default function ProjectItem({
  w,
  i,
  onOpenFull,
}: {
  w: Work;
  i: number;
  onOpenFull: (w: Work) => void;
}) {
  const { lang } = useLang();
  const summary = t(bilingual(w.summary), lang);

  return (
    <Reveal delay={(i % 2) * 80} className="group flex flex-col">
      {/* clickable card body → opens the case-study overlay */}
      <button
        type="button"
        onClick={() => onOpenFull(w)}
        data-cursor
        className="block w-full text-left"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3">
          <RevealImage
            src={w.thumbnail}
            alt={w.title}
            className="h-full w-full"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-paper/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            {t(ui.projects.full, lang)}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight text-ink">
            {w.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-ink-faint">
            {year(w.dateCreated)}
          </span>
        </div>
        <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
          {w.category.slice(0, 2).join(" · ")}
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft line-clamp-2">
          {summary}
        </p>
      </button>

      {/* secondary actions — open detail or jump out */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <button
          type="button"
          onClick={() => onOpenFull(w)}
          data-cursor
          className="inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-ink transition-colors hover:border-clay hover:text-clay"
        >
          {t(ui.projects.full, lang)}
        </button>
        {w.link.map((href, idx) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group/link inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-clay"
          >
            {isGit(w.page[idx] ?? "") ? (
              <>
                <SiGithub className="text-[13px]" /> {t(ui.projects.code, lang)}
              </>
            ) : (
              <>
                {t(ui.projects.live, lang)}
                <FaArrowRight className="-rotate-45 text-[11px]" />
              </>
            )}
          </a>
        ))}
      </div>
    </Reveal>
  );
}
