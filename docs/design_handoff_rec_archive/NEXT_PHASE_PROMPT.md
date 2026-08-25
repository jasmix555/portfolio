# Claude Code — next phase

Paste the prompt below into Claude Code, with the refreshed bundle unzipped at `docs/design_handoff_rec_archive/`.

---

Read `docs/design_handoff_rec_archive/README.md` in full before writing any code, and open `Portfolio V2 Redesign.dc.html` from the same folder in a browser as the visual reference (keep `support.js` and `works/` beside it). It is a labelled artboard canvas, not production code — read values off it and recreate them with this repo's own patterns.

Everything from the previous phases is already shipped and verified: tokens, fonts, JN stamp, scroll field, hero, records index, sort/filter bar, thumbnail hover, glyph resolve, `REVIEW` wording, ledger padding. Do not redo any of it.

Four things to build this phase, in this order.

## 1. The shared modal — the whole point of the archive

One component, three kinds, per the README's "One modal, three kinds" table:

- `RECORD` at `/records/[slug]` — metadata strip, problem / approach / outcome, image, REVIEW band
- `CONCEPT` at `/ideas/[slug]` — same, minus hours and award when absent
- `YEAR` at `/timeline/[year]` — the year's line, its repos, and that year's records as openable links

Reference boards: **02.3** (desktop, with the live redaction) and **03.3** (mobile).

Shared behaviour, all three kinds:

- Own shallow route; the index stays mounted behind, dimmed, with an `rgba(11,11,11,0.82)` halftone scrim over it.
- Panel 1288px, `border: 1px solid #F2F0EB`, ground fill, `padding: 36px 64px 56px`, `max-height: calc(100vh - 80px)` with **internal** scroll under a fixed modal bar. The bar prints `RECORD 04 / 08` and the route; `ESC` cap plus `CLOSE ✕`; `← →` steps to the next item of the same kind.
- Page scroll locked while open, focus trapped in the panel, focus returned to the originating row on close, ESC and backdrop both close.
- Open: backdrop `0 → 0.82` and panel `clip-path: inset(0 0 100% 0) → inset(0)`, snap, 420ms. Fields wipe in at +120ms, snap, 180ms, 40ms stagger. Under reduced motion both appear at final state.

**The REGRET seal is the signature mechanic — get it exactly right.** LEARNT and GROWTH are open. REGRET's text is in the DOM (always exposed to assistive tech, the plate is `aria-hidden`) and sealed under **one opaque `#E5390A` plate** at `inset: -8px`. Never a stack of gapped bars — that leaks glyphs between lines whenever mask pitch and line-height disagree, which is exactly the bug we already fixed once. The 6px halftone, the nine ragged `rgba(11,11,11,0.13)` bars and the 3px misregistration ghost at 55% all sit *on top* of that plate as texture only.

Press-and-hold 600ms to unseal (pointerdown, or Space held while the panel is focused): a 3px progress rule fills during the hold; release early aborts and re-seals; on completion the plate wipes away left→right, `clip-path` only, no fade, 40ms per line. Clicking a revealed field re-seals it with the reverse wipe. The label tracks state: `PRESS AND HOLD TO UNSEAL` → `READING… HOLD` → `RELEASED — CLICK TO RE-REDACT`. Under reduced motion the plate becomes a 1px signal outline labelled `REDACTED — TAP TO UNSEAL`, single tap, no timer, no wipe.

Wire the index rows to it: the whole row is the hit target (click and Enter), and the row's `OPEN ↗`-less minimalism is deliberate — see item 4.

## 2. Ideas, Profile and Contact sections

Boards **02.4**, **02.5**, **02.6**; mobile **03.4**, **03.5**, **03.6**.

- **Ideas (02.4)** — the deliberately empty half of the density pair, straight after the densest section. 160px heading indented 320px, the concept line, two concept entries over a `g5` rule. These two are the only place the `OPEN ↗` tag appears.
- **Profile (02.5)** — bio, the timeline as a vertical register with the 2026 row marked `NOW`, and the stack as **measured bars**: bar width = `months / 36`, tone by recency band, and the number always printed beside it. Never pill badges. Values are in `tech.ts`.
- **Contact (02.6)** — `HIRE ME.` at 160px, the five links, three-line colophon with the JN stamp.

Once these exist, `02 IDEAS` and `03 PROFILE` in the nav stop being inert and the section observer has real targets.

## 3. Route-change glyph resolve, and the 404

Board **02.7** for the mechanic, **02.9** for the page.

Route change: the incoming heading and its label resolve in 3 steps of 60ms — 180ms total, `steps(3,end)`, max 3 blocks, never body copy or numbers. Layout, nav and background must not move. Reuse `GlyphResolve.tsx`; keep the invisible width-holding copy and the `aria-hidden` staging you already built, so nothing reflows and assistive tech never receives a scrambled string.

404 at `/404`: `NOT FILED.` at 160px, the two background layers, no illustration, and the two return buttons. A record slip with nothing on it.

## 4. Two things to keep honest

- **Do not add an `OPEN ↗` tag to the records table.** Eight repeated tags on an eight-row table is eight units of noise. Records and timeline years signal openability through the row hover (bg lift to `#1E1E1E`, 2px signal rule under the title with its space reserved at rest so title metrics never change) plus the section footer sentence. The tag belongs only to the two Ideas entries.
- **Locales never mix.** `bilingual()` is retired: no string may contain both languages. Every new string needs both an EN and a JP entry — nav, column heads, ledger labels, award names (`CORPORATE PRIZE` / `企業賞`), review keys, buttons (`MAIL ↗` / `メール ↗`). The display face switches with the locale: Archivo at −0.045em for EN, Zen Kaku Gothic New 900 at −0.02em / 0.86 for JP, JP body at 1.9 line-height so both lock to the 8px grid. Zen Old Mincho appears only in the JP locale, only on the concept line. Numbers, stack names, routes, `REC`, `ESC`, `CV.PDF` stay Latin in both — they're data, not copy. Board **02.8** is the full JP reference.

## Not for you to write

The React Guide record's `learnt` / `regret` / `growth` in `works.ts` are Jason's own reflections — leave them empty and let the row print "Not written yet." Also still outstanding: `apple-touch-icon.png` needs a raster export of the JN stamp.

## Done means

`npx tsc --noEmit` clean, `next build` compiles, and for each of the three modal kinds: opens on row click and Enter, ESC and backdrop close, focus returns to the row, page scroll locked while open, REGRET unreadable at rest in both locales, and the whole thing behaves under `prefers-reduced-motion` with no information living inside an animation.
