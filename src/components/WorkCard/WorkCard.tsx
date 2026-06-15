import { FaArrowRightLong } from "react-icons/fa6";
import Magnetic from "../Magnetic";
import type { Work } from "@/data/works";

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

type Props = {
  work: Work;
  index: number;
  onSelect: (w: Work) => void;
};

export default function WorkCard({ work, index, onSelect }: Props) {
  const tint = tints[index % tints.length];

  return (
    <Magnetic strength={0.1} className="block h-full w-full">
      <button
        type="button"
        onClick={() => onSelect(work)}
        aria-label={`View details for ${work.title}`}
        className="group flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
      >
        <div
          className="relative h-[200px] overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${tint}33, ${tint}11)` }}
        >
          {work.awards && work.awards.length > 0 && (
            <span className="absolute right-3.5 top-3.5 z-[2] rounded-full border border-white/15 bg-bg/80 px-3 py-1.5 text-xs font-medium text-accent-2 backdrop-blur">
              ★ {work.awards.length > 1 ? `${work.awards.length} Awards` : "Award"}
            </span>
          )}
          {work.status && (
            <span className="absolute left-3.5 top-3.5 z-[2] rounded-full border border-white/15 bg-bg/80 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              {work.status}
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
          <h3 className="font-display text-xl font-semibold">{work.title}</h3>
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
    </Magnetic>
  );
}
