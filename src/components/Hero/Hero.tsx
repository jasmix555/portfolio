import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
import Magnetic from "../Magnetic";
import { useMotionEnabled } from "../MotionToggle";
import { useAnchorScroll } from "../SmoothScroll/useAnchorScroll";

const stats = [
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "+ yrs", label: "Building for the web" },
  { value: 4, suffix: "", label: "Languages spoken" },
];

// Headline words bounce in once the intro finishes (driven by the `start` prop).
const headlineContainer = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.07 } },
};
const headlineWord = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 240, damping: 12 },
  },
};
const gradientWord =
  "inline-block bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent";

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  delay = 0,
  run = false,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  run?: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / (duration * 1000), 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, duration, delay]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function Hero({ start = false }: { start?: boolean }) {
  const { enabled } = useMotionEnabled();
  const onAnchor = useAnchorScroll();
  const ref = useRef<HTMLElement>(null);

  // Drift/fade only on desktop — on mobile the hero is taller, so the fade would
  // gray out the stats while they're still on screen.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <header
      ref={ref}
      id="top"
      className="relative mx-auto flex min-h-screen max-w-site items-center px-6 pt-20"
    >
      <motion.div
        className="text-center md:text-left"
        style={
          enabled && isDesktop
            ? { y: driftY, opacity: contentOpacity }
            : undefined
        }
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] text-muted">
          <span className="h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_12px_#34e0d0]" />
          Open to work · Osaka, Japan
        </div>
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate={start ? "show" : "hidden"}
          className="font-display text-[clamp(40px,7vw,82px)] font-bold leading-[1.08] tracking-tight"
        >
          <motion.span variants={headlineWord} className="inline-block">
            Front-end
          </motion.span>{" "}
          <motion.span variants={headlineWord} className="inline-block">
            engineer
          </motion.span>
          <br />
          <motion.span variants={headlineWord} className="inline-block">
            building
          </motion.span>{" "}
          <motion.span variants={headlineWord} className={gradientWord}>
            modern web apps
          </motion.span>
          <motion.span variants={headlineWord} className="inline-block">
            .
          </motion.span>
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-[clamp(16px,2vw,20px)] text-muted md:mx-0">
          Hi, I&apos;m Jason — a front-end / full-stack engineer based in Osaka,
          currently looking for a team where I can build fast, clean, and
          delightful web apps with React and Next.js.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5 md:justify-start">
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => onAnchor(e, "work")}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              View my work
              <FaArrowRightLong aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => onAnchor(e, "contact")}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-surface-2"
            >
              Let&apos;s work together
            </a>
          </Magnetic>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-12 md:justify-start">
          {stats.map((s, i) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  run={start}
                  delay={i * 0.12}
                />
              </div>
              <div className="text-[13px] text-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {enabled && (
        <motion.a
          href="#about"
          onClick={(e) => onAnchor(e, "about")}
          aria-label="Scroll to about section"
          style={{ opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-faint"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <FaChevronDown aria-hidden="true" />
          </motion.span>
        </motion.a>
      )}
    </header>
  );
}
