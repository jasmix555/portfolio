import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";
import KineticText from "./KineticText";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const { enabled } = useMotionEnabled();
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setCount(100);
    setOpen(false);
  };

  useEffect(() => {
    if (!enabled) {
      finish();
      return;
    }
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      // ease-out so the number races then settles
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 280);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex cursor-pointer flex-col justify-between bg-paper px-6 py-8 md:px-10 md:py-10"
          onClick={finish}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-label text-ink-faint">
            <span>Jason Ng — Portfolio</span>
            <span>Osaka · 日本</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <KineticText
              text="Jason Ng"
              as="div"
              reveal
              className="font-serif text-[clamp(56px,12vw,160px)] font-semibold leading-[0.9] tracking-[-0.03em] text-ink"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 font-mono text-[11px] uppercase tracking-label text-clay"
            >
              Front-end Engineer
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
              Click to skip
            </span>
            <span className="font-serif text-[clamp(40px,9vw,120px)] leading-none text-ink tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* progress hairline */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/10">
            <div
              className="h-full bg-clay transition-[width] duration-100"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
