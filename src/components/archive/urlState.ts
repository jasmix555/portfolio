/**
 * — The query string, as shared state —
 *
 * Two independent writers put things here: the records controls (`sort`,
 * `filter`) and the locale toggle (`lang`). Neither knows about the other, and
 * neither may erase the other's keys.
 *
 * The rule that makes that safe: **every write reads the live URL first**.
 * A writer that merges into its own cached copy of the query will happily drop
 * whatever the other writer added since — so there is no cached copy here, only
 * `window.location` and a patch.
 */
export type Query = Record<string, string>;

const parse = (search: string): Query => {
  const out: Query = {};
  new URLSearchParams(search).forEach((v, k) => {
    if (v) out[k] = v;
  });
  return out;
};

/** What the address bar says right now. */
export const readQuery = (search?: string): Query =>
  parse(
    search ?? (typeof window === "undefined" ? "" : window.location.search)
  );

/** Canonical and sorted, so two equal queries compare equal as strings. */
export const toSearch = (q: Query) => {
  const p = new URLSearchParams();
  Object.keys(q)
    .sort()
    .forEach((k) => p.set(k, q[k]));
  const s = p.toString();
  return s ? `?${s}` : "";
};

/** `null` drops a key — that is how a control returns to its default. */
export const merge = (
  base: Query,
  patch: Record<string, string | null>
): Query => {
  const next = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) delete next[k];
    else next[k] = v;
  }
  return next;
};

/**
 * Patch the live URL, leaving the path alone. Always replaces: none of this is
 * worth a back-button stop of its own, and a history full of filter clicks is
 * a worse back button than one that leaves the page.
 */
export const patchUrl = (patch: Record<string, string | null>): Query => {
  const next = merge(readQuery(), patch);
  window.history.replaceState(
    null,
    "",
    window.location.pathname + toSearch(next) + window.location.hash
  );
  return next;
};
