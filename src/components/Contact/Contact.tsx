import Reveal from "../Reveal";
import RevealText from "../RevealText";
import Magnetic from "../Magnetic";
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
          <RevealText text="Let's build something." />
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Have a project in mind or just want to say hi? My inbox is open.
        </p>
        <a
          href="mailto:Jasmix555@gmail.com"
          className="mt-7 inline-block border-b-2 border-transparent font-display text-[clamp(20px,3vw,32px)] text-accent transition-colors hover:border-accent"
        >
          Jasmix555@gmail.com
        </a>
        <div className="mt-9 flex justify-center gap-4">
          {socials.map((s) => (
            <Magnetic key={s.label} strength={0.5}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-xl text-muted transition-colors hover:border-accent hover:bg-accent hover:text-bg"
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
