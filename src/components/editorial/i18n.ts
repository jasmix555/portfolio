export type Lang = "en" | "jp";

type Pair = { en: string; jp: string };

/** Pick one side of a bilingual pair. */
export const t = (p: Pair, lang: Lang) => p[lang];

/**
 * Works data stores bilingual text as "JP\n\nEN" in a single string. Split it
 * into a clean { en, jp } pair so the language toggle can re-render real text
 * (never a mixed single line).
 */
export const bilingual = (s?: string): Pair => {
  if (!s) return { en: "", jp: "" };
  const parts = s.split("\n\n").map((p) => p.trim());
  if (parts.length >= 2) {
    return { jp: parts[0], en: parts.slice(1).join("\n\n") };
  }
  return { en: parts[0], jp: parts[0] };
};

/** Roles in the data are Japanese; map the common ones to English. */
const roleMap: Record<string, string> = {
  メインエンジニア: "Lead Engineer",
  メインデザイナー: "Lead Designer",
  チームリード: "Team Lead",
  デザイナー: "Designer",
  SEOスペシャリスト: "SEO Specialist",
};
export const role = (r: string, lang: Lang) =>
  lang === "en" ? roleMap[r] ?? r : r;

/** Static UI copy. */
export const ui = {
  nav: {
    work: { en: "Work", jp: "仕事" },
    projects: { en: "Projects", jp: "制作" },
    ideas: { en: "Ideas", jp: "構想" },
    profile: { en: "Profile", jp: "自己紹介" },
    contact: { en: "Contact", jp: "連絡" },
    cv: { en: "CV", jp: "履歴書" },
  },
  hero: {
    role: { en: "Front-end Engineer", jp: "フロントエンドエンジニア" },
    location: { en: "Osaka · Japan", jp: "大阪・日本" },
    motto: {
      en: "Act first, learn from experience, keep growing.",
      jp: "まず行動し、経験から学び、成長し続ける。",
    },
    bio: {
      en: "I design and build editorial, motion-driven web interfaces — from corporate campaign sites to full data-driven apps. Currently a contractor in Osaka, open to product-company and full-stack-leaning front-end roles.",
      jp: "編集的でモーションを軸にしたWebインターフェースを設計・実装しています。企業のキャンペーンサイトから、データを扱う本格的なアプリまで。現在は大阪で受託として活動しながら、事業会社やフルスタック寄りのフロントエンド職を探しています。",
    },
    available: { en: "Available for work", jp: "求職中" },
  },
  work: {
    kicker: { en: "Work / 仕事", jp: "仕事 / Work" },
    title: { en: "Selected work", jp: "主な仕事" },
    desc: {
      en: "Corporate campaign & product sites built for clients of Dentsu Promotion — front-end, responsive, motion.",
      jp: "電通プロモーションのクライアント向けに制作した企業キャンペーン・製品サイト。フロントエンド実装・レスポンシブ・モーション。",
    },
    hint: { en: "Scroll / drag", jp: "スクロール / ドラッグ" },
    archive: { en: "Full archive", jp: "全アーカイブ" },
    archiveBig: { en: "View the\nfull archive", jp: "全アーカイブ\nを見る" },
  },
  projects: {
    kicker: { en: "Projects / 制作", jp: "制作 / Projects" },
    title: {
      en: "Things I built to learn how things work.",
      jp: "「なぜ動くのか」を理解するために作ったもの。",
    },
    readMore: { en: "Read more", jp: "詳しく見る" },
    close: { en: "Close", jp: "閉じる" },
    full: { en: "Full case study", jp: "ケーススタディを見る" },
    live: { en: "Live", jp: "サイト" },
    code: { en: "Code", jp: "コード" },
    learned: { en: "What I learned", jp: "学んだこと" },
    regret: { en: "What I'd do differently", jp: "反省点" },
    growth: { en: "How I grew", jp: "成長したこと" },
    stack: { en: "Stack", jp: "技術" },
    role: { en: "Role", jp: "担当" },
    overview: { en: "Overview", jp: "概要" },
    problem: { en: "The problem", jp: "課題" },
    approach: { en: "My approach", jp: "アプローチ" },
    outcome: { en: "Outcome", jp: "成果" },
    reflection: { en: "Reflection", jp: "振り返り" },
  },
  ideas: {
    kicker: { en: "Ideas / 構想", jp: "構想 / Ideas" },
    title: { en: "Concepts & experiments.", jp: "コンセプトと実験。" },
    desc: {
      en: "Ideas explored for their own sake — concept pieces and prototypes that pushed an idea ahead of a finished product.",
      jp: "完成品より先にアイデアそのものを試すための、コンセプト作品とプロトタイプ。",
    },
    notes: { en: "Notes from building it", jp: "制作メモ" },
    view: { en: "View the concept →", jp: "コンセプトを見る →" },
  },
  profile: {
    kicker: { en: "Profile / 自己紹介", jp: "自己紹介 / Profile" },
    headPre: {
      en: "A front-end engineer who cares about how an interface ",
      jp: "インターフェースの",
    },
    headEmph: { en: "feels", jp: "「感触」" },
    headPost: { en: ".", jp: "にこだわるフロントエンドエンジニア。" },
    bio1: {
      en: "I'm a multilingual engineer based in Osaka, building everything from corporate campaign sites to full data-driven apps with auth, sharing and real backends. My focus is UI/UX quality — clean interfaces, smooth motion, interactions that actually feel good to use.",
      jp: "大阪を拠点にする多言語話者のエンジニアです。企業のキャンペーンサイトから、認証・共有・本格的なバックエンドを備えたアプリまで幅広く制作しています。重視しているのはUI/UXの質。クリーンなインターフェース、滑らかなモーション、触れて心地よいインタラクションです。",
    },
    bio2: {
      en: "I graduated in 2025 and currently work as a contractor making promotional sites for corporate clients, while moving toward a full-stack-leaning front-end role at a product company.",
      jp: "2025年に卒業し、現在は受託として企業のプロモーションサイトを制作しながら、事業会社でのフルスタック寄りフロントエンド職を目指しています。",
    },
    stackLabel: { en: "Stack / 技術", jp: "技術 / Stack" },
    journeyLabel: { en: "Journey / 歩み", jp: "歩み / Journey" },
    contactTitle: { en: "Let's work together.", jp: "一緒に働きましょう。" },
    contactDesc: {
      en: "Open to front-end / full-stack roles and freelance work. If you're hiring or have a project in mind, my inbox is open.",
      jp: "フロントエンド／フルスタック職、業務委託を募集中です。採用やご依頼のご相談があれば、お気軽にご連絡ください。",
    },
    facts: [
      {
        k: { en: "Based in", jp: "拠点" },
        v: { en: "Osaka, Japan", jp: "大阪、日本" },
      },
      {
        k: { en: "Nationality", jp: "国籍" },
        v: { en: "Indonesian", jp: "インドネシア" },
      },
      {
        k: { en: "Languages", jp: "言語" },
        v: { en: "EN · ID · JP · ZH", jp: "英 · 尼 · 日 · 中" },
      },
      {
        k: { en: "Outside code", jp: "コード以外" },
        v: {
          en: "Drums · Workout · Photography",
          jp: "ドラム・筋トレ・写真",
        },
      },
    ],
  },
  footer: {
    role: {
      en: "Front-end Engineer · Osaka 日本",
      jp: "フロントエンドエンジニア・大阪",
    },
  },
} as const;
