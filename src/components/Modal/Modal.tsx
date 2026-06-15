import { useEffect } from "react";
import {
  FaXmark,
  FaArrowUpRightFromSquare,
  FaRegClock,
  FaRegCalendar,
  FaRegUser,
} from "react-icons/fa6";
import type { Work } from "@/data/works";

type Props = {
  selectedWork: Work | null;
  onClose: () => void;
};

export default function Modal({ selectedWork, onClose }: Props) {
  useEffect(() => {
    if (!selectedWork) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedWork, onClose]);

  if (!selectedWork) return null;
  const w = selectedWork;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
    >
      <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-surface">
        <div className="relative h-[180px] rounded-t-3xl bg-gradient-to-br from-accent/30 to-accent/5">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-bg/70 text-white"
          >
            <FaXmark />
          </button>
        </div>

        <div className="px-8 pb-10 pt-2 sm:px-9">
          <h2 className="font-display text-3xl font-bold">{w.title}</h2>

          <div className="mb-3 mt-5 flex flex-wrap gap-2">
            {w.category.map((c) => (
              <span
                key={c}
                className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-[#c4bcff]"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <FaRegCalendar aria-hidden="true" className="text-faint" />
              {w.dateCreated}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaRegClock aria-hidden="true" className="text-faint" />
              {w.totalTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaRegUser aria-hidden="true" className="text-faint" />
              {w.role.join(" · ")}
            </span>
          </div>

          <Block title="Summary" text={w.summary} />
          {w.learnt && <Block title="What I learned" text={w.learnt} />}
          {w.regret && <Block title="What I'd improve" text={w.regret} />}
          {w.growth && <Block title="How I grew" text={w.growth} />}

          <div className="mt-7 flex flex-wrap gap-3">
            {w.link.map((href, i) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-bg"
              >
                {w.page[i]}
                <FaArrowUpRightFromSquare aria-hidden="true" className="text-xs" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h4 className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent">
        {title}
      </h4>
      <p className="whitespace-pre-line text-[15.5px] leading-relaxed text-muted">
        {text}
      </p>
    </>
  );
}
