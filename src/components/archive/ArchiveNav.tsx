import { useCallback, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useMotionEnabled } from "../MotionToggle";
import { useLang } from "./LanguageProvider";
import { t, ui } from "./i18n";
import { dur, ease, SECTIONS, useActiveSection } from "./motion";
import Stamp from "./Stamp";

/**
 * `drive` — cubic-bezier(.65,0,.35,1), which is easeInOutCubic exactly, so the
 * eased anchor jump uses the same curve as the nav underscore and the record
 * reorder rather than a second one invented for scrolling.
 */
const drive = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Mirrors `scroll-margin-top` in globals.css: the fixed bar, plus a hairline. */
const NAV_OFFSET = -72;

// The nav stops at PROFILE and hands off to CV.PDF; CONTACT is the footer.
const NAV = SECTIONS.filter((s) => s.id !== "contact");

/**
 * `EN | JP` — 1px g5 box, active half filled bone with ground type. Both halves
 * stay Latin and stay mono: this is a switch, not a sentence, and a switch that
 * renames itself is harder to find than one that doesn't.
 */
function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const cell = compact ? "px-[5px] py-[2px]" : "px-[7px] py-[3px]";

  return (
    <span className="inline-flex border border-g5 font-mono">
      {(["en", "jp"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={code === "en" ? "English" : "日本語"}
          className={`${cell} transition-colors duration-flick ease-snap ${
            lang === code ? "bg-bone text-ground" : "text-g6 hover:text-bone"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </span>
  );
}

export default function ArchiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { enabled } = useMotionEnabled();
  const { lang } = useLang();
  // Underscore follows whichever section owns at least half the viewport.
  const active = useActiveSection();
  const lenis = useLenis();

  const face = lang === "jp" ? "font-jp" : "font-mono";

  /**
   * Eased anchor jumps. Lenis owns the scroll position frame by frame, so a
   * native jump — or `scroll-behavior: smooth` — gets overwritten by its rAF
   * loop on the next tick; the animation has to be handed to Lenis itself.
   *
   * Under reduced motion Lenis is never mounted, `lenis` is undefined and this
   * returns early, leaving the browser's instant jump exactly as it was.
   */
  const jump = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const id = e.currentTarget.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el || !lenis) return;

      e.preventDefault();
      lenis.scrollTo(el, {
        offset: NAV_OFFSET,
        duration: dur.move,
        easing: drive,
      });

      // An anchor moves focus as well as the viewport. Without this a keyboard
      // user scrolls the page and then carries on tabbing from the nav.
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      // Name the section in the URL, but replace: a history entry per nav click
      // turns the back button into a tour of everywhere you have already been.
      window.history.replaceState(null, "", `#${id}`);
    },
    [lenis]
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ground text-label ${face}`}
    >
      {/* Off-screen until it takes focus — the first stop for a keyboard user,
          who otherwise tabs the whole nav before reaching any content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-10 focus:bg-bone focus:px-3 focus:py-2 focus:tracking-btn focus:text-ground"
      >
        {t(ui.nav.skip, lang)}
      </a>

      <div className="flex h-[52px] items-center justify-between border-b border-rule px-5 tracking-btn lg:h-14 lg:px-24 lg:tracking-label">
        {/* Compact lockup — the stamp plus the wordmark, which drops entirely
            on the narrowest phones so the stamp never gets crowded. */}
        <a
          href="#index"
          onClick={jump}
          className="flex items-center gap-2.5 lg:gap-3"
        >
          <span className="lg:hidden">
            <Stamp size={24} />
          </span>
          <span className="hidden lg:block">
            <Stamp size={28} />
          </span>
          <span className="hidden tracking-[0.2em] min-[360px]:inline lg:tracking-label">
            <span className="lg:hidden">{t(ui.nav.wordmarkShort, lang)}</span>
            <span className="hidden lg:inline">{t(ui.nav.wordmark, lang)}</span>
          </span>
          <span className="sr-only">Jason Ng — {t(ui.nav.wordmark, lang)}</span>
        </a>

        {/* — Desktop — */}
        <nav className="hidden items-center gap-8 text-g6 lg:flex">
          {NAV.map((item) => {
            const on = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={jump}
                aria-current={on ? "true" : undefined}
                className={`relative pb-0.5 transition-colors duration-flick ease-snap ${
                  on ? "text-bone" : "hover:text-bone"
                }`}
              >
                {t(item.label, lang)}
                {on &&
                  (enabled ? (
                    <motion.span
                      layoutId="nav-underscore"
                      aria-hidden
                      className="absolute -bottom-[3px] left-0 right-0 h-[3px] bg-signal"
                      transition={{ duration: dur.quick, ease: ease.drive }}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute -bottom-[3px] left-0 right-0 h-[3px] bg-signal"
                    />
                  ))}
              </a>
            );
          })}
          <a
            href="/cv_jason.pdf"
            className="font-mono transition-colors duration-flick ease-snap hover:text-bone"
          >
            CV.PDF
          </a>
          <LangToggle />
        </nav>

        {/* — Mobile — */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <LangToggle compact />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="archive-menu"
            className="text-bone"
          >
            {menuOpen ? t(ui.nav.menuClose, lang) : t(ui.nav.menu, lang)}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="archive-menu"
          className="flex flex-col border-b border-g5 bg-ground px-5 lg:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                jump(e);
                setMenuOpen(false);
              }}
              aria-current={active === item.id ? "true" : undefined}
              className={`border-t border-rule py-4 tracking-btn ${
                active === item.id ? "text-bone" : "text-g6"
              }`}
            >
              {t(item.label, lang)}
            </a>
          ))}
          <a
            href="/cv_jason.pdf"
            onClick={() => setMenuOpen(false)}
            className="border-t border-rule py-4 font-mono tracking-btn text-g6"
          >
            CV.PDF ↓
          </a>
        </div>
      )}
    </header>
  );
}
