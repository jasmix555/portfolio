import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAnchorScroll } from "../SmoothScroll/useAnchorScroll";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";

const links = [
  { key: "work", id: "work", n: "01" },
  { key: "projects", id: "projects", n: "02" },
  { key: "ideas", id: "ideas", n: "03" },
  { key: "profile", id: "profile", n: "04" },
] as const;

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] ${className}`}
    >
      <button
        onClick={() => setLang("en")}
        data-cursor
        className={lang === "en" ? "text-clay" : "text-ink-faint hover:text-ink"}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className="text-ink-faint">/</span>
      <button
        onClick={() => setLang("jp")}
        data-cursor
        className={lang === "jp" ? "text-clay" : "text-ink-faint hover:text-ink"}
        aria-pressed={lang === "jp"}
      >
        日本語
      </button>
    </div>
  );
}

export default function EditorialNav() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const onAnchor = useAnchorScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    onAnchor(e as never, id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-paper/80 backdrop-blur-md" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-editorial items-center justify-between px-6 py-5 transition-[border-color] duration-500 md:px-10 ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => go(e, "top")}
          className="group flex items-baseline gap-2"
          aria-label="Jason Ng — top"
        >
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            Jason Ng
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-label text-ink-faint sm:inline">
            索引
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="group flex items-baseline gap-1.5"
            >
              <span className="font-mono text-[10px] text-ink-faint">{l.n}</span>
              <span
                className={`text-sm transition-colors ${
                  active === l.id
                    ? "text-clay"
                    : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {t(ui.nav[l.key], lang)}
              </span>
            </a>
          ))}
          <LangSwitch className="ml-1" />
          <a
            href="/cv_jason.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-sm text-ink-soft transition-colors hover:text-clay"
          >
            {t(ui.nav.cv, lang)} ↓
          </a>
          <a
            href="mailto:Jasmix555@gmail.com"
            data-cursor
            className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-1.5 text-sm text-ink transition-colors hover:border-clay hover:bg-clay hover:text-paper"
          >
            {t(ui.nav.contact, lang)}
            <FaArrowRightLong className="text-xs transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* mobile: lang + toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LangSwitch />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative z-[60] flex h-6 w-7 flex-col justify-center gap-1.5"
          >
            <span
              className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-center gap-2 bg-paper px-8 transition-[opacity,transform] duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => go(e, l.id)}
            className="flex items-baseline gap-4 border-b border-line py-4"
          >
            <span className="font-mono text-xs text-ink-faint">{l.n}</span>
            <span className="font-serif text-4xl text-ink">
              {t(ui.nav[l.key], lang)}
            </span>
          </a>
        ))}
        <div className="mt-8 flex items-center gap-5">
          <a
            href="mailto:Jasmix555@gmail.com"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-clay px-6 py-3 text-paper"
          >
            {t(ui.nav.contact, lang)} <FaArrowRightLong />
          </a>
          <a
            href="/cv_jason.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft"
          >
            {t(ui.nav.cv, lang)} ↓
          </a>
        </div>
      </div>
    </header>
  );
}
