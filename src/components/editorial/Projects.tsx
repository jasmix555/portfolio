import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";
import ProjectItem from "./ProjectItem";
import ProjectOverlay from "./ProjectOverlay";
import { works, type Work } from "@/data/works";

// Pinned order first (Reminiscape → Calendar App), then the rest as-is.
const PINNED = ["Reminiscape", "Calendar App"];
const items = works
  .filter((w) => w.group === "project")
  .sort((a, b) => {
    const ai = PINNED.indexOf(a.title);
    const bi = PINNED.indexOf(b.title);
    return (ai === -1 ? PINNED.length : ai) - (bi === -1 ? PINNED.length : bi);
  });

export default function Projects() {
  const { lang } = useLang();
  const [active, setActive] = useState<Work | null>(null);

  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-editorial">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-clay">
          <span className="h-px w-8 bg-clay" /> 02 — {t(ui.projects.kicker, lang)}
        </div>
        <h2 className="heading-wrap max-w-3xl font-serif text-[clamp(34px,6vw,76px)] font-semibold leading-[0.95] text-ink">
          {t(ui.projects.title, lang)}
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {items.map((w, i) => (
            <ProjectItem key={w.title} w={w} i={i} onOpenFull={setActive} />
          ))}
        </div>
      </div>

      <ProjectOverlay work={active} onClose={() => setActive(null)} />
    </section>
  );
}
