import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FaArrowLeftLong,
  FaArrowUpLong,
  FaCheck,
  FaChevronDown,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import { useLang } from "@/components/editorial/LanguageProvider";
import CustomCursor from "@/components/editorial/CustomCursor";
import RevealImage from "@/components/editorial/RevealImage";
import ProjectOverlay from "@/components/editorial/ProjectOverlay";
import { works, type Work } from "@/data/works";

const LivingBackground = dynamic(
  () => import("@/components/editorial/LivingBackground"),
  { ssr: false }
);

const workItems = works
  .filter((w) => w.group === "work")
  .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity));
const categories = Array.from(new Set(workItems.flatMap((w) => w.category)));

const BATCH = 9;
const year = (s: string) => s.match(/\d{4}/)?.[0] ?? s;

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em]">
      <button
        onClick={() => setLang("en")}
        data-cursor
        className={lang === "en" ? "text-clay" : "text-ink-faint hover:text-ink"}
      >
        EN
      </button>
      <span className="text-ink-faint">/</span>
      <button
        onClick={() => setLang("jp")}
        data-cursor
        className={lang === "jp" ? "text-clay" : "text-ink-faint hover:text-ink"}
      >
        日本語
      </button>
    </div>
  );
}

function CategoryFilter({
  value,
  onChange,
  options,
  allLabel,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  options: string[];
  allLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items: { label: string; val: string | null }[] = [
    { label: allLabel, val: null },
    ...options.map((c) => ({ label: c, val: c as string | null })),
  ];

  return (
    <div ref={ref} className="relative w-full sm:max-w-[220px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-full border border-ink/20 bg-paper-3 py-3 pl-5 pr-4 text-sm transition-colors hover:border-ink/40"
      >
        <span className={value ? "text-ink" : "text-ink-soft"}>
          {value ?? allLabel}
        </span>
        <FaChevronDown
          aria-hidden="true"
          className={`text-xs text-ink-faint transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          data-lenis-prevent
          className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-line bg-paper-3 p-1.5 shadow-[0_16px_40px_rgba(28,26,22,0.18)]"
        >
          {items.map(({ label, val }) => {
            const active = value === val;
            return (
              <li key={label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  data-cursor
                  onClick={() => {
                    onChange(val);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-clay/10 text-clay"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {label}
                  {active && (
                    <FaCheck aria-hidden="true" className="text-xs text-clay" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function WorkGridCard({
  w,
  onSelect,
}: {
  w: Work;
  onSelect: (w: Work) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(w)}
      data-cursor
      className="group block text-left [&_img]:[-webkit-user-drag:none]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3">
        <RevealImage
          src={w.thumbnail}
          alt={w.title}
          className="h-full w-full"
          imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute right-3 top-3 rounded-full bg-paper/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          View
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl leading-tight text-ink">{w.title}</h3>
        <span className="shrink-0 font-mono text-[11px] text-ink-faint">
          {year(w.dateCreated)}
        </span>
      </div>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
        {w.category.slice(0, 2).join(" · ")}
      </div>
    </button>
  );
}

export default function WorkPage() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [visible, setVisible] = useState(BATCH);
  const [selected, setSelected] = useState<Work | null>(null);

  const tr = {
    back: { en: "Back to home", jp: "ホームに戻る" },
    kicker: { en: "Archive / 全作品", jp: "全作品 / Archive" },
    title: { en: "Client work, in full.", jp: "クライアントワーク全件。" },
    desc: {
      en: "Campaign and product sites built for clients of Dentsu Promotion — accurate, responsive front-end implementation from designer handoffs.",
      jp: "電通プロモーションのクライアント向けに制作したキャンペーン・製品サイト。デザイン入稿からの正確でレスポンシブなフロントエンド実装。",
    },
    search: { en: "Search work…", jp: "作品を検索…" },
    all: { en: "All categories", jp: "すべて" },
    results: { en: "results", jp: "件" },
    none: { en: "No work matches your search.", jp: "該当する作品がありません。" },
    more: { en: "Loading more…", jp: "読み込み中…" },
    top: { en: "Back to top", jp: "トップへ戻る" },
  };
  const T = (p: { en: string; jp: string }) => p[lang];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workItems.filter((w) => {
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.summary.toLowerCase().includes(q) ||
        w.category.some((c) => c.toLowerCase().includes(q));
      const matchesFilter = !filter || w.category.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  useEffect(() => setVisible(BATCH), [query, filter]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > shown.length;

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + BATCH);
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, filtered.length]);

  return (
    <>
      <Head>
        <title>Work Archive — Jason Ng</title>
        <meta
          name="description"
          content="The full archive of client campaign and product sites built by Jason Ng."
        />
      </Head>

      <LivingBackground />
      <CustomCursor />

      <main className="relative mx-auto max-w-editorial px-6 pb-10 md:px-10">
        {/* slim sticky bar — wordmark home + language; no section anchors (those
            sections live on the homepage, not here). */}
        <div className="sticky top-0 z-40 -mx-6 flex items-center justify-between border-b border-line bg-paper/80 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10">
          <Link
            href="/"
            data-cursor
            className="group inline-flex items-center gap-2.5 transition-colors"
          >
            <FaArrowLeftLong
              aria-hidden="true"
              className="text-sm text-ink-soft transition-transform group-hover:-translate-x-1 group-hover:text-clay"
            />
            <span className="font-serif text-lg font-semibold text-ink">
              Jason Ng
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-label text-ink-faint sm:inline">
              / {T(tr.back)}
            </span>
          </Link>
          <LangToggle />
        </div>

        <header className="mt-14">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-clay">
            <span className="h-px w-8 bg-clay" /> {T(tr.kicker)}
          </div>
          <h1 className="font-serif text-[clamp(34px,6vw,76px)] font-semibold leading-[0.95] text-ink">
            {T(tr.title)}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {T(tr.desc)}
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xs">
              <FaMagnifyingGlass
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={T(tr.search)}
                aria-label="Search work"
                className="w-full rounded-full border border-ink/20 bg-paper-3 py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-faint focus:border-clay"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  data-cursor
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  <FaXmark className="text-xs" />
                </button>
              )}
            </div>
            <CategoryFilter
              value={filter}
              onChange={setFilter}
              options={categories}
              allLabel={T(tr.all)}
            />
          </div>
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-label text-ink-faint">
            {filtered.length} {T(tr.results)}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((w) => (
            <WorkGridCard key={w.title} w={w} onSelect={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-soft">{T(tr.none)}</p>
        )}

        {hasMore && (
          <div
            ref={sentinelRef}
            className="mt-12 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-label text-ink-faint"
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-clay" />
            {T(tr.more)}
          </div>
        )}

        {!hasMore && filtered.length > BATCH && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-cursor
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm text-ink transition-colors hover:border-clay hover:bg-clay hover:text-paper"
            >
              <FaArrowUpLong aria-hidden="true" />
              {T(tr.top)}
            </button>
          </div>
        )}
      </main>

      <ProjectOverlay work={selected} onClose={() => setSelected(null)} />
    </>
  );
}
