# Claude Design prompt — portfolio_v2 redesign

> Paste everything below the line into Claude Design as a single message.

---

You are art-directing a full visual redesign of my personal portfolio site. I need a **design system + page mockups + motion spec**, laid out on one canvas as labelled artboards. Do not write production code — design it.

## Who this is for

I'm **Jason Ng**, a frontend engineer in Osaka, Japan. Graduated 2025, currently a contractor building promotional sites for corporate clients. I'm job hunting for a frontend / full-stack-leaning role at a product company, in Japan or overseas.

The audience is **hiring engineers and designers** at product companies — people who look at 40 portfolios a week and can smell a template in two seconds. The site has to survive that glance. Secondary audience: Japanese recruiters, so the site is bilingual EN / 日本語 with a toggle.

## The problem with the current site

It's a warm-paper editorial site: `#ECE5D6` beige, near-black ink `#1C1A16`, one clay-red accent `#B0432B`, Fraunces display serif + Inter + Space Mono, a beige WebGL wave background, scroll-fade-up on everything.

It's competent and it is also **exactly** what an AI produces when asked for a "tasteful minimal portfolio" in 2026. Paper-beige + high-contrast serif + terracotta accent is now a fingerprint. Throw the whole palette and type system out. Keep only the layout discipline and the content.

## Direction: monochrome brutalist system

Swiss print grid × instrument panel. A designed *system*, not a mood.

- **Colour:** true monochrome — a black, a white/off-white, and a deliberate grey ramp (give me 5–7 steps with hex + the contrast ratio of each against both ends). Plus **exactly one signal colour**, used rarely enough that it means something when it appears. Commit to one and justify it in a caption; candidates to consider, don't feel bound: hazard orange `#FF3B00`, acid yellow `#DDF247`, blueprint blue `#0037FF`. Never introduce a second hue anywhere. The grey ramp does all the other work.
- Decide whether the base is light-first (paper white, ink black) or dark-first (near-black ground, bone type) — pick the one that makes the signal colour hit harder, and say why. Design the opposite mode as a token swap on the foundations board only, not as a second set of page mockups.
- **Type:** extreme scale contrast. A headline at 160–280px sitting directly above 11px mono labels, with nothing in between doing filler duty. Tight negative tracking on the display, generous positive tracking on the labels. Type carries the design; boxes don't.
- **Fonts:** must be Google-Fonts-available and must not be Fraunces, Playfair, Cormorant, Space Grotesk, Space Mono, Poppins, Montserrat, DM Sans, or Inter-as-display. Look at Archivo (variable, has expanded/condensed axes), Instrument Sans, Geist + Geist Mono, IBM Plex Mono, JetBrains Mono. For Japanese, not Noto Sans JP — consider IBM Plex Sans JP, Zen Kaku Gothic New, or Zen Old Mincho as an accent face. JP and EN must sit on the same baseline grid and look intentional together, not like a fallback.
- **Structure:** exposed grid. Visible hairline rules, column markers, coordinates, index numbers, run-lengths, dates, file-ish labels. Rules and 1px hairlines instead of shadows and rounded cards. Border radius: 0 unless you can defend an exception.
- **Density as a compositional tool:** deliberately pair a cramped, data-dense block against a nearly empty one. Even padding everywhere is what makes AI layouts feel dead. I want one section that feels like a spec sheet and one that feels like a title page.
- **Analog degradation, sparingly:** halftone / xerox grain / slight misregistration on the signal colour, as one quiet texture layer. If it reads as a filter or costs legibility, cut it.
- Asymmetry over symmetry. Almost nothing should be centred.

## The content hook — use this, it's the differentiator

Every project in my data carries three written fields I actually wrote: **学んだこと / what I learnt**, **悔いが残ること / what I regret**, and **成長 / how I grew**. Most portfolios only ship the wins. Mine ships the postmortem.

Design the site as an **engineering record / case-file archive**: each project is a record with exposed fields, and `REGRET` is a first-class labelled field, not a humble-brag footnote. This is the thing engineers will respect and the thing no template does. Let the brutalist label-and-coordinate language carry it — it's the same visual grammar as a real incident report.

My concept spine, which any signature idea must serve: **precious memory · don't regret · take action**.

## Signature interaction (one, done properly)

I want **one memorable mechanic** and restraint everywhere else. Everything at rest should be quiet, immediate, and fast. Pick one of these or propose something better, then design it fully — states, frames, timing:

1. **Redacted postmortem.** A project's `LEARNT` and `GROWTH` are visible, but `REGRET` renders as solid signal-colour redaction blocks that only un-censor on a deliberate press-and-hold — the act of choosing to look at your own failure. Block-wipe reveal, no fades.
2. **Growth scrub.** The 2023→2026 timeline is a draggable spine; scrubbing it re-filters the entire page to that moment in my career — stack shrinks, projects disappear, labels rewrite.
3. **Ledger totals.** The hero is a live-counting instrument panel of real numbers from the archive (hours logged, projects shipped, awards, regrets recorded), and the count is the entrance animation.

## Deliver, in this order, as labelled artboards on one canvas

**1. Foundations** — colour swatches with hex + contrast ratios; the grey ramp; the signal colour with usage rules; type specimen showing every step of the scale in EN and JP with sizes and tracking; the grid (columns, gutters, margins at 1440 and 390); spacing scale; motion tokens (max 3 easing curves, max 4 durations — name them); component states for link, button, nav item, EN/JP toggle, reduced-motion toggle, project record row (rest / hover / focus / expanded), label, hairline.

Then one caption: the single biggest change you'd make if I pushed back on this direction.

**2. Desktop pages at 1440** — one artboard each: Hero · Projects index · a project record expanded (showing Problem/Approach/Outcome plus LEARNT/REGRET/GROWTH) · Ideas · Profile (timeline + stack + contact) · Footer.

**3. Mobile at 390** — Hero, Projects index, project record expanded, Profile. Not a squeezed desktop; show what gets dropped and what gets restructured.

**4. Motion spec sheet** — a table artboard, one row per interaction: element · trigger · from → to · easing token · duration · stagger · reduced-motion fallback. Cover the intro loader, hero entrance, the signature mechanic in full, nav behaviour, section transitions, hover/focus states, and page-level scroll behaviour. Ready to hand to Framer Motion.

## Real content — no lorem, no invented numbers

Bilingual: every headline and label in EN and JP.

**Projects (personal work only — my client work is under NDA and cannot appear):**

- **Reminiscape** — 2024/11–2025/2, ~300–400 hrs, Next.js · SCSS · Firebase · Mapbox. Geolocation time-capsules: leave a memory or message for someone at a place tied to them, found again when you return. Solo end-to-end; conventional commits + Husky. Award: 作品展示会＋E展 企業賞（裸賞）.
- **Tiny Taskers** — family task app: parents create missions, kids earn points, redeem in a parent-curated shop. I owned concept, UI, structure and code, and mentored juniors new to the stack.
- **SpaceLang** — awards: HTML5作品アワード 2023 デザイン賞 and IMAKE賞.
- **Calendar App** — 2026, 4 hrs, Next.js · Tailwind · Firebase. Realtime multi-user calendar sharing plus Discord-style code-based sharing.
- **Pokédex** — 2025, 8 hrs, React · JavaScript · Tailwind. PokeAPI, search and generation filtering.
- **Attendance** — internal-style attendance tool.
- **Sakamachi (酒街)** — concept work. Award: 作品展示会＋E展 2023 コンセプト賞.

**Stack, with how long I've used each:** HTML 3y · SCSS 3y · JavaScript 2y · React 1y · Next.js 1y · PHP 5mo · TypeScript · Tailwind · Framer Motion. Firebase 8mo · Supabase 2mo · Prisma 2mo · SQL 2mo. Figma 1y · Illustrator 2y · Photoshop 2y · Adobe XD 2y. GitHub 1y · Vercel 9mo. Design those durations as data, not as pill badges.

**Profile:** frontend engineer, Osaka. Multilingual — English, Japanese, Indonesian, Chinese. Focus on UI/UX quality: clean interfaces, motion that feels physical, interactions that feel good. Growth timeline 2023 → 2026. A CV download link. One email CTA.

Use only the numbers above. Do not invent metrics, user counts, or percentages.

## Hard constraints

Built in Next.js (pages router) + Tailwind + Framer Motion + Lenis smooth scroll, deployed on Vercel. Design tokens land in `tailwind.config.js`, so keep the palette, type scale and spacing expressible as a finite token set — no one-off values scattered through the pages.

There's a working reduced-motion toggle on the site and it must stay meaningful: every motion in the spec needs a non-motion fallback that still communicates.

Accessibility is not optional: 4.5:1 for body text, 3:1 for large text and UI, visible focus states on everything reachable by keyboard, and the signal colour must never be the sole carrier of meaning.

An existing WebGL background layer (a beige wave shader) is being replaced or removed — if you want a generative identity layer under this new system, design what it should be; if it doesn't serve the brutalist direction, say so and drop it.

## Do not do any of this

Purple-to-teal gradients, glassmorphism, glow blobs, gradient text. Warm-beige paper with a high-contrast serif and a terracotta accent. `rounded-2xl` cards with a subtle shadow and a 1px border on every element. Three equal cards in a row under a centred heading. Tech shown as pill badges. Emoji or generic outline icons as section decoration. Uniform section padding down the whole page. Everything fading up 24px on scroll with the same 0.6s ease-out. Copy like "building digital experiences that inspire". Perfectly even 12-column layouts with no tension in them.

If a decision could have gone either way, make the more specific choice and write one line of caption saying why.
