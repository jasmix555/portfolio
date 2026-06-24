import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";
import KineticText from "./KineticText";
import Marquee from "./Marquee";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";

const WORDS = {
  en: ["Editorial", "Kinetic", "Minimal", "Full-stack"],
  jp: ["編集的な", "動きのある", "ミニマルな", "フルスタックの"],
};
const TAIL = { en: "interfaces.", jp: "インターフェース。" };

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "SCSS",
  "Tailwind",
  "Firebase",
  "Supabase",
];

function RotatingWord() {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  const words = WORDS[lang];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [enabled, words.length]);

  return (
    <span className="relative inline-flex overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={enabled ? { y: "100%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block italic text-clay"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pb-10"
    >
      {/* top meta row */}
      <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-label text-ink-faint">
        <span>{t(ui.hero.role, lang)}</span>
        <span className="text-right">
          {t(ui.hero.location, lang)}
          <br className="sm:hidden" /> — 2026
        </span>
      </div>

      {/* identity */}
      <motion.div style={enabled ? { y, opacity } : undefined} className="relative">
        <span className="vertical-rl absolute -left-1 top-0 hidden font-mono text-[11px] uppercase tracking-label text-ink-faint lg:block">
          フロントエンド / 設計と動き
        </span>

        <KineticText
          text="Jason Ng"
          as="h1"
          repulse
          className="font-serif font-semibold leading-[0.86] tracking-[-0.03em] text-ink"
          style={{ fontSize: "clamp(72px, 15vw, 240px)" }}
          radius={150}
          strength={34}
        />

        {/* rotating descriptor — kinetic focal line */}
        <div className="mt-6 flex flex-wrap items-baseline gap-x-2.5 font-serif text-[clamp(22px,3.6vw,46px)] leading-[1.12] text-ink md:mt-8">
          <RotatingWord />
          <span className="text-ink-faint">
            {lang === "en" ? TAIL.en : TAIL.jp}
          </span>
        </div>

        <p className="mt-7 max-w-2xl font-serif text-[clamp(18px,2.4vw,30px)] italic leading-snug text-ink-soft md:mt-9">
          {t(ui.hero.motto, lang)}
        </p>
      </motion.div>

      {/* bio + scroll cue */}
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto]">
        <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
          {t(ui.hero.bio, lang)}
        </p>
        <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-label text-ink-faint md:flex md:justify-self-end">
          <span>{lang === "jp" ? "スクロール" : "Scroll"}</span>
          <span className="block h-8 w-px overflow-hidden bg-ink/20">
            <span className="block h-1/2 w-full animate-fade-up bg-clay" />
          </span>
        </div>
      </div>

      {/* kinetic marquee band — closes the hero with motion */}
      <Marquee
        items={STACK}
        className="mt-8 border-y border-line py-4 font-serif text-[clamp(24px,4.5vw,52px)] italic text-ink/70"
      />
    </section>
  );
}
