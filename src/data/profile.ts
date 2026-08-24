import type { Pair } from "@/components/archive/i18n";

const GH = "https://github.com/jasmix555";

export type Phase = {
  /** Route id — `/timeline/2022-2023`. */
  id: string;
  /** Printed as two mono lines, or one for a single year. */
  label: string;
  /** Inclusive year span, so a phase can gather the records filed in it. */
  from: number;
  to: number;
  text: Pair;
  now?: boolean;
  repos: { label: string; href: string }[];
};

/**
 * Five year-rows became three phases: a reader scanning a CV wants the shape of
 * the run, not an entry per calendar year. The detail did not go anywhere — it
 * is in the record modals, where someone who wants it will look.
 */
export const phases: Phase[] = [
  {
    id: "2022-2023",
    label: "2022\n2023",
    from: 2022,
    to: 2023,
    text: {
      en: "Learned the stack end to end, then led SpaceLang — a four-person team and two HTML5 Award 2023 prizes.",
      jp: "スタックを一通り習得し、SpaceLangでリードを担当。4人チームを率い、HTML5作品アワード2023で2賞を受賞。",
    },
    repos: [
      { label: "space-lang", href: `${GH}/space-lang` },
      { label: "Oh_Matchly", href: `${GH}/Oh_Matchly` },
      { label: "attendance_checker", href: `${GH}/attendance_checker` },
    ],
  },
  {
    id: "2024-2025",
    label: "2024\n2025",
    from: 2024,
    to: 2025,
    text: {
      en: "Went full-stack: Reminiscape, and Tiny Taskers as team lead mentoring juniors. Graduated 2025.",
      jp: "フルスタックへ。Reminiscape、そして後輩を指導しながらリードを務めたTiny Taskers。2025年に卒業。",
    },
    repos: [
      { label: "reminiscape", href: `${GH}/reminiscape` },
      { label: "tiny_taskers", href: `${GH}/tiny_taskers` },
      { label: "pokedex", href: `${GH}/pokedex` },
    ],
  },
  {
    id: "2026",
    label: "2026\nNOW",
    from: 2026,
    to: 2026,
    now: true,
    text: {
      en: "Shipping client sites from designer handoffs — and looking for a product-company frontend role.",
      jp: "デザイン入稿からクライアントサイトを制作中。事業会社のフロントエンド職を探しています。",
    },
    repos: [{ label: "gcal-app", href: `${GH}/gcal-app` }],
  },
];

export const byPhase = (id: string) => phases.find((p) => p.id === id);

export type StackRow = { name: string; months: number; group: "daily" | "product" };

/** 36 months is the axis, because 36 is the longest thing on it. */
export const AXIS_MONTHS = 36;

/**
 * Seven rows, not eighteen. Related tools share a row where they share a
 * number — the chart answers "what does he reach for", and eleven near-
 * identical bars answered it worse than four grouped ones.
 */
export const stack: StackRow[] = [
  { name: "HTML · SCSS", months: 36, group: "daily" },
  { name: "JavaScript", months: 24, group: "daily" },
  { name: "Illustrator · Photoshop", months: 24, group: "daily" },
  { name: "React", months: 12, group: "product" },
  { name: "Next.js", months: 12, group: "product" },
  { name: "Figma · GitHub", months: 12, group: "product" },
  { name: "Firebase · Supabase · SQL", months: 8, group: "product" },
];

/** Everything real but not worth a bar of its own. */
export const alsoInUse =
  "TYPESCRIPT · TAILWIND · FRAMER MOTION · PHP · PRISMA · VERCEL";

/**
 * Tone is a recency band, not a skill level — and the number is printed beside
 * every bar, so the colour never carries meaning on its own.
 */
export const band = (months: number) =>
  months >= 36
    ? "bg-bone"
    : months >= 12
      ? "bg-g7"
      : months >= 5
        ? "bg-g6"
        : "bg-g5";
