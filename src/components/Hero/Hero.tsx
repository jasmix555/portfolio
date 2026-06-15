import { FaArrowRightLong } from "react-icons/fa6";

const stats = [
  { num: "10+", label: "Projects shipped" },
  { num: "3+ yrs", label: "Building for the web" },
  { num: "4", label: "Languages spoken" },
];

export default function Hero() {
  return (
    <header
      id="top"
      className="mx-auto flex min-h-screen max-w-site items-center px-6 pt-20"
    >
      <div className="animate-fade-up">
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
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            View my work
            <FaArrowRightLong aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-surface-2"
          >
            Get in touch
          </a>
        </div>
        <div className="mt-16 flex flex-wrap gap-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold">{s.num}</div>
              <div className="text-[13px] text-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
