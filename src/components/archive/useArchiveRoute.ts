import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { patchUrl, readQuery, toSearch, type Query } from "./urlState";

export type { Query };

export type ModalKind = "record" | "concept" | "year";
export type ModalTarget = { kind: ModalKind; id: string } | null;

const PATHS: Record<ModalKind, string> = {
  record: "/records",
  concept: "/ideas",
  year: "/timeline",
};

export const hrefFor = (t: NonNullable<ModalTarget>) =>
  `${PATHS[t.kind]}/${t.id}`;

const parsePath = (path: string): ModalTarget => {
  const clean = path.split("?")[0].split("#")[0].replace(/\/$/, "");
  for (const kind of Object.keys(PATHS) as ModalKind[]) {
    const base = PATHS[kind];
    if (clean.startsWith(`${base}/`)) {
      const id = clean.slice(base.length + 1);
      if (id && !id.includes("/")) return { kind, id };
    }
  }
  return null;
};

const queryOf = (path: string) =>
  readQuery(path.includes("?") ? path.slice(path.indexOf("?")) : "");

const buildUrl = (target: ModalTarget, query: Query) =>
  (target ? hrefFor(target) : "/") + toSearch(query);

/**
 * The URL is the index's state: which record is open (the path) and how the
 * table is sorted and filtered (the query). One hook owns both, because they
 * share a history entry — opening a record must not drop the filter you opened
 * it from, and closing it must give that filter back.
 *
 * The modal has its own URL, but the index behind it must not remount — the
 * whole point is that it stays where it was, dimmed, with your scroll position
 * intact. Next's shallow routing can't do that across two different page files,
 * so opening a record writes the URL with the History API directly and flips
 * local state; `/records/[slug]` and friends exist as real pages purely so a
 * direct hit, a refresh or a shared link still server-renders the index with
 * the right record open.
 *
 * Opening a record pushes — back should close it. Sorting and filtering
 * replace, because a back button that walks you through every filter click you
 * made is a worse button than one that leaves the page.
 *
 * ponytail: bypassing the Next router here is the trade. It holds because
 * nothing on the page navigates with `<Link>` — the nav is hash anchors and the
 * CV is a plain asset — so the router's stale idea of the URL never gets read.
 */
export function useArchiveRoute() {
  const router = useRouter();
  // Parsed from asPath so the server and the first client render agree.
  const [target, setTarget] = useState<ModalTarget>(() =>
    parsePath(router.asPath)
  );
  const [query, setQuery] = useState<Query>(() => queryOf(router.asPath));
  // How many modal URLs this session pushed, so closing can go back rather
  // than stacking a second entry the user has to press back through twice.
  const pushed = useRef(0);

  useEffect(() => {
    // A statically generated page hydrates before Next has filled in the
    // query, so the real one is read off the location once on mount. Without
    // this, a shared `/?sort=hours` link renders unsorted.
    setQuery((prev) => {
      const fromUrl = readQuery();
      return toSearch(prev) === toSearch(fromUrl) ? prev : fromUrl;
    });

    const onPop = () => {
      setTarget(parsePath(window.location.pathname));
      setQuery(readQuery());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Every writer re-reads the URL: the locale toggle writes `lang` into this
  // same query string without going through this hook, so a cached copy here
  // would silently drop it the next time a record opened.
  const go = useCallback(
    (next: ModalTarget, mode: "push" | "replace") => {
      const live = readQuery();
      const url = buildUrl(next, live);
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
      setTarget(next);
      setQuery(live);
    },
    []
  );

  const open = useCallback(
    (next: NonNullable<ModalTarget>) => {
      go(next, "push");
      pushed.current += 1;
    },
    [go]
  );

  /** `← →` between siblings — replaces, so the whole run closes in one back. */
  const step = useCallback(
    (next: NonNullable<ModalTarget>) => go(next, "replace"),
    [go]
  );

  const close = useCallback(() => {
    if (pushed.current > 0) {
      pushed.current -= 1;
      window.history.back(); // popstate clears `target` and restores the query
      return;
    }
    // Landed here directly: there is nothing to go back to.
    go(null, "replace");
  }, [go]);

  /** Patch the query, leaving the path and anyone else's keys alone. */
  const patchQuery = useCallback(
    (patch: Record<string, string | null>) => setQuery(patchUrl(patch)),
    []
  );

  return { target, query, open, step, close, patchQuery };
}
