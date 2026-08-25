import { useLang } from "./LanguageProvider";
import { headline, t, ui } from "./i18n";
import { useReveal } from "./motion";
import Stamp from "./Stamp";

/** One filled action; the profiles are text links, not four more buttons. */
const PROFILES = [
  { href: "https://github.com/jasmix555", label: ui.buttons.github },
  {
    href: "https://www.linkedin.com/in/jason-ng-6bb43a29a/",
    label: ui.buttons.linkedin,
  },
  { href: "https://www.wantedly.com/id/jason_ng555", label: ui.buttons.wantedly },
];

export default function Contact() {
  const { lang } = useLang();
  const face = lang === "jp" ? "font-jp" : "font-mono";
  // The ask, then the ways to answer it — two groups, so the buttons are not
  // already on screen and finished by the time HIRE ME. has landed.
  const ask = useReveal<HTMLDivElement>();
  const acts = useReveal<HTMLDivElement>();

  return (
    <footer
      id="contact"
      className="flex flex-col justify-between gap-10 px-5 pb-9 pt-12 lg:min-h-[420px] lg:gap-0 lg:px-24 lg:pb-9 lg:pt-13"
    >
      <div
        ref={ask.ref}
        className="mx-auto grid w-full max-w-content items-end gap-8 lg:grid-cols-[1fr_320px] lg:gap-16"
      >
        <div>
          <div
            className={`font-mono text-label text-signal ${ask.rv("text")}`}
          >
            {t(ui.contact.label, lang)}
          </div>
          <h2
            className={`mt-3 ${headline(
              lang,
              "text-[52px] leading-[0.86] lg:text-[150px] lg:leading-[0.84]",
              "text-[34px] leading-[1.15] lg:text-[104px] lg:leading-[1.04]"
            )} ${ask.rv("head")}`}
          >
            {t(ui.contact.head, lang)}
          </h2>
        </div>
        <p
          className={`whitespace-pre-line border-t border-g5 pt-3.5 text-[12px] leading-[2] tracking-[0.1em] text-g6 ${face} ${ask.rv("text")}`}
        >
          {t(ui.contact.open, lang)}
          {"\n"}
          <span className="text-bone">{t(ui.contact.openEmph, lang)}</span>
        </p>
      </div>

      <div ref={acts.ref} className="mx-auto w-full max-w-content">
        <span
          aria-hidden
          className={`block h-[3px] bg-bone ${acts.rv("rule")}`}
        />
        <div className="flex flex-col gap-6 pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <div className={`flex gap-2.5 ${acts.rv("text")}`}>
            <a
              href="mailto:Jasmix555@gmail.com"
              className={`flex-1 bg-signal px-6 py-4 text-center text-[12px] font-semibold tracking-btn text-ground transition-colors duration-flick ease-snap hover:bg-bone lg:flex-none ${face}`}
            >
              {t(ui.buttons.mail, lang)}
            </a>
            <a
              href="/cv_jason.pdf"
              className={`flex-1 border border-g5 px-6 py-4 text-center text-[12px] tracking-btn text-bone transition-colors duration-flick ease-snap hover:border-bone hover:bg-bone hover:text-ground lg:flex-none ${face}`}
            >
              {t(ui.buttons.cv, lang)}
            </a>
          </div>

          <div
            style={acts.delay(1)}
            className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-btn ${acts.rv("text")}`}
          >
            {PROFILES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-g5 pb-0.5 text-g7 transition-colors duration-flick ease-snap hover:border-bone hover:text-bone"
              >
                {t(p.label, lang)}
              </a>
            ))}
          </div>
        </div>

        <div
          style={acts.delay(2)}
          className={`flex items-center gap-4 ${acts.rv("text")}`}
        >
          <span className="opacity-70">
            <Stamp size={34} />
          </span>
          <div
            className={`whitespace-pre-line text-[12px] leading-[1.9] tracking-meta text-g5 lg:whitespace-pre lg:text-right ${face}`}
          >
            {t(ui.contact.colophon, lang)}
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
