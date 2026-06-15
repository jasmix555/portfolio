import Reveal from "../Reveal";
import { techGroups } from "@/data/tech";

export default function TechStack() {
  return (
    <section id="tech" className="mx-auto max-w-site px-6 py-28">
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="h-px w-6 bg-accent" /> Tech stack
        </div>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold">
          Tools I build with
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          A mix of front-end, design and a growing back-end toolkit.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techGroups.map((g) => (
          <div
            key={g.group}
            className="rounded-2xl border border-white/10 bg-surface p-6"
          >
            <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent">
              {g.group}
            </h3>
            <ul>
              {g.items.map((it) => (
                <li
                  key={it.name}
                  className="flex items-center justify-between border-b border-white/10 py-3 last:border-0"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <i className={`${it.icon} text-[22px]`} aria-hidden="true" />
                    {it.name}
                  </span>
                  <span className="text-[13px] text-faint">{it.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
