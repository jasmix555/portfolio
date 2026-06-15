import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Magnetic from "../Magnetic";

const stats = [
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "+ yrs", label: "Building for the web" },
  { value: 4, suffix: "", label: "Languages spoken" },
];

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
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
  }, [value, duration, delay]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function Hero() {
  return (
    <header
      id="top"
      className="mx-auto flex min-h-screen max-w-site items-center px-6 pt-20"
    >
      <div>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] text-muted">
          <span className="h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_12px_#34e0d0]" />
          Available for work · Osaka, Japan
        </div>
        <h1 className="font-display text-[clamp(40px,7vw,82px)] font-bold leading-[1.08] tracking-tight">
          Front-end engineer
          <br />
          building{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            modern web apps
          </span>
          .
        </h1>
        <p className="mt-6 max-w-xl text-[clamp(16px,2vw,20px)] text-muted">
          Hi, I&apos;m Jason — an aspiring full-stack engineer from Osaka. I turn
          ideas into fast, clean, and delightful interfaces with React, Next.js
          and a designer&apos;s eye.
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              View my work
              <FaArrowRightLong aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-surface-2"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>
        <div className="mt-16 flex flex-wrap gap-12">
          {stats.map((s, i) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold">
                <CountUp value={s.value} suffix={s.suffix} delay={4.1 + i * 0.15} />
              </div>
              <div className="text-[13px] text-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
