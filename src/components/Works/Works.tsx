import { useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Reveal from "../Reveal";
import RevealText from "../RevealText";
import WorkCard from "../WorkCard";
import Modal from "../Modal";
import { works, type Work } from "@/data/works";

const groups: {
  id: Work["group"];
  label: string;
  blurb: string;
  limit: number;
}[] = [
  {
    id: "work",
    label: "Professional Work",
    blurb: "Client campaign & product sites, built for responsive delivery.",
    limit: 5,
  },
  {
    id: "project",
    label: "Projects",
    blurb: "Structured React / Next.js apps with real functionality.",
    limit: Infinity,
  },
  {
    id: "concept",
    label: "Concepts",
    blurb: "Early HTML study & competition builds from college.",
    limit: Infinity,
  },
];

export default function Works() {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <section id="work" className="mx-auto max-w-site px-6 py-28">
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="h-px w-6 bg-accent" /> Selected work
        </div>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold">
          <RevealText text="Things I've built" />
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          From professional client sites to React apps and early college
          concepts. Click any card for the full story.
        </p>
      </Reveal>

      {groups.map((g) => {
        const all = works
          .filter((w) => w.group === g.id)
          .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity));
        if (all.length === 0) return null;
        const items = all.slice(0, g.limit);
        const hidden = all.length - items.length;

        return (
          <div key={g.id} className="mt-16">
            <Reveal>
              <div className="mb-6">
                <h3 className="flex items-center gap-3 font-display text-2xl font-semibold">
                  {g.label}
                  <span className="text-sm font-normal text-faint">
                    {all.length}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-muted">{g.blurb}</p>
              </div>
            </Reveal>
            <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((work, idx) => (
                <WorkCard
                  key={work.title}
                  work={work}
                  index={idx}
                  onSelect={setSelected}
                />
              ))}
            </Reveal>
            {hidden > 0 && (
              <div className="mt-8 flex justify-center">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all hover:gap-3 hover:border-accent hover:bg-accent hover:text-bg"
                >
                  Show all {g.label.toLowerCase()} ({hidden} more)
                  <FaArrowRightLong aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        );
      })}

      <Modal selectedWork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
