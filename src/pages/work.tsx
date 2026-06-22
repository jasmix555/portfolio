import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaArrowUpLong,
  FaCheck,
  FaChevronDown,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import WorkCard from "@/components/WorkCard";
import Modal from "@/components/Modal";
import { works, type Work } from "@/data/works";

const workItems = works
  .filter((w) => w.group === "work")
  .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity));
const categories = Array.from(new Set(workItems.flatMap((w) => w.category)));

const BATCH = 9;

function SkeletonCard() {
  return (
    <div className="min-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="h-[200px] animate-pulse bg-white/5" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
        <div className="mt-6 flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function CategoryFilter({
  value,
  onChange,
  options,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  options: string[];
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
    { label: "All categories", val: null },
    ...options.map((c) => ({ label: c, val: c as string | null })),
  ];

  return (
    <div ref={ref} className="relative w-full sm:max-w-[220px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-full border border-white/15 bg-surface py-3 pl-5 pr-4 text-sm transition-colors hover:border-white/25 focus:border-accent focus:outline-none"
      >
        <span className={value ? "text-white" : "text-muted"}>
          {value ?? "All categories"}
        </span>
        <FaChevronDown
          aria-hidden="true"
          className={`text-xs text-faint transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          data-lenis-prevent
          className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/15 bg-surface p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
        >
          {items.map(({ label, val }) => {
            const active = value === val;
            return (
              <li key={label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(val);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-accent/15 text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <FaCheck aria-hidden="true" className="text-xs text-accent" />
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

export default function WorkPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [visible, setVisible] = useState(BATCH);
  const [selected, setSelected] = useState<Work | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

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

  // Auto-load the next batch when the sentinel scrolls into view.
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (loading || !hasMore) return;
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
  }, [loading, hasMore, filtered.length]);

  return (
    <>
      <Head>
        <title>Professional Work — Jason Ng</title>
        <meta
          name="description"
          content="Client campaign and product sites built by Jason Ng with HTML, SCSS and JavaScript."
        />
      </Head>

      <main className="mx-auto min-h-screen max-w-site px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <FaArrowLeftLong aria-hidden="true" /> Back to home
        </Link>

        <header className="mt-10">
          <div className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
            <span className="h-px w-6 bg-accent" /> Professional Work
          </div>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold">
            Sites I&apos;ve built at work
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Client campaign and product sites built with HTML, SCSS and
            JavaScript — focused on accurate, responsive front-end
            implementation from designer handoffs.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xs">
              <FaMagnifyingGlass
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search work…"
                aria-label="Search work"
                className="w-full rounded-full border border-white/15 bg-surface py-3 pl-11 pr-10 text-sm text-white placeholder:text-faint focus:border-accent focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-faint transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FaXmark className="text-xs" />
                </button>
              )}
            </div>
            <CategoryFilter
              value={filter}
              onChange={setFilter}
              options={categories}
            />
          </div>
          <p className="shrink-0 text-sm text-faint">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : shown.map((w, idx) => (
                <WorkCard
                  key={w.title}
                  work={w}
                  index={idx}
                  onSelect={setSelected}
                />
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="mt-12 text-center text-muted">
            No work matches your search.
          </p>
        )}

        {!loading && hasMore && (
          <div
            ref={sentinelRef}
            className="mt-10 flex items-center justify-center gap-2 text-sm text-faint"
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
            Loading more…
          </div>
        )}

        {!loading && !hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(139,123,255,0.4)]"
            >
              <FaArrowUpLong aria-hidden="true" />
              Back to top
            </button>
          </div>
        )}
      </main>

      <Modal selectedWork={selected} onClose={() => setSelected(null)} />
    </>
  );
}
