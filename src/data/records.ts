import { works, type Work } from "./works";
import type { Lang, Pair } from "@/components/archive/i18n";

/**
 * — REC ARCHIVE index —
 *
 * The records table prints short forms of the data in `works`: a file number, a
 * localised title, and abbreviated stack / period / award strings. Those live
 * here rather than inside each `Work` so the record content stays one readable
 * object and the display layer stays one readable table.
 *
 * Numbers are real and every total is derived, so the archive can never print a
 * figure that has drifted from the records. Reminiscape's open range is counted
 * at its midpoint, as the design brief specifies; records with no measured
 * hours set `hoursValue: 0` and flag `unmeasured`, which is what puts the `+`
 * on the printed totals.
 */

/**
 * `works.ts` stores its long-form prose as a single "JP\n\nEN" string. Split it
 * once, here, into a real pair — the render layer only ever sees one language.
 *
 * A field with no separator is an authoring mistake, not something to paper
 * over: returning the same string for both locales is precisely how Japanese
 * ends up printed under an English heading. So it returns null, the field
 * prints "not written yet", and dev builds say which one to fix.
 */
const split = (s: string | undefined, where: string): Pair | null => {
  if (!s) return null;
  const [jp, ...rest] = s.split("\n\n").map((p) => p.trim());
  if (!rest.length) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`records: "${where}" has no JP\\n\\nEN separator — skipped.`);
    }
    return null;
  }
  return { jp, en: rest.join("\n\n") };
};

export type RecordRow = {
  rec: string;
  slug: string;
  title: Pair;
  subtitle: Pair;
  stack: string;
  period: string;
  /** Start year, so a timeline year can gather the records filed under it. */
  year: number;
  hours: string;
  hoursValue: number;
  unmeasured?: boolean;
  /** Honest on solo work: "lead" only where there was a team to lead. */
  role: Pair;
  /** Short form for the table; `—` when there is none. */
  award: Pair;
  /** Long form for the modal's AWARD cell. */
  awardLong?: Pair;
  /** Carries the `CONCEPT` chip and answers the CONCEPT filter. */
  concept?: boolean;
  /** Featured in 02 IDEAS — the only place the `OPEN ↗` tag appears. */
  idea?: boolean;
  /** 02 IDEAS leads with the one thing to take from the build, in signal. */
  takeaway?: Pair;
  blurb?: Pair;
  work: Work;
};

const byTitle = (title: string) => {
  const w = works.find((x) => x.title === title);
  if (!w) throw new Error(`REC ARCHIVE: no work titled "${title}"`);
  return w;
};

const NONE: Pair = { en: "—", jp: "—" };

/** File order — REC 01 is the most recent record. */
export const records: RecordRow[] = [
  {
    rec: "01",
    slug: "react-guide",
    title: { en: "React Guide", jp: "React 学習ガイド" },
    subtitle: {
      en: "A PRACTICAL REACT GUIDE · SOLO BUILD",
      jp: "実務向けReactガイド・単独制作",
    },
    stack: "REACT · NEXT.JS · TAILWIND",
    period: "2026 — LIVE",
    year: 2026,
    // Estimated at one to two working days, not clocked — so it counts at its
    // midpoint and still flags the total as a floor, same as Reminiscape's range.
    hours: "8—16",
    hoursValue: 12,
    unmeasured: true,
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: NONE,
    work: byTitle("React Guide"),
  },
  {
    rec: "02",
    slug: "sakaemachi-gallery",
    // Named for what it is once deployed, not for the repository it lives in:
    // the storefront calls itself 栄町食品店 / SAKAEMACHI GROCERY, and that is
    // what the LIVE link opens. The slug still follows the repo.
    title: { en: "Sakaemachi Grocery", jp: "栄町食品店" },
    subtitle: {
      en: "EC STOREFRONT, ASKED FOR · SOLO BUILD",
      jp: "依頼されたECストアフロント・単独制作",
    },
    stack: "REACT · TS · VITE · SCSS",
    period: "2026/07—08 — LIVE",
    year: 2026,
    // Stated as four to six hours rather than clocked, so it counts at the
    // midpoint and keeps the ledger total honest as a floor.
    hours: "4—6",
    hoursValue: 5,
    unmeasured: true,
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: NONE,
    work: byTitle("Sakaemachi Grocery"),
  },
  {
    rec: "03",
    slug: "calendar-app",
    title: { en: "Calendar App", jp: "カレンダー共有" },
    subtitle: {
      en: "SHARED CALENDARS · SOLO BUILD",
      jp: "カレンダー共有・単独制作",
    },
    stack: "NEXT.JS · TAILWIND · FIREBASE",
    period: "2026",
    year: 2026,
    hours: "4",
    hoursValue: 4,
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: NONE,
    work: byTitle("Calendar App"),
  },
  {
    rec: "04",
    slug: "pokedex",
    title: { en: "Pokédex", jp: "図鑑アプリ" },
    subtitle: {
      en: "POKEAPI FETCH + FILTER · SOLO BUILD",
      jp: "PokeAPI取得と絞り込み・単独制作",
    },
    stack: "REACT · JS · TAILWIND",
    period: "2025",
    year: 2025,
    hours: "8",
    hoursValue: 8,
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: NONE,
    work: byTitle("Pokédex"),
  },
  {
    rec: "05",
    slug: "reminiscape",
    title: { en: "Reminiscape", jp: "記憶のタイムカプセル" },
    subtitle: {
      en: "GEOLOCATION TIME-CAPSULES · SOLO BUILD",
      jp: "位置情報のタイムカプセル・単独制作",
    },
    stack: "NEXT.JS · SCSS · FIREBASE · MAPBOX",
    period: "2024/11—2025/02",
    year: 2024,
    hours: "300—400",
    hoursValue: 350, // midpoint of the stated range
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: { en: "CORPORATE PRIZE", jp: "企業賞" },
    awardLong: {
      en: "CORPORATE PRIZE — EXHIBITION + E-TEN",
      jp: "作品展示会＋E展 企業賞",
    },
    work: byTitle("Reminiscape"),
  },
  {
    rec: "06",
    slug: "tiny-taskers",
    title: { en: "Tiny Taskers", jp: "お手伝いアプリ" },
    subtitle: {
      en: "FAMILY CHORE APP · TEAM LEAD",
      jp: "家族向けお手伝いアプリ・チームリード",
    },
    stack: "NEXT.JS · TS · FIREBASE · FIGMA",
    period: "2024",
    year: 2024,
    hours: "83",
    hoursValue: 83,
    role: { en: "TEAM LEAD — ENG + DESIGN", jp: "チームリード — 実装 + デザイン" },
    award: NONE,
    work: byTitle("Tiny Taskers"),
  },
  {
    rec: "07",
    slug: "spacelang",
    title: { en: "SpaceLang", jp: "スラング学習アプリ" },
    subtitle: {
      en: "SLANG, NOT TEXTBOOKS · LEAD ENG",
      jp: "教科書にないスラング・リードエンジニア",
    },
    stack: "NEXT.JS · SCSS · FIREBASE",
    period: "2023/10—",
    year: 2023,
    hours: "103",
    hoursValue: 103,
    role: { en: "LEAD ENG + DESIGN · TEAM", jp: "リード実装 + デザイン・チーム" },
    award: { en: "DESIGN PRIZE / IMAKE PRIZE", jp: "デザイン賞 / IMAKE賞" },
    awardLong: {
      en: "DESIGN PRIZE / IMAKE PRIZE — HTML5 AWARD 2023",
      jp: "HTML5作品アワード2023 デザイン賞 / IMAKE賞",
    },
    idea: true,
    takeaway: { en: "FIRST TIME LEADING", jp: "初めてのリード" },
    blurb: {
      en: "A language-learning concept — and the first time I led a team of four, splitting the build and reviewing everyone’s code.",
      jp: "言語学習のコンセプト。そして初めて4人チームを率い、実装を分担して全員のコードをレビューした作品です。",
    },
    work: byTitle("SpaceLang"),
  },
  {
    rec: "08",
    slug: "attendance",
    title: { en: "Attendance", jp: "出退勤管理" },
    subtitle: {
      en: "TIME + USER STATE · SOLO BUILD",
      jp: "勤怠と状態管理・単独制作",
    },
    stack: "NEXT.JS · SCSS · FIREBASE",
    period: "2023/12",
    year: 2023,
    hours: "43",
    hoursValue: 43,
    role: { en: "SOLO — ENG + DESIGN", jp: "単独 — 実装 + デザイン" },
    award: NONE,
    work: byTitle("Attendance"),
  },
  {
    rec: "09",
    slug: "sakamachi",
    title: { en: "Sakamachi", jp: "酒街" },
    subtitle: {
      en: "LATE-NIGHT IZAKAYA FINDER · CONCEPT",
      jp: "深夜営業の居酒屋探し・コンセプト",
    },
    stack: "PUG · SCSS · JS · ILLUSTRATOR",
    period: "2023/04—06",
    year: 2023,
    hours: "31",
    hoursValue: 31,
    role: { en: "ENG + DESIGN · TEAM", jp: "実装 + デザイン・チーム" },
    award: { en: "CONCEPT PRIZE", jp: "コンセプト賞" },
    awardLong: {
      en: "CONCEPT PRIZE — EXHIBITION + E-TEN 2023",
      jp: "作品展示会＋E展2023 コンセプト賞",
    },
    concept: true,
    idea: true,
    takeaway: { en: "31 HOURS, START TO FINISH", jp: "着手から提出まで31時間" },
    blurb: {
      en: "A town-guide concept designed, built and submitted inside one weekend — proof I can go from blank file to judged work fast.",
      jp: "街歩きガイドのコンセプトを、設計から実装・提出まで一週末で完了。白紙から審査対象まで一気に持っていける証拠です。",
    },
    work: byTitle("Sakamachi (酒街)"),
  },
];

/** The two entries 02 IDEAS features, in file order. */
export const ideas = records.filter((r) => r.idea);

export const bySlug = (slug: string) => records.find((r) => r.slug === slug);

/** The three review fields, split into real locale pairs. */
export const review = (r: RecordRow) => ({
  learnt: split(r.work.learnt, `${r.slug}.learnt`),
  regret: split(r.work.regret, `${r.slug}.regret`),
  growth: split(r.work.growth, `${r.slug}.growth`),
});

/** Case-study prose lives in `caseStudies.ts`; the rest fall back to summary. */
export const summary = (r: RecordRow) => split(r.work.summary, `${r.slug}.summary`);

export const awardCount = (r: RecordRow) => r.work.awards?.length ?? 0;

export const links = (r: RecordRow) => ({
  live: r.work.link[0],
  code: r.work.link[1],
});

/** Hero ledger + index header figures — all derived from the records above. */
export const ledger = {
  hours: records.reduce((n, r) => n + r.hoursValue, 0),
  /** True while any record's hours are unmeasured — prints totals as `622+`. */
  hoursOpen: records.some((r) => r.unmeasured),
  records: records.length,
  awards: records.reduce((n, r) => n + awardCount(r), 0),
  years: "2022—26",
};

/** `622+` / `622` — the printed total, honest about unmeasured records. */
export const totalHours = `${ledger.hours}${ledger.hoursOpen ? "+" : ""}`;
