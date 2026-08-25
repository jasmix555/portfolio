export type Lang = "en" | "jp";
export type Pair = { en: string; jp: string };

/** Pick one side of a pair. The only way copy reaches the page. */
export const t = (p: Pair, lang: Lang) => p[lang];

/**
 * — Two locales, never mixed —
 *
 * There is no `bilingual()` any more. The old helper split a stored "JP\n\nEN"
 * blob at render time and fell back to the *same* string for both languages
 * when the separator was missing — which is exactly how a half-translated line
 * reaches the page. Every string below carries a real entry on both sides, and
 * anything derived from `works.ts` is split once in `records.ts` where a
 * missing separator is a loud authoring error rather than a silent leak.
 *
 * Latin stays Latin in both locales: numbers, stack names, routes, `REC`,
 * `ESC`, `CV.PDF`. Those are data, not copy.
 */

/**
 * Display headings, per locale — face, tracking *and* metrics together.
 *
 * The two locales cannot share a size or a line-height. A CJK glyph fills its
 * em box where a Latin letter takes about half, so the same phrase needs
 * roughly two-thirds the size to occupy the same measure. And the line-height
 * has to go *up*, not down: Latin display type survives 0.84 because caps
 * leave slack above and below, while two lines of Zen Kaku at 0.86 overlap
 * outright — which is the air the handoff means when it calls JP "looser".
 *
 * Callers pass the size + leading for each side, so a heading can never be
 * measured for Latin and then handed a Japanese string.
 */
export const headline = (lang: Lang, en: string, jp: string) =>
  lang === "jp"
    ? `font-jp font-black tracking-[-0.02em] ${jp}`
    : `font-extrabold tracking-[-0.045em] [font-stretch:112%] ${en}`;

/** Body copy: JP sits at 1.9 so both locales lock to the same 8px grid. */
export const bodyFace = (lang: Lang) =>
  lang === "jp" ? "font-jp jp-wrap text-body-jp" : "text-body";

export const ui = {
  nav: {
    index: { en: "00 INDEX", jp: "00 索引" },
    records: { en: "01 RECORDS", jp: "01 記録" },
    ideas: { en: "02 IDEAS", jp: "02 構想" },
    profile: { en: "03 PROFILE", jp: "03 経歴" },
    contact: { en: "04 CONTACT", jp: "04 連絡" },
    wordmark: { en: "REC ARCHIVE", jp: "記録アーカイブ" },
    wordmarkShort: { en: "ARCHIVE", jp: "アーカイブ" },
    menu: { en: "MENU", jp: "メニュー" },
    menuClose: { en: "CLOSE ×", jp: "閉じる ×" },
    skip: { en: "SKIP TO RECORDS", jp: "本文へスキップ" },
  },

  hero: {
    role: { en: "FRONTEND ENGINEER", jp: "フロントエンドエンジニア" },
    place: { en: "OSAKA · JP — 34.69N 135.50E", jp: "大阪・日本 — 34.69N 135.50E" },
    open: { en: "● OPEN TO WORK", jp: "● 求職中" },
    // The display word itself is localised: the EN locale signs the archive
    // with the name, the JP locale names the thing.
    wordmark: { en: "JASON\nNG", jp: "記録の棚" },
    fileLabel: { en: "FILE", jp: "概要" },
    file: {
      en: "Frontend engineer in Osaka. Contract work on corporate promotional sites; personal builds from geolocation memory apps to realtime calendars. This site is the archive — every record ships its postmortem.",
      jp: "大阪のフロントエンドエンジニア。受託では企業のプロモーションサイトを、個人では位置情報アプリからリアルタイムカレンダーまで作ってきました。このサイトは記録です。全ての作品に反省まで載せています。",
    },
    spine: {
      en: "Precious memory · Don’t regret · Take action",
      jp: "大切な記憶 · 悔いなく · 行動する",
    },
    scroll: { en: "SCROLL — 01 RECORDS", jp: "SCROLL — 01 記録" },
  },

  ledger: {
    hours: { en: "HOURS LOGGED", jp: "総作業時間" },
    hoursShort: { en: "HOURS", jp: "作業時間" },
    records: { en: "RECORDS FILED", jp: "作品数" },
    recordsShort: { en: "RECORDS", jp: "作品数" },
    awards: { en: "AWARDS", jp: "受賞" },
    awardsShort: { en: "AWARDS", jp: "受賞" },
    reviews: { en: "REVIEWS WRITTEN", jp: "振り返り記入数" },
    reviewsShort: { en: "REVIEWS", jp: "振り返り" },
    years: { en: "YEARS ON RECORD", jp: "活動期間" },
    yearsShort: { en: "YEARS", jp: "活動期間" },
  },

  records: {
    label: { en: "01 / RECORDS", jp: "01 / 記録" },
    head: { en: "PERSONAL\nWORK", jp: "個人制作" },
    nda: {
      en: "CLIENT WORK: UNDER NDA — NOT FILED",
      jp: "受託案件：守秘義務のため非掲載",
    },
    sort: { en: "SORT", jp: "並び替え" },
    sortRecent: { en: "RECENT ↓", jp: "新しい順" },
    sortHours: { en: "HOURS", jp: "時間順" },
    sortAwards: { en: "AWARDS", jp: "受賞順" },
    sortAz: { en: "A–Z", jp: "名前順" },
    filter: { en: "FILTER", jp: "絞り込み" },
    filterAll: { en: "ALL", jp: "すべて" },
    filterApps: { en: "APPS", jp: "アプリ" },
    filterConcept: { en: "CONCEPT", jp: "コンセプト" },
    filterAwarded: { en: "AWARDED", jp: "受賞作" },
    colTitle: { en: "TITLE", jp: "作品" },
    colPeriod: { en: "PERIOD", jp: "期間" },
    colHours: { en: "HRS", jp: "時間" },
    colAward: { en: "AWARD", jp: "受賞" },
    concept: { en: "CONCEPT", jp: "コンセプト" },
    footer: {
      en: "CLICK ANY ROW TO OPEN THE RECORD. ESC CLOSES.",
      jp: "行をクリックすると記録が開きます。ESC で閉じます。",
    },
    tapFooter: {
      en: "TAP A ROW TO OPEN IT",
      jp: "行をタップすると詳細が開きます",
    },
  },

  modal: {
    kindRecord: { en: "RECORD", jp: "記録" },
    kindConcept: { en: "CONCEPT", jp: "構想" },
    kindYear: { en: "YEAR", jp: "年" },
    close: { en: "CLOSE ✕", jp: "閉じる ✕" },
    stepRecord: { en: "← → NEXT RECORD", jp: "← → 次の記録" },
    stepConcept: { en: "← → NEXT CONCEPT", jp: "← → 次の構想" },
    stepYear: { en: "← → NEXT YEAR", jp: "← → 次の年" },
    period: { en: "PERIOD", jp: "期間" },
    hours: { en: "HOURS", jp: "時間" },
    role: { en: "ROLE", jp: "担当" },
    award: { en: "AWARD", jp: "受賞" },
    links: { en: "LINKS", jp: "リンク" },
    live: { en: "LIVE ↗", jp: "サイト ↗" },
    code: { en: "CODE ↗", jp: "コード ↗" },
    problem: { en: "PROBLEM", jp: "課題" },
    approach: { en: "APPROACH", jp: "アプローチ" },
    outcome: { en: "OUTCOME", jp: "成果" },
    overview: { en: "OVERVIEW", jp: "概要" },
    review: { en: "REVIEW", jp: "振り返り" },
    reviewKeys: {
      en: "LEARNT / REGRET / GROWTH",
      jp: "学んだこと / 悔いが残ること / 成長",
    },
    learnt: { en: "LEARNT", jp: "学んだこと" },
    regret: { en: "REGRET", jp: "悔いが残ること" },
    growth: { en: "GROWTH", jp: "成長" },
    notWritten: { en: "NOT WRITTEN YET.", jp: "未記入です。" },
    repos: { en: "REPOS", jp: "リポジトリ" },
    filedThisYear: { en: "RECORDS FILED THIS YEAR", jp: "この年の記録" },
    noneThisYear: { en: "NO RECORDS FILED.", jp: "この年の記録はありません。" },
  },

  redact: {
    sealed: { en: "PRESS AND HOLD TO UNSEAL", jp: "長押しで表示" },
    holding: { en: "READING… HOLD", jp: "読み込み中… そのまま長押し" },
    open: { en: "RELEASED — CLICK TO RE-REDACT", jp: "表示中 — クリックで再封" },
    still: { en: "REDACTED — TAP TO UNSEAL", jp: "非表示 — タップで表示" },
  },

  ideas: {
    label: { en: "02 / IDEAS", jp: "02 / 構想" },
    // Not "unshipped by choice": SpaceLang shipped, is live, and won two
    // prizes. Both were built for competitions, which is the true common thread.
    count: { en: "CONCEPT RECORDS · COMPETITION BUILDS", jp: "件の構想 · コンペ制作" },
    head: { en: "Ideas before\nproducts.", jp: "完成品より\n先に構想を。" },
    standfirst: {
      en: "Two competition builds, both judged and prized. The idea came first here — the brief was mine to set.",
      jp: "どちらもコンペ制作で、審査を受けて受賞しました。ここではアイデアが先。課題設定から自分で決めています。",
    },
    open: { en: "OPEN ↗", jp: "開く ↗" },
  },

  profile: {
    label: { en: "03 / PROFILE", jp: "03 / 経歴" },
    head: { en: "HOW AN\nINTERFACE FEELS", jp: "インターフェースの\n手触り" },
    card: {
      en: "NG / JASON\nOSAKA · JP\nINDONESIAN\nGRAD 2025\nFRONTEND / FULL-STACK",
      jp: "NG / JASON\n大阪・日本\nインドネシア国籍\n2025年卒\nフロントエンド / フルスタック",
    },
    // — Glance strip: the four figures a five-second read should land on. —
    glanceYears: {
      en: "YEARS BUILDING\nINTERFACES · SINCE 2022",
      jp: "インターフェース制作\n2022年から",
    },
    glanceHours: { en: "HOURS LOGGED\nACROSS", jp: "総作業時間\n記録数" },
    glanceTeams: {
      en: "TEAMS LED\nJUNIORS MENTORED",
      jp: "リードしたチーム\n後輩の指導",
    },
    glanceLanguages: { en: "LANGUAGES\nEN · JP · ID · ZH", jp: "話せる言語\n英・日・尼・中" },
    bio: { en: "IN ONE LINE", jp: "ひとことで" },
    lead: {
      en: "A multilingual frontend engineer in Osaka who cares how an interface feels under the hand — clean structure, physical motion.",
      jp: "大阪を拠点にする多言語話者のフロントエンドエンジニア。触れたときの感触にこだわります。整った構造と、身体的なモーション。",
    },
    body: {
      en: "Contracting on corporate promotional sites today. Looking for a product company where I can own features end-to-end, in Japan or overseas.",
      jp: "現在は企業のプロモーションサイトを受託制作。機能を一気通貫で担える事業会社を探しています。日本国内・海外どちらも。",
    },
    timeline: { en: "TRACK 2022 → 2026", jp: "経過 2022 → 2026" },
    now: { en: "NOW", jp: "現在" },
    stack: { en: "CORE STACK — MONTHS IN USE", jp: "主要技術 — 使用月数" },
    groupDaily: { en: "DAILY", jp: "日常的に使用" },
    groupProduct: { en: "PRODUCT WORK", jp: "プロダクト開発" },
    alsoInUse: { en: "ALSO IN USE", jp: "その他使用中" },
    axis: { en: "AXIS 0—36 MO", jp: "軸 0—36ヶ月" },
    months: { en: "MO", jp: "ヶ月" },
  },

  contact: {
    label: { en: "END OF ARCHIVE", jp: "記録終わり" },
    // Not 採用してください。— as a headline that is a plea, and Japanese reads
    // a bare 〜してください imperative at display size as either begging or an
    // order. The confident register for this is an invitation; the ask itself
    // is carried by the line under it.
    head: { en: "HIRE ME.", jp: "一緒に働きませんか。" },
    // Third line lifts to bone — it is the one that answers "can I hire him".
    // 募集中 is what the company posting the role says, not the person after
    // it; from this side it is 求職中.
    open: {
      en: "OPEN TO FRONTEND AND\nFULL-STACK ROLES.",
      jp: "フロントエンド・\nフルスタック職で求職中。",
    },
    openEmph: { en: "JAPAN OR OVERSEAS.", jp: "日本国内・海外どちらも。" },
    colophon: {
      en: "JASON NG · OSAKA JAPAN\nREC ARCHIVE V2 — 2026",
      jp: "JASON NG · 大阪\n記録アーカイブ V2 — 2026",
    },
  },

  buttons: {
    mail: { en: "MAIL ↗", jp: "メール ↗" },
    cv: { en: "CV.PDF ↓", jp: "履歴書 ↓" },
    github: { en: "GITHUB ↗", jp: "GITHUB ↗" },
    linkedin: { en: "LINKEDIN ↗", jp: "LINKEDIN ↗" },
    wantedly: { en: "WANTEDLY ↗", jp: "WANTEDLY ↗" },
  },

  notFound: {
    label: { en: "404 / NOT FILED", jp: "404 / 記録なし" },
    meta: {
      en: "NO RECORD AT THIS ACCESSION NUMBER",
      jp: "この整理番号の記録はありません",
    },
    head: { en: "NOT\nFILED.", jp: "記録\nなし。" },
    body: {
      en: "Whatever was here was never filed, or has been renumbered. The archive only keeps what it can show a review for.",
      jp: "ここにあったものは記録されなかったか、番号が振り直されました。このアーカイブは、振り返りを載せられるものだけを残しています。",
    },
    toIndex: { en: "00 INDEX ↗", jp: "00 索引 ↗" },
    toRecords: { en: "01 RECORDS ↗", jp: "01 記録 ↗" },
  },
} as const;
