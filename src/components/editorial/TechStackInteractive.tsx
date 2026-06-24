import { motion } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";
import { techGroups, type TechItem } from "@/data/tech";

// Rough months of experience from the duration string ("3 Year", "8 Months").
function months(d: string): number {
  let total = 0;
  const y = /([\d.]+)\s*year/i.exec(d);
  const m = /([\d.]+)\s*month/i.exec(d);
  if (y) total += parseFloat(y[1]) * 12;
  if (m) total += parseFloat(m[1]);
  return total || 1;
}
const CAP = 36; // 3 years = full bar

function StackRow({ it, i }: { it: TechItem; i: number }) {
  const { enabled } = useMotionEnabled();
  const pct = Math.min(100, Math.round((months(it.duration) / CAP) * 100));

  return (
    <motion.li
      initial={enabled ? { opacity: 0, y: 10 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center gap-4 rounded-lg px-2 py-2 transition-colors duration-300 hover:bg-ink/[0.04] active:bg-ink/[0.06]">
        <span
          data-cursor
          className="flex h-9 w-9 shrink-0 items-center justify-center text-[26px] leading-none transition-transform duration-300 ease-[cubic-bezier(.2,1.4,.4,1)] group-hover:-rotate-6 group-hover:scale-125 group-active:scale-110"
        >
          <i className={it.icon} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] text-ink">{it.name}</span>
            <span className="shrink-0 font-mono text-[11px] text-ink-faint">
              {it.duration}
            </span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full rounded-full bg-clay/70 group-hover:bg-clay"
              initial={enabled ? { width: 0 } : false}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.9,
                delay: i * 0.05 + 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={!enabled ? { width: `${pct}%` } : undefined}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function TechStackInteractive() {
  return (
    <div className="mt-8 grid gap-x-14 gap-y-12 md:grid-cols-2">
      {techGroups.map((g) => (
        <div key={g.group}>
          <h4 className="font-serif text-xl text-ink">{g.group}</h4>
          <ul className="mt-5 space-y-1">
            {g.items.map((it, i) => (
              <StackRow key={it.name} it={it} i={i} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
