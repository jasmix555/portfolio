import Reveal from "../Reveal";
import RevealText from "../RevealText";
import Parallax from "../Parallax";

const facts = [
  { k: "Based in", v: "Osaka, Japan" },
  { k: "Nationality", v: "Indonesian" },
  { k: "Languages", v: "EN · ID · JP · ZH" },
  { k: "Outside code", v: "Drums · Workout · Photography" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-site px-6 py-28">
      <Reveal className="text-center md:text-left">
        <div className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="h-px w-6 bg-accent" /> About me
        </div>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold">
          <RevealText text="A bit about who I am" />
        </h2>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 items-center gap-14 md:grid-cols-[340px_1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-3xl border border-white/10 bg-surface-2 md:mx-0 md:max-w-none">
          <Parallax speed={24} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile/profile.png"
              alt="Jason Ng"
              className="h-[112%] w-full object-cover"
            />
          </Parallax>
        </div>
        <div>
          <p className="mb-5 text-[17px] text-muted">
            I&apos;m a front-end focused engineer who loves the craft of building
            interfaces that feel effortless. My work spans from{" "}
            <strong className="font-semibold text-white">
              landing pages and company sites
            </strong>{" "}
            to{" "}
            <strong className="font-semibold text-white">
              full data-driven apps
            </strong>{" "}
            with auth, sharing and real backends.
          </p>
          <p className="mb-5 text-[17px] text-muted">
            My motto:{" "}
            <strong className="font-semibold text-white">
              まず行動し、経験から学び、成長し続ける
            </strong>{" "}
            — act first, learn from experience, keep growing.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
            {facts.map((f) => (
              <div key={f.k}>
                <div className="text-xs uppercase tracking-[0.1em] text-faint">
                  {f.k}
                </div>
                <div className="text-[15px] font-medium text-white">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
