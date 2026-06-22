import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Reveal from "../Reveal";
import RevealText from "../RevealText";
import Parallax from "../Parallax";
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
    id: "project",
    label: "Product Projects",
    blurb:
      "Full-stack React / Next.js apps I designed and built end-to-end — auth, real data, and sharing.",
    limit: Infinity,
  },
  {
    id: "work",
    label: "Professional Work",
    blurb: "Client campaign & product sites shipped for recognizable brands.",
    limit: 6,
  },
  {
    id: "concept",
    label: "Concepts",
    blurb: "Award-winning concept build from my college days.",
    limit: Infinity,
  },
];

function WorksGroup({
  group,
  items,
  total,
  hidden,
  onSelect,
}: {
  group: (typeof groups)[number];
  items: Work[];
  total: number;
  hidden: number;
  onSelect: (w: Work) => void;
}) {
  // On mobile the heading sticks to the top and shrinks once pinned. Desktop keeps
  // the side-column sticky and undoes the shrink via md: resets.
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-16 md:grid md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]">
      {/* Mobile: constant-height sticky bar (height never changes -> no wiggle). */}
      <div ref={sentinelRef} aria-hidden className="h-px md:hidden" />
      <div
        className={`sticky top-14 z-20 flex h-12 items-center md:hidden ${
          stuck
            ? "-mx-6 border-b border-white/10 bg-bg/85 px-6 backdrop-blur"
            : ""
        }`}
      >
        <h3
          className={`flex items-center gap-3 font-semibold font-display ${
            stuck ? "text-sm" : "text-xl"
          }`}
        >
          {group.label}
          <span className="text-sm font-normal text-faint">{total}</span>
        </h3>
      </div>
      <p className="mb-6 mt-1 text-sm text-muted md:hidden">{group.blurb}</p>

      {/* Desktop: original sticky heading column. */}
      <div className="mb-6 hidden md:sticky md:top-28 md:mb-0 md:block md:self-start">
        <h3 className="flex items-center gap-3 text-2xl font-semibold font-display">
          {group.label}
          <span className="text-sm font-normal text-faint">{total}</span>
        </h3>
        <p className="mt-1 text-sm text-muted">{group.blurb}</p>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((work, idx) => (
            <Reveal key={work.title} delay={idx * 50} className="h-full">
              <WorkCard work={work} index={idx} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
        {hidden > 0 && (
          <div className="flex justify-center mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all border rounded-full border-white/15 hover:gap-3 hover:border-accent hover:bg-accent hover:text-bg"
            >
              Show all {group.label.toLowerCase()} ({hidden} more)
              <FaArrowRightLong aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Works() {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <section id="work" className="relative px-6 mx-auto max-w-site py-28">
      {/* Decorative depth glows — drift on scroll, ignored by AT. */}
      <Parallax
        speed={-90}
        className="pointer-events-none absolute left-0 top-32 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[110px]"
      >
        <span />
      </Parallax>
      <Parallax
        speed={70}
        className="pointer-events-none absolute right-0 top-[60%] -z-10 h-80 w-80 rounded-full bg-accent-2/15 blur-[120px]"
      >
        <span />
      </Parallax>

      <Reveal className="text-center md:text-left">
        <div className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="w-6 h-px bg-accent" /> Selected work
        </div>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold">
          <RevealText text="Things I've built" />
        </h2>
        <p className="max-w-xl mx-auto mt-3 text-muted md:mx-0">
          Full-stack apps I&apos;ve designed and built end-to-end, plus client
          sites shipped for recognizable brands. Click any card for the full
          story.
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
          <WorksGroup
            key={g.id}
            group={g}
            items={items}
            total={all.length}
            hidden={hidden}
            onSelect={setSelected}
          />
        );
      })}

      <Modal selectedWork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
