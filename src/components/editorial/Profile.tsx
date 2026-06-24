import { FaArrowRightLong } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiLinkedin, SiWantedly } from "react-icons/si";
import Reveal from "../Reveal";
import Parallax from "../Parallax";
import Magnetic from "../Magnetic";
import KineticText from "./KineticText";
import RevealImage from "./RevealImage";
import TechStackInteractive from "./TechStackInteractive";
import Timeline from "./Timeline";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";

const socials = [
  { icon: SiGithub, href: "https://github.com/jasmix555", label: "GitHub" },
  {
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/jason-ng-6bb43a29a/",
    label: "LinkedIn",
  },
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

export default function Profile() {
  const { lang } = useLang();

  return (
    <section id="profile" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-editorial">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-clay">
          <span className="h-px w-8 bg-clay" /> 04 — {t(ui.profile.kicker, lang)}
        </div>

        <div className="grid gap-12 md:grid-cols-[320px_1fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden bg-paper-3 md:max-w-none">
              <Parallax speed={20} className="absolute inset-0 h-[112%]">
                <RevealImage
                  src="/profile/profile.png"
                  alt="Jason Ng"
                  className="h-full w-full"
                />
              </Parallax>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="heading-wrap max-w-4xl font-serif text-[clamp(30px,4.5vw,58px)] font-semibold leading-[1.05] text-ink">
              {t(ui.profile.headPre, lang)}
              <span className="italic text-clay">
                {t(ui.profile.headEmph, lang)}
              </span>
              {t(ui.profile.headPost, lang)}
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-[16px] leading-relaxed text-ink-soft">
              <p>{t(ui.profile.bio1, lang)}</p>
              <p>{t(ui.profile.bio2, lang)}</p>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6">
              {ui.profile.facts.map((f) => (
                <div key={f.k.en} className="border-t border-line pt-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                    {t(f.k, lang)}
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink">{t(f.v, lang)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* journey timeline — the growth spine */}
        <div className="mt-24 border-t border-line pt-12">
          <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
            {t(ui.profile.journeyLabel, lang)}
          </span>
          <div className="mt-10 max-w-4xl">
            <Timeline />
          </div>
        </div>

        {/* tech stack — editorial typographic table */}
        <div className="mt-24 border-t border-line pt-12">
          <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
            {t(ui.profile.stackLabel, lang)}
          </span>
          <TechStackInteractive />
        </div>

        {/* contact */}
        <div className="mt-28 text-center">
          <KineticText
            text={t(ui.profile.contactTitle, lang)}
            as="h3"
            reveal
            className="font-serif text-[clamp(36px,7vw,96px)] font-semibold leading-[0.95] tracking-[-0.02em] text-ink"
          />
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {t(ui.profile.contactDesc, lang)}
          </p>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <a
                href="mailto:Jasmix555@gmail.com"
                data-cursor
                className="group inline-flex items-center gap-3 rounded-full bg-clay px-8 py-4 text-lg text-paper transition-colors hover:bg-clay-deep"
              >
                {lang === "jp" ? "メールを送る" : "Send me an email"}
                <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </div>
          <div className="mt-10 flex justify-center gap-3">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.4}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 text-xl text-ink-soft transition-colors hover:border-clay hover:bg-clay hover:text-paper"
                >
                  <s.icon />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
