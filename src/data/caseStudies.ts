// Case-study narratives for flagship projects, keyed by Work.title.
// Content is derived strictly from Jason's own descriptions / awards / metrics —
// no invented performance numbers. Replace the “— add a number” hints with real
// figures (registrations, load time, users, etc.) when you have them.

type Pair = { en: string; jp: string };
export type CaseStudy = {
  problem: Pair; // the brief / why it existed
  approach: Pair; // what you decided + owned
  outcome: Pair; // result (truthful signals: awards, shipped, scope)
};

export const caseStudies: Record<string, CaseStudy> = {
  Reminiscape: {
    problem: {
      en: "I wanted to build something emotionally meaningful and technically complete — a place to leave memories and messages tied to a real location, so that returning there one day quietly 'reunites' you with the person who left them.",
      jp: "感情に響き、かつ技術的にも完成した作品を作りたかった。大切な人の記憶やメッセージをゆかりの場所にそっと残し、いつかまた訪れたときに“再会”できる——そんな体験を形にすることが目標でした。",
    },
    approach: {
      en: "Built solo, end-to-end. I set up an enterprise-style workflow from scratch (Git flow, conventional commits, Husky), modelled the data in Firebase, and implemented geolocation 'time-capsules' with Mapbox — treating it as a real product with a backend, not a design-only front end.",
      jp: "企画から実装まで一人で担当。Git運用・コンベンショナルコミット・Huskyなど企業レベルの開発フローをゼロから整え、Firebaseでデータ設計し、Mapboxで位置情報の“タイムカプセル”を実装。デザインだけでなく、バックエンドを備えた実プロダクトとして作りました。",
    },
    outcome: {
      en: "Won the 作品展示会＋E展 企業賞. My most complete application to date (~300–400 hrs, solo) — the build that gave me confidence I can take a product from idea to working app on my own.",
      jp: "作品展示会＋E展で企業賞を受賞。これまでで最も“アプリとして成立した”作品(約300〜400時間・単独)で、企画から動くプロダクトまで一人でやり切れるという自信につながりました。",
    },
  },

  "Tiny Taskers": {
    problem: {
      en: "A family chore app: parents create missions for their kids, who earn points on completion and redeem them in a parent-curated web shop. The challenge was designing one product for three very different roles — child, parent, admin.",
      jp: "親が子どもにミッションを出し、完了するとポイントが貯まり、親が用意したWebショップでごほうびと交換できる“お手伝いアプリ”。子ども・親・管理者という性質の異なる3つのロールを、一つのプロダクトとして設計することが課題でした。",
    },
    approach: {
      en: "I owned concept, UI, structure and code, and designed the multi-role state and Firebase data model — while mentoring junior teammates new to the stack, teaching React/Next/Firebase as we built.",
      jp: "コンセプト・UI・構造・コードまでを担当し、マルチロールの状態管理とFirebaseのデータ設計を主導。同時に、スタックが初めての後輩にReact/Next/Firebaseを教えながら進めました。",
    },
    outcome: {
      en: "Shipped a working multi-role app, and grew into a team-lead role — learning to put technical decisions into words so others could follow. (Good place to add a usage or adoption number if you have one.)",
      jp: "マルチロールのアプリを動く形まで実装し、技術を言語化して伝えるリードとしての経験を得ました。(利用者数などの数値があれば追記すると効果的)",
    },
  },

  SpaceLang: {
    problem: {
      en: "A language-learning app focused on local slang — the kind of everyday language textbooks skip.",
      jp: "教科書には載らない、現地のスラングを学ぶための言語学習アプリ。",
    },
    approach: {
      en: "My first Next.js + Firebase build and my first time as lead engineer on a team — I also contributed as a designer, deciding how to combine the team's ideas into something people would actually want to use.",
      jp: "初めてのNext.js + Firebase、そして初めてチームのリードエンジニアとして参加。デザイナーとしても関わり、チームのアイデアを“本当に使いたくなる”形にまとめる判断を担いました。",
    },
    outcome: {
      en: "Won two HTML5 Award 2023 prizes — the デザイン賞 (design) and the IMAKE賞. ~103 hrs.",
      jp: "HTML5作品アワード2023で「デザイン賞」と「IMAKE賞」の2賞を受賞。約103時間。",
    },
  },
};
