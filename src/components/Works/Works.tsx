import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Reveal from "../Reveal";
import Modal from "../Modal";
import { works, type Work } from "@/data/works";

const tints = [
  "#ef6a3d",
  "#8b7bff",
  "#34e0d0",
  "#378add",
  "#639922",
  "#d4537e",
  "#f0a72b",
  "#5dcaa5",
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
          Things I&apos;ve built
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          A collection of projects from my studies and beyond. Click any card for
          the full story.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work, idx) => {
          const tint = tints[idx % tints.length];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(work)}
              aria-label={`View details for ${work.title}`}
              className="group flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
            >
              <div
                className="relative h-[200px] overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${tint}33, ${tint}11)` }}
              >
                {work.awards && work.awards.length > 0 && (
                  <span className="absolute right-3.5 top-3.5 z-[2] rounded-full border border-white/15 bg-bg/80 px-3 py-1.5 text-xs font-medium text-accent-2 backdrop-blur">
                    ★ Award
                  </span>
                )}
                <span
                  className="absolute inset-0 flex items-center justify-center font-display text-4xl font-bold"
                  style={{ color: tint }}
                >
                  {work.title.slice(0, 2)}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.thumbnail}
                  alt=""
                  aria-hidden="true"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-display text-xl font-semibold">
                  {work.title}
                </h3>
                <div className="mt-auto flex flex-wrap gap-2">
                  {work.category.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-[#c4bcff]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-200 group-hover:gap-3">
                  View details
                  <FaArrowRightLong aria-hidden="true" />
                </span>
              </div>
            </button>
          );
        })}
      </Reveal>

      <Modal selectedWork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
