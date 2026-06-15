import Reveal from "../Reveal";
import RevealText from "../RevealText";
import Magnetic from "../Magnetic";
import { FaEnvelope, FaArrowRightLong } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiWantedly } from "react-icons/si";

const socials = [
  { icon: SiGithub, href: "https://github.com/jasmix555", label: "GitHub" },
  {
    icon: SiInstagram,
    href: "https://www.instagram.com/jason_ng555/",
    label: "Instagram",
  },
  {
    icon: SiWantedly,
    href: "https://www.wantedly.com/id/jason_ng555",
    label: "Wantedly",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-site px-6 py-28 text-center">
      <Reveal>
        <div className="mb-4 inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="h-px w-6 bg-accent" /> Get in touch
        </div>
        <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold">
          <RevealText text="Let's work together." />
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          I&apos;m currently open to front-end / full-stack roles and freelance
          work. If you&apos;re hiring or have a project in mind, my inbox is open.
        </p>
        <div className="mt-8">
          <Magnetic>
            <a
              href="mailto:Jasmix555@gmail.com"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-lg font-semibold text-bg shadow-[0_8px_24px_rgba(139,123,255,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(139,123,255,0.45)]"
            >
              <FaEnvelope aria-hidden="true" />
              Send me an email
              <FaArrowRightLong
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </Magnetic>
        </div>
        <div className="mt-9 flex justify-center gap-4">
          {socials.map((s) => (
            <Magnetic key={s.label} strength={0.5}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 text-2xl text-muted transition-colors hover:border-accent hover:bg-accent hover:text-bg"
              >
                <s.icon />
              </a>
            </Magnetic>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
