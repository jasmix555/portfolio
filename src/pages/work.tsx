import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeftLong, FaMagnifyingGlass } from "react-icons/fa6";
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

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
    active
      ? "border-accent bg-accent text-bg"
      : "border-white/15 text-muted hover:text-white"
  }`;

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
        w.category.some((c) => c.toLowerCase().includes(q));
      const matchesFilter = !filter || w.category.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  useEffect(() => setVisible(BATCH), [query, filter]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > shown.length;

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
              className="w-full rounded-full border border-white/15 bg-surface py-3 pl-11 pr-4 text-sm text-white placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <p className="text-sm text-faint">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setFilter(null)} className={chip(!filter)}>
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(filter === c ? null : c)}
              className={chip(filter === c)}
            >
              {c}
            </button>
          ))}
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

        {!loading && (hasMore || visible > BATCH) && (
          <div className="mt-10 flex justify-center gap-3">
            {hasMore && (
              <button
                onClick={() => setVisible((v) => v + BATCH)}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:bg-accent hover:text-bg"
              >
                Load more
              </button>
            )}
            {visible > BATCH && (
              <button
                onClick={() => setVisible(BATCH)}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-white"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </main>

      <Modal selectedWork={selected} onClose={() => setSelected(null)} />
    </>
  );
}
