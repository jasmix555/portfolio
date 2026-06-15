import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

const links = [
  { label: "About", id: "about" },
  { label: "Tech", id: "tech" },
  { label: "Work", id: "work" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "tech", "work", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-bg/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Jason<span className="text-accent">.</span>Ng
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="z-[60] text-2xl md:hidden"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>

        <div
          className={`fixed inset-y-0 right-0 z-50 flex w-[min(78vw,320px)] flex-col items-start justify-center gap-6 border-l border-white/10 bg-surface p-10 transition-transform duration-300 md:static md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === l.id ? "true" : undefined}
              className={`text-sm font-medium transition-colors ${
                active === l.id ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              active === "contact"
                ? "border-accent bg-accent text-bg"
                : "border-white/15 text-white hover:border-accent hover:bg-accent hover:text-bg"
            }`}
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </nav>
  );
}
