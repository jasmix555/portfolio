# Handoff: REC ARCHIVE — portfolio_v2 monochrome brutalist redesign

## Overview
Full visual redesign of Jason Ng's personal portfolio (`jasmix555/portfolio`, Next.js pages router + Tailwind + Framer Motion + Lenis, Vercel). The site is reframed as an **engineering record archive / case-file system**: each project is a numbered record with exposed fields, and every record carries a short three-part review — `LEARNT`, `REGRET`, `GROWTH` — with `REGRET` given the same weight as the other two. **Two complete locales, one at a time — never mixed.** See "Localisation" below. Replaces the previous warm-paper editorial system (beige `#ECE5D6`, Fraunces, clay `#B0432B`, WebGL wave) entirely.

Concept spine: **precious memory · don't regret · take action / 大切な記憶 · 悔いなく · 行動する**

## About the design files
`Portfolio V2 Redesign.dc.html` is a **design reference created in HTML** — a labelled artboard canvas (foundations, desktop 1440, mobile 390, motion spec), not production code to lift. Open it in a browser (keep `support.js` and `works/` beside it) and read the values off it. The task is to **recreate these designs inside the existing Next.js codebase** using its established patterns: tokens go in `tailwind.config.js`, screens in `src/pages/index.tsx` composition, components under `src/components/`, content stays in `src/data/works.ts` / `caseStudies.ts` / `tech.ts` and the bilingual `i18n.ts` helpers already there.

## Fidelity
**High fidelity.** Colours, type scale, spacing, grid, component states and motion timings are final and exact. Recreate pixel-perfectly. The only intentionally loose parts: exact record-row heights (content-driven) and image crops.

## Artboards in the file
| ID | Board | Notes |
| --- | --- | --- |
| 00 | Current site recreation | The existing beige site, for before/after only. Do not build. |
| 01 | Foundations | Colour, grey ramp + contrast, signal rules, light-mode swap, identity layer, type specimen EN/JP, grids, spacing, motion tokens, component states |
| 02.1–02.6 | Desktop 1440 | Hero · Records index · Record expanded · Ideas · Profile · Footer |
| 02.7 | Desktop 1440 | Intro + route change (glyph resolve, live demo) |
| 03.1–03.6 | Mobile 390 | Hero · Records index · Record modal · Profile · Ideas · Contact |
| 04 | Motion spec | One row per interaction, ready for Framer Motion |

## Design tokens

### Colour — true monochrome + one signal
```js
// tailwind.config.js → theme.extend.colors
ground: '#0B0B0B',   // page base (not pure black — hairlines/grain must stay visible)
g1:     '#141414',   // panel fill                1.07:1 vs ground · 16.2:1 vs bone
g2:     '#1E1E1E',   // row hover                 1.18:1 · 14.6:1
g3:     '#2E2E2E',   // solid hairline            1.49:1 · 11.6:1
g4:     '#4A4A4A',   // disabled type             2.22:1 · 7.8:1
g5:     '#6E6E6E',   // UI borders (3:1 ✓)        3.86:1 · 4.5:1
g6:     '#9A9A9A',   // labels / meta on ground   6.99:1 · 2.5:1
g7:     '#C7C4BD',   // body copy                 11.3:1 · 1.5:1
bone:   '#F2F0EB',   // primary type             17.3:1 vs ground
signal: '#E5390A',   // OXIDE — 4.6:1 vs ground · 3.8:1 vs bone
rule:   'rgba(242,240,235,0.18)', // default 1px hairline
```
Rules: body copy never below `g7`; labels never below `g6`; `g4`/`g5` are structure only (no type under 19px). **No second hue anywhere, ever.**

**Signal usage — max 3 occurrences per viewport.** Allowed: redaction blocks, active nav underscore (3px), focus ring, the `NOW` timeline marker, the `REGRET` field key. Forbidden: body text, fills over 25% of viewport, signal as the sole carrier of meaning (always paired with a word or a rule).

**Light mode** is a token swap on the foundations board only (pages ship dark-first): `--ground #F2F0EB`, `--panel #E4E2DC`, `--type #141414`, `--meta #4A4A4A`, `--rule #C7C4BD`, signal unchanged but never as type under 24px.

### Type — Google Fonts
- **Archivo** variable (`wdth 62..125, wght 300..900`) — display + UI. Hover on record titles animates `font-stretch: 100% → 112%`.
- **IBM Plex Mono** 400/500/600 — all labels, data, numbers.
- **Zen Kaku Gothic New** 400/500/700/900 — Japanese body/display.
- **Zen Old Mincho** 400 — JP accent, concept spine only, once per page.

| Step | Size / line-height / tracking | Face | Use |
| --- | --- | --- | --- |
| display-xl | 280 / 0.82 / −0.05em / 800 wdth112 | Archivo | one per page (hero uses 196 at 1440 to clear the FILE column; 88 at 390) |
| display-l | 160 / 0.84–0.86 / −0.04–0.05em | Archivo / Zen Kaku 900 | section title pages, footer |
| head | 96 / 0.86 / −0.045em / 800 | Archivo | section heads (56 at 390) |
| sub | 56 / 0.98 / −0.03em / 700 | Archivo | POSTMORTEM, MOTION SPEC, ledger figures |
| title | 34 / 1.1 / −0.02em / 600 | Archivo | record titles |
| jp-accent | 34 / 1.3 | Zen Old Mincho | concept spine |
| body | 15 / 1.7 / 0 / 400, `g7`, max 62ch | Archivo | EN body |
| body-jp | 15 / 1.9 / 0.01em | Zen Kaku Gothic New | JP body (+0.2 line-height so both lock to the 8px grid) |
| data | 13 / +0.12em | IBM Plex Mono | figures, periods, stack |
| label | 11 / +0.22em / uppercase | IBM Plex Mono | every label, never scaled below 11 on mobile |

**Nothing exists between 15 and 34px.** Extreme scale contrast is the design.

### Grid & spacing
- 1440: 12 columns, gutter 24, margin 96, column 76px, content max 1248. Display-xl may bleed past the margin (hero sits at `left: 82px`).
- 390: 4 columns, gutter 16, margin 20 (`box-sizing: border-box`).
- Spacing scale: `4 · 8 · 16 · 24 · 40 · 64 · 104 · 168`. Dense blocks use 4–16 only; title blocks use 104–168 only. **Never uniform mid-scale section padding** — the density pairing (dense records table vs. near-empty Ideas board) is the point.
- **Border radius: 0 everywhere. No shadows.** Separation is hairlines: `1px rgba(242,240,235,0.18)` default, `1px #6E6E6E` section boundary, `3px #F2F0EB` page boundary.

### Logo — accession stamp
Type only, no drawn mark: a bone 1px rule box around `JN` (Archivo 800, wdth 112, `letter-spacing:-0.04em`, optical padding `0 0.18em` of the box height) with the signal bar welded to its right edge, width ≈ 0.17× box height. Variants: **primary lockup** (48px stamp + 14px gap + two mono lines `JASON NG` / `REC ARCHIVE` (the stamp letters are `JN`) at 11px/+0.22em) for header, CV and OG image; **compact** (28px stamp + `REC ARCHIVE`) for the sticky bar and mobile, wordmark dropping under 360px; **mark only** at 64/32/16 (at 16 the rule goes 1px and the bar 3px, nothing else changes) for the favicon. Clear space = half the stamp height on all sides. On light ground the box and letters go `#141414`, the bar stays signal. Never: signal as the box or the letters, rounded corners, gradient, rotation, a second hue, or the stamp without its bar.

### Identity layer — scroll-driven field (no sidebar, no progress rail) (replaces the WebGL wave — delete `LivingBackground`)
Three CSS layers, one scroll input, no shader and no canvas. A single passive `scroll` listener behind `requestAnimationFrame` writes to CSS custom properties; nothing else is touched, so it stays on the compositor:
```css
background-color:#0B0B0B;
background-image:
  radial-gradient(rgba(242,240,235,0.05) 1px, transparent 1.3px),           /* halftone */
  repeating-linear-gradient(90deg, rgba(242,240,235,0.08) 0 1px, transparent 1px 96px); /* column rules */
background-size: 6px 6px, auto;

/* layer 1 — halftone, drifts down at 0.06× scroll */
background-position-y: calc(var(--scroll) * 0.06);
/* layer 2 — 96px column rules, slide sideways at −0.12× (page reads as film behind a fixed frame) */
transform: translateX(calc(var(--scroll) * -0.12));
/* layer 3 — section rail in the right margin: 5 static ticks (00 INDEX … 04 CONTACT)
   REMOVED ENTIRELY — no rail, no marker, no progress read-out, no scroll sidebar of any kind.
   The ground moves; the page carries the information. */
```
Scroll handler: `window.addEventListener('scroll', fn, {passive:true})` + rAF throttle; `--scroll` = scrollY in px, `--progress` = scrollY / (scrollHeight − innerHeight), clamped 0–1. Under `prefers-reduced-motion` all three layers freeze at their load position — a static printed ground. Layer opacity is capped so type contrast never moves. Live demo: artboard 01.4.

Misregistration: signal blocks only — a 3px-offset ghost copy at 55% opacity. Never behind type.

### Motion tokens (max 3 curves, 4 durations — the old 900ms `stage` is gone)
```js
ease: { snap: 'cubic-bezier(.2,0,0,1)', drive: 'cubic-bezier(.65,0,.35,1)', cut: 'steps(6,end)' }
dur:  { flick: 80, quick: 180, move: 420, scramble: 420 } // ms — nothing exceeds 420, including first paint
stagger: { row: 40, char: 24 }
```
No springs, no bounce, no parallax. **Nothing fades** — every reveal is a `clip-path` wipe, because print doesn't fade in.

## One modal, three kinds
Every openable thing in the archive uses **the same modal component**. The affordance differs by density: the two concept entries in Ideas carry an `OPEN ↗` tag in mono 11px (`g5` at rest, bone + 1px signal rule on hover); record rows and timeline years carry no tag — the whole row is the hit target, hover (bg lift + signal rule under the title) is the cue, and the section footer states it in words. Eight repeated tags on an 8-row table would be eight units of noise. Three content kinds, differing only in which fields print:

| Kind | Route | Prints |
| --- | --- | --- |
| `RECORD` | `/records/[slug]` | metadata strip, problem / approach / outcome, image, REVIEW band (learnt / regret / growth) |
| `CONCEPT` | `/ideas/[slug]` | same, minus hours and award when absent |
| `YEAR` | `/timeline/[year]` | the year's line, the repos shipped in it, and the records filed that year as openable links |

Shared behaviour in all three: own route (shallow), backdrop `rgba(11,11,11,0.82)` + halftone over the dimmed page, 1288px panel with `border: 1px solid #F2F0EB`, internal scroll under a fixed modal bar, page scroll locked, focus trapped, focus returned to the originating row on close, ESC and backdrop close, `← →` steps to the next item of the same kind.

## Localisation — two locales, never mixed
The previous site glossed Japanese under English (`Reminiscape 記憶のタイムカプセル`). That is gone. Each locale is a complete document:

- **Toggle** reads `EN | JP` (not `日本語`) — 1px `g5` box, active half bone fill with ground type, in both the desktop nav and the mobile header.
- **Every** string switches: nav items (`01 RECORDS` / `01 記録`), column heads (`TITLE` / `作品`), ledger labels (`HOURS LOGGED` / `総作業時間`), award names (`CORPORATE PRIZE` / `企業賞`), review keys (`LEARNT / REGRET / GROWTH` / `学んだこと / 悔いが残ること / 成長`), buttons (`MAIL ↗` / `メール ↗`). No half-translated line anywhere.
- **The display face changes with the locale.** EN uses Archivo (headings −0.045em); JP uses Zen Kaku Gothic New 900 at −0.02em / 0.86 line-height — looser, because CJK needs air the Latin doesn't. JP body runs 1.9 line-height against EN's 1.7 so both lock to the same 8px grid. Zen Old Mincho appears only in the JP locale, only on the concept line.
- **Latin stays Latin in both**: IBM Plex Mono numbers, stack names, routes, `REC`, `ESC`, `CV.PDF`. Those are data, not copy.
- **The English concept line is typeset, not transliterated**: `Precious memory · Don't regret · Take action` sets in Archivo 34/600; the JP locale sets `大切な記憶 · 悔いなく · 行動する` in Zen Old Mincho 34.
- Artboard **02.8** shows the JP hero and records index in full; every other board is the EN locale.

## Pages
| Route | Board | State |
| --- | --- | --- |
| `/` | 02.1–02.6 | index: hero, records, ideas, profile, contact |
| `/records/[slug]` | 02.3 | modal over the dimmed index |
| `/ideas/[slug]` | 02.3 pattern | modal, CONCEPT fields |
| `/timeline/[year]` | 02.3 pattern | modal, YEAR fields |
| `/404` | **02.9** | `NOT FILED.` at 160px, same two background layers, no illustration — a record slip with nothing on it |
| `/cv.pdf` | — | static asset, no page |

## Screens

### 02.1 Hero (1440 × 900)
- Fixed top bar, 56px, `border-bottom` hairline: signal 8px square + `NG / JASON — REC ARCHIVE` on the left; right group `00 INDEX` (active: bone + 3px signal underscore) · `01 RECORDS` · `02 IDEAS` · `03 PROFILE` · `CV.PDF` · EN/日本語 toggle (1px `g5` box, active half filled bone with ground type).
- Two visible column rules at `x = 96` and `x = 1044`, `rgba(242,240,235,0.10)`.
- Meta row at `y = 120`, label style: `FRONTEND ENGINEER / フロントエンドエンジニア` · `OSAKA · JP — 34.69N 135.50E` · `● OPEN TO WORK / 求職中` in signal.
- `JASON / NG` at `left:82, top:190`, 196px/0.84/−0.055em/800 wdth112.
- Right column at `right:96, top:216, width:340`, `border-top 1px #6E6E6E`: label `FILE / 概要`, EN body, JP 13px.
- Ledger strip at `y = 660`, full width between margins, `border-top #6E6E6E` + `border-bottom` hairline, 5 equal cells divided by hairlines: HOURS LOGGED **571** · RECORDS FILED **07** · AWARDS **04** · REVIEWS WRITTEN **08** (label + figure both signal) · YEARS ON RECORD **2022—26**. Figures 56px/700 IBM Plex Mono.
- Bottom left: Zen Old Mincho 34px spine + its EN translation and `SCROLL — 01 RECORDS` in label style. Bottom right: `MAIL ↗` (signal fill, ground type, 600) + `CV.PDF ↓` (1px `g5`).
- **Only real numbers**: 571 hrs = 4+8+350+83+103+43+31 (Reminiscape counted at its 300–400 midpoint); 7 records; 4 awards.

### 02.2 Records index (1440, ~1080)
The spec-sheet section. `border-bottom: 3px bone` header: label `01 / RECORDS — 記録` in signal, `PERSONAL WORK` at 96px; right-aligned meta `7 RECORDS · 571 HRS · 2023—2026` / `CLIENT WORK: UNDER NDA — NOT FILED` / and a dedicated **sort / filter control bar** below the head (`border-top 1px g5`, `border-bottom` hairline, `padding: 14px 0`): left = label `SORT / 並び替え` + a joined segmented group `RECENT ↓ | HOURS | AWARDS | A–Z` (active segment = bone fill, ground type, 600; rest = 1px `g5`, `g7` type, shared borders); right = label `FILTER` + chips `ALL / APPS / CONCEPT / AWARDED` (active = 1px bone, bone type) + a live `8 OF 8 SHOWN` count in `g5`. The count reads `SHOWING 8`. Sorting reorders rows with a FLIP layout animation (y only, drive/420, 24ms stagger)..

Table columns: `52px 88px 1fr 260px 150px 96px 150px`, gap 20, header row in label style with `border-bottom 1px #6E6E6E`, rows `padding: 14px 0` + hairline. Cells per row: REC number (`g5`; signal when hovered/open) · 88×56 thumbnail — `filter: grayscale(1) contrast(1.25) brightness(0.85)` at rest, and on **row** hover `filter: contrast(1.06) saturate(1.04)` (full colour) + `outline: 1px solid #F2F0EB` + `transform: scale(1.12)`, `transform-origin: center center`, `z-index: 5`. Centre origin splits the growth (~5px per side in a 20px gutter) so the crop never crowds the title; transition 180ms snap on transform and filter only · title 34px + JP gloss 13px `g6` · stack (mono 11, `g7`) · period · hours (mono 13 bone) · award, or `—` when there is none (column header `AWARD / 受賞`). Nothing else: no review tick, no field count — a checkmark that is true of every row tells the reader nothing.

Rows, in file order: 01 Calendar App 2026 / 4h · 02 Pokédex 2025 / 8h · 03 Reminiscape 2024/11–2025/02 / 300–400h / 企業賞 · 04 Tiny Taskers 2024 / 83h · 05 SpaceLang 2023/10– / 103h / デザイン賞 + IMAKE賞 · 06 Attendance 2023/12 / 43h · 07 Sakamachi 酒街 2023/04–06 / 31h / コンセプト賞 (+ `CONCEPT` chip, 1px `g5`). Footer: `CLICK OR ENTER ANYWHERE ON A ROW → OPENS THE MODAL. ESC OR BACKDROP CLOSES. SAME BEHAVIOUR IN IDEAS AND ON TIMELINE YEARS.` / `TOTAL 622+ HRS` (no sigma, no record count — the head already states it).

Row states — rest (ground) / hover (`g2` bg, REC number signal, title `font-stretch 112%`, meta lifts to `g7`) / focus-visible (`outline: 2px signal, offset −2px`) / expanded (`g1` bg).

### 02.3 Record modal + signature mechanic (1440 × 1080)
Opens as a **modal on its own route** (`/records/[slug]`, shallow) over the dimmed index — the index stays mounted behind at 50% with an `rgba(11,11,11,0.82)` halftone scrim over it. Panel: 1288px wide, `max-height: calc(100vh - 80px)` with its own internal scroll (`overflow-y:auto`, scrollbar hidden, hairline top/bottom fade omitted — the modal bar stays fixed at the top while the record body scrolls), `border: 1px solid #F2F0EB`, ground fill, `padding: 36px 64px 56px`, centred. Modal bar across the top (hairline under it): `RECORD 04 / 08` · `/records/reminiscape` · `FOCUS TRAPPED · SCROLL LOCKED` on the left, `ESC` key cap (1px `g5`) + `CLOSE ✕` (bone fill) on the right. `← →` steps between records. Body scroll locked, focus trapped in the panel, focus returned to the originating row on close, backdrop click and ESC both close.

- Header: `03` in signal, `Reminiscape` at 96px, JP subtitle `記憶のタイムカプセル · 位置情報 · 単独開発`, `CLOSE ×` right.
- Metadata strip: 6 equal cells split by hairlines — PERIOD `2024/11—2025/02` · HOURS `300—400` · ROLE `LEAD ENG / LEAD DES` · STACK `NEXT · SCSS · FIREBASE · MAPBOX` · AWARD `作品展示会＋E展 企業賞（裸賞）` · LINKS `LIVE ↗ CODE ↗`.
- Body: `1fr 496px`, gap 64. Left = PROBLEM / APPROACH / OUTCOME, each a `110px 1fr` pair with a `border-top` hairline; copy verbatim from `src/data/caseStudies.ts` (EN body + shortened JP). Right = 496×310 image, `grayscale(1) contrast(1.3) brightness(0.9)`, 1px hairline, mono caption `FIG 03.1 — MAP VIEW · CAPTURE 2025/02 …`.
- `REVIEW` band (JP `振り返り`): `border-top 3px bone`, 56px head + JP subtitle `振り返り — 学んだこと / 悔いが残ること / 成長`, then 3 equal panels split by hairlines: **LEARNT / 学んだこと** (1px `g5` key), **REGRET / 悔いが残ること** (signal-filled key, ground type, 600), **GROWTH / 成長**. Copy comes from `works.ts` `learnt` / `regret` / `growth` (EN + trimmed JP via the existing `bilingual()` helper).

**Signature mechanic — redacted postmortem.** LEARNT and GROWTH are open. REGRET's text is in the DOM but sealed under **one opaque `#E5390A` plate** (`position:absolute; inset:-8px`) — never a stack of gapped bars, which leaks glyphs between the lines whenever the mask pitch and the line-height disagree. The 6px halftone and the 9 ragged bars (22px, widths 46–100%, `rgba(11,11,11,0.13)`) sit *on top* of that plate as texture only, plus the 3px misregistration ghost at 55%. The plate lifts only on a deliberate **press-and-hold of 600ms** (pointerdown, or Space held while the panel is focused). A 3px progress rule fills during the hold; release early aborts and re-seals. On completion the blocks wipe away left→right, `clip-path` only, no fade, staggered 40ms per line. Clicking a revealed field re-seals it (reverse wipe, right→left). Label text tracks state: `PRESS AND HOLD TO UNSEAL` → `READING… HOLD` → `RELEASED — CLICK TO RE-REDACT`. Rationale: choosing to look at your own failure should cost a gesture.
Accessibility: the text is always present for screen readers (blocks are `aria-hidden` decoration); reduced motion turns blocks into 1px signal outlines labelled `REDACTED — TAP TO UNSEAL` with a single-tap reveal, no timer, no wipe.

### 02.4 Ideas (1440 × 620)
The empty half of the density pair, immediately after the densest board. Label row `02 / IDEAS — 構想` + `2 CONCEPT RECORDS · UNSHIPPED BY CHOICE`; heading `Ideas ahead / of products.` at 160px indented `margin-left: 320px`; Zen Old Mincho line `完成品より先に、アイデアそのものを。`; bottom register `1fr 1fr 320px` over `border-top 1px #6E6E6E` with two 120×76 thumbnails + titles + mono meta (Sakamachi: `NO MAP API — THAT'S THE REGRET`; SpaceLang: `SLANG, NOT TEXTBOOKS`), and a right-aligned note that concept records carry the same three postmortem fields.

### 02.5 Profile (1440)
- Header `1fr 400px`, `border-bottom 3px bone`: label `03 / PROFILE — 自己紹介`, `HOW AN / INTERFACE FEELS` at 96px; right = 140×180 profile photo **in colour** (`filter: contrast(1.06) saturate(1.02)`, 1px `rgba(242,240,235,0.28)` border — the only colour image on the site, deliberately) beside a mono block: `NG / JASON · OSAKA · JP · INDONESIAN · EN · JP · ID · ZH · GRAD 2025 · DRUMS / GYM / PHOTO`.
- Body `520px 1fr`, gap 80. Left: BIO (21px lead + 15px + JP 13px) then TIMELINE 2022→2026 as `64px 1fr` rows with hairlines, repo names in mono `g6`; the 2026 row is `g1` bg with `border-top/bottom 1px #6E6E6E` and `2026 / NOW` in signal. Content verbatim from `Timeline.tsx`.
- Right: **stack as measured data, not badges.** Rows `120px 1fr 68px`; bar = `months / 36` of the track width, height 12px; tone bands by recency (`bone` 36mo, `g7` 12–24mo, `g6` 8–9mo, `g5` 2–5mo); the number is always printed. Section dividers `CODE` and `DESIGN / OPS` use a 1px dashed 32.7px tick track. Values from `tech.ts`: HTML 36 · SCSS 36 · JS 24 · React 12 · Next 12 · Firebase 8 · PHP 5 · Supabase 2 · Prisma/SQL 2 · TypeScript/Tailwind/Framer `IN USE — UNMEASURED` · Illustrator 24 · Photoshop 24 · Adobe XD 24 · Figma 12 · GitHub 12 · Vercel 9.

### 02.6 Footer (1440 × 520)
`END OF ARCHIVE / 記録終わり` label, `HIRE ME.` at 160px, right column of mono lines (`OPEN TO FRONTEND / FULL-STACK ROLES AND FREELANCE. JAPAN OR OVERSEAS.` + `お気軽にご連絡ください。`), then `border-top 3px bone` with the button row `MAIL ↗` (signal) · `CV.PDF ↓` · `GITHUB ↗` · `LINKEDIN ↗` · `WANTEDLY ↗` (1px `g5`, 14px 18px padding) and a right-aligned three-line colophon.

### 03 Mobile 390
Restructured, not squeezed. Boards run past 844 where the screen scrolls.
- **Dropped:** the 7-column table (no horizontal scroll), index thumbnails, the record's contact-sheet image, stack axis ticks, the ledger as a single row.
- **Restructured:** ledger → 2×2 register with hairline dividers (REGRETS cell in signal); index rows → `1fr 64px` three-line stacks (REC + year + award / title 34px / stack mono) with hours right-aligned, min target 48px; record metadata → 2×2 grid; postmortem fields → stacked bordered cards, REGRET card gets a 1px signal border and three redaction bars with `HOLD TO UNSEAL`; stack list truncates to 6 rows + `+9 MORE — TAP TO EXPAND FULL TABLE`; nav collapses to `NG / ARCHIVE` + EN/日 toggle + `MENU`; hero CTAs become two 50/50 full-width buttons.
- Labels stay 11px at every breakpoint.

## Motion spec (artboard 04 is the table — implement it row for row)
| Element | Trigger | From → To | Ease | Dur | Stagger | Reduced-motion |
| --- | --- | --- | --- | --- | --- | --- |
| **Intro — glyph resolve** | page load | `JASON NG` only: each character cycles random IBM Plex Mono glyphs (`▚▞▓▒░#%&$@*+=-<>/\|01`) and locks left→right in 6 discrete steps of 70ms. No overlay, no bar, no counter — the page is already painted behind it | cut `steps(6,end)` | **420 total** | 24/char | final characters painted, no resolve |
| **Route change** | navigation | incoming heading + its label glyph-resolve in 3 steps of 60ms; max 3 blocks, never body copy or numbers; layout, nav and background do not move | cut `steps(3,end)` | **180 total** | 24/char | text swaps directly |
| Hero display | with resolve | `clip-path inset(0 0 100% 0) → inset(0)` per line; no y, no opacity | snap | move 420 | 40/line | rendered fully visible |
| Ledger figures | on paint | printed at final value — the counter is gone; figures never animate | — | 0 | — | identical |
| **REGRET block (hold)** | pointerdown / Space held | 0–600ms progress rule `scaleX 0→1`; at 600 blocks `clip-path inset(0) → inset(0 0 0 100%)` L→R, text already in DOM | snap | quick 180 | 40/line ×9 | 1px signal outlines, `REDACTED — TAP TO UNSEAL`, single tap, no timer |
| REGRET abort | pointerup <600ms | progress rule → 0, blocks stay sealed | snap | flick 80 | — | n/a |
| REGRET re-seal | click when revealed | `inset(0 100% 0 0) → inset(0)` R→L | snap | quick 180 | 40/line | instant swap back |
| Record row expand | click / Enter | height 78 → auto (measured); rule 18% → `g5`; index → signal | drive | move 420 | — | snaps open, scroll set directly |
| Record fields | row expanded | `inset(0 0 100% 0) → inset(0)` downward wipe | snap | quick 180 | 40/field | present immediately |
| Nav underscore | section ≥50% in view | 3px signal bar `x + width` → new item (`layoutId`) | drive | quick 180 | — | jumps; `aria-current` + bone colour |
| Section head | scroll in, once | 3px bone rule `scaleX 0→1`; heading clip-wipes behind it | snap | move 420 | 0/80 | drawn at full state |
| Index rows | scroll in, once | hairline `scaleX 0→1`; content `inset(0 100% 0 0) → inset(0)` | snap | quick 180 | 40/row cap 7 | all visible on paint |
| Stack bars | scroll in, once | `scaleX 0 → months/36`, origin left; number fixed from frame 0 | drive | move 420 | 24/bar | final width; numbers printed |
| Hover row / thumb / link | pointerenter | bg `#0B0B0B → #1E1E1E`; 2px signal rule under title (space reserved); REC no. → signal; thumb `grayscale(1) → none` + 1px bone outline + `scale(1.0 → 1.12)` origin centre, `z-index 5`, growth split both sides. **Title metrics never change — no reflow, no wrap (`white-space: nowrap`)** | snap | flick 80 / thumb 180 | — | bg + rule apply without transition; thumb takes colour without scaling |
| Sort / filter | click | rows reorder via FLIP (y only); active segment fills bone; count re-prints | drive | move 420 | 24/row | rows reorder instantly, no layout animation |
| Focus-visible | keyboard | 2px signal outline, offset 2→3; size never animated | — | 0 | — | identical |
| EN / JP swap | toggle click | block `inset(0) → inset(0 0 100% 0)` → new lang `inset(0)`; min-height locked to avoid reflow jump | snap | quick 180 | 24/block cap 6 | text replaced in place; `html[lang]` updated either way |
| Page scroll (Lenis) | wheel / key | lerp 0.09, duration 1.05, wheelMultiplier 1; anchor jumps eased | drive | move 420 | — | Lenis destroyed; native scroll |
| Grain / misreg layer | none | static | — | 0 | — | unchanged |

## State management
- `lang: 'en' | 'jp'` — keep `LanguageProvider` and the `t()` lookup, but **retire `bilingual()`**: no string may contain both languages. Persist to localStorage, set `html[lang]`.
- `motionEnabled: boolean` — keep `MotionToggle`; initialise from `prefers-reduced-motion`, persist, and gate every entry in the motion table. State must read as a word (`MOTION ON`), not only a knob position.
- `openRecord: string | null` — one expanded record at a time.
- `revealedRegrets: Set<string>` — per record; `holdingId: string | null` + a 600ms timer for the hold gesture (clear on pointerup/pointercancel/pointerleave/blur).
- `activeSection: string` for the nav underscore (IntersectionObserver at 50%).
- No data fetching — everything is static from `src/data/*`.

## Accessibility (non-negotiable)
Body text ≥4.5:1 (`g7` = 11.3:1), large text and UI ≥3:1 (`g5` = 3.86:1), signal `#E5390A` = 4.6:1 on ground. Visible focus on everything keyboard-reachable (2px signal outline, never animated). The signal colour is never the sole carrier of meaning — every signal use is paired with a word or a rule. Redacted text is always exposed to assistive tech. Stack bars always print their number. Reduced motion is the same document with the wipes removed, not a degraded one.

## Assets
- `works/*.webp` — project screenshots from the repo's `public/works/`, rendered `grayscale(1) contrast(1.25) brightness(0.85)` (record hero: `contrast(1.3) brightness(0.9)`).
- `works/profile.webp` — from `public/profile/profile.webp`. **In colour.**
- `public/cv_jason.pdf`, `favicon.svg`, `og.png` already exist. `og.png` needs a redraw on the new system.
- Fonts from Google: Archivo, IBM Plex Mono, Zen Kaku Gothic New, Zen Old Mincho. Remove Fraunces / Inter / Space Mono / Noto.
- Delete: `LivingBackground` (WebGL wave), `KineticText`, `Marquee`, `RevealImage` fade-ups, `Parallax`, `Magnetic`, and the legacy dark tokens in `tailwind.config.js`.

## Files in this bundle
- `Portfolio V2 Redesign.dc.html` — the artboard canvas (open in a browser; `support.js` and `works/` must sit beside it)
- `support.js` — runtime for the HTML reference only; not for production
- `works/` — images used by the mockups

## One open decision
If the direction gets pushback, the single biggest change is to go **light-first** (bone ground, ink type) and halve the display scale to 96px — a quieter, more credible spec-sheet reading of the same system. Dark-first was chosen because the content is emotional (memory, regret, growth) and the black ground gives that weight room to sit in.


---

## Revision — 2026-08-24 (design boards)

Boards updated to match the implementation and a density pass. No token changes.

**02.4 Ideas** — was a poster: 160px title, 168px of air, two entries in a hairline strip. Now 88px title with a standfirst, and each concept leads with its takeaway in signal colour (`FIRST TIME LEADING`, `31 HOURS, START TO FINISH`) above a 200px thumbnail. Section meta reads `COMPETITION BUILDS` — `UNSHIPPED BY CHOICE` was false of SpaceLang.

**02.5 Profile** — added a four-figure glance strip (4 YEARS / 622 HOURS / 2 TEAMS LED / 4 LANGUAGES) as the first thing under the header. Core stack cut 18 rows → 7 grouped rows in two bands (DAILY, PRODUCT WORK) with the remainder as one `ALSO IN USE` line. Timeline collapsed 5 years → 3 phases. Bio is one 25px line plus one 16px line.

**02.6 Footer** — 520px → 420px. One filled MAIL button + outlined CV.PDF; GitHub / LinkedIn / Wantedly are text links. Build credit 3 lines → 2.

**02.8 JP locale** — JP display type de-clamped: 記録の棚 200px/0.86 → 136px/1.04, 個人制作 88px/0.88 → 60px/1.06, type-spec DISPLAY-L 160px/0.86 → 112px/1.04. Latin leading was never valid for Zen Kaku.

**Column rule** — hero right rule moved 1044px → 1056px (96 × 11), on the lattice.

**Copy** — handoff notes deleted from page copy: the records footer's interaction description, the stack chart's accessibility rationale, the 404's background-layer note, the Ideas click instruction, and `CLICK A PHASE` / `CLICK A YEAR` affordance labels.

**Wrapping** — global `word-break: keep-all; line-break: strict; overflow-wrap: break-word; text-wrap: pretty` so JP obeys kinsoku and Latin stops splitting hyphenated tokens.

Still on you: React Guide's three review fields, `apple-touch-icon.png`, the og.png redraw, and dropping `react-icons` from package.json.
