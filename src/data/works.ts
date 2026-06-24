export type Work = {
  title: string;
  group: "work" | "project" | "concept";
  featured?: number;
  page: string[];
  link: string[];
  summary: string;
  thumbnail: string;
  method: string[];
  category: string[];
  role: string[];
  dateCreated: string;
  totalTime?: string;
  status?: string;
  awards?: { title: string; link?: string }[];
  highlight?: string;
  metrics?: string[];
  learnt?: string;
  regret?: string;
  growth?: string;
};

export const works: Work[] = [
  {
    title: "Pokédex",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://pokedex-orcin-two.vercel.app/",
      "https://github.com/jasmix555/pokedex",
    ],
    summary:
      "PokeAPIを利用してポケモンのデータを取得・表示し、名前検索や世代によるフィルタリングができるポケモン図鑑アプリ。API通信とデータの描画を学ぶために制作しました。\n\nA Pokédex app that fetches and displays Pokémon data via the PokeAPI, with search by name and filtering by generation. I built it to learn API fetching and rendering data.",
    thumbnail: "/works/pokedex.webp",
    method: ["React.js", "JavaScript", "Tailwind"],
    category: ["Frontend", "API Integration", "Solo Project"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2025",
    totalTime: "8 Hours",
    awards: [],
    learnt:
      "PokeAPIからデータを取得し、その結果をオブジェクトとして画面に描画する基本的な流れを学びました。名前による検索や世代によるフィルタリングを実装することで、取得したデータを加工して表示する方法も理解でき、API通信の基礎をある程度つかむことができました。\n\nI learned the basic flow of fetching data from the PokeAPI and rendering the results as objects on screen. By implementing search by name and filtering by generation, I understood how to process and display fetched data, and grasped the basics of API fetching to a reasonable degree.",
    regret:
      "データ取得や状態管理の最適化(キャッシュやローディング処理など)をもっと深く扱えたと思います。また、ページネーションや詳細表示など、図鑑としての機能をさらに充実させる余地がありました。\n\nI think I could have gone deeper into optimizing data fetching and state management (caching, loading states, etc.). There was also room to enrich the Pokédex's features further, such as pagination and detail views.",
    growth:
      "外部APIからのデータ取得、検索・フィルタリングといった実用的な機能を一通り実装できたことで、フロントエンドでのデータの扱い方に自信が持てるようになりました。\n\nBy implementing practical features such as fetching data from an external API and search/filtering, I gained confidence in handling data on the front end.",
  },

  {
    title: "Calendar App",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://gcal-app-tawny.vercel.app/",
      "https://github.com/jasmix555/gcal-app",
    ],
    summary:
      "Teams・Notion・Googleカレンダーのような操作感を目指したカレンダーアプリ。複数ユーザーでのカレンダー共有や、Discordのようなコードによる共有機能を実装し、データの保存・管理について学ぶために制作しました。\n\nA calendar app aiming for a feel similar to Teams, Notion, and Google Calendar. I implemented calendar sharing across multiple users and a Discord-like code-based sharing feature, building it to learn about storing and managing data.",
    metrics: [
      "Realtime multi-user sharing",
      "Code-based sharing (Discord-style)",
      "Next.js · Firebase",
    ],
    thumbnail: "/works/gcal.webp",
    method: ["Next.js", "Tailwind", "Firebase", "Claude Code"],
    category: ["Full-Stack", "Productivity Tool", "Realtime Sharing"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2026",
    totalTime: "4 Hours",
    awards: [],
    learnt:
      "データの保存と管理について深く学ぶことを目的に制作しました。複数ユーザー間でのカレンダー共有や、Discordのようなコードを使った共有機能を実装する中で、ユーザーごとのデータをどのように構造化し、保存・取得するかを考える良い経験になりました。\n\nI built this with the goal of learning deeply about storing and managing data. While implementing calendar sharing across multiple users and a Discord-like code-based sharing feature, it became a great experience in thinking about how to structure, store, and retrieve data for each user.",
    regret:
      "リアルタイム同期や権限管理など、共有機能まわりをより堅牢に作り込む余地がありました。また、TeamsやNotionのようなUI/UXの完成度には、まだ届いていない部分があると感じています。\n\nThere was room to make the sharing features — real-time sync, permission management, and so on — more robust. I also feel the UI/UX hasn't yet reached the polish of Teams or Notion.",
    growth:
      "データの構造設計や保存・共有の仕組みを自分で考えて実装したことで、バックエンド寄りのデータ設計への理解が大きく深まりました。作っていてとても楽しいプロジェクトでした。\n\nBy designing the data structure and building the storage and sharing mechanisms myself, my understanding of backend-oriented data design deepened significantly. It was a really fun project to build.",
  },

  {
    title: "Reminiscape",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://reminiscape-zeta.vercel.app/",
      "https://github.com/jasmix555/reminiscape",
    ],
    summary:
      "大切な人の記憶やメッセージを、ゆかりの場所にそっと残し、いつかまたそこを訪れた時に“再会”できる。過ぎ去った人の足跡も、未来のあなたへ届く記憶として残せます。\n\nA place to quietly leave the memories and messages of someone important in a location tied to them, so that one day when you return you can be “reunited” with them. Even the footprints of those who have passed can remain as memories delivered to the future you.",
    metrics: [
      "Solo end-to-end build",
      "~300–400 hrs",
      "Geolocation time-capsules (Mapbox)",
      "Conventional-commit + Husky CI",
    ],
    thumbnail: "/works/reminiscape.webp",
    method: ["Next.js", "SCSS", "Firebase", "Mapbox"],
    category: ["Full-Stack Web App", "Geolocation", "Award-Winning"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2024/11 ~ 2025/2",
    totalTime: "~300–400 Hours",
    awards: [{ title: "作品展示会＋E展 企業賞（裸賞）" }],
    learnt:
      "企業レベルの開発フローを意識した環境構築を一から整え、Git の push / pull、コンベンショナルコミット、Husky を活用した運用など、チーム開発を前提とした仕組みを構築できるようになった。また、Firebase を本格的に組み込むことで、デザインだけのフロントエンドではなく、実際にバックエンド機能を持つ Web アプリとして成立させる経験を得られた。\n\nI built an environment from scratch with an enterprise-level development flow in mind, learning to set up workflows premised on team development — Git push/pull, conventional commits, and Husky-based operations. By fully integrating Firebase, I gained experience making it work as a real web app with actual backend features, not just a design-only front end.",
    regret:
      "当初の理想形まで完全に作りきることはできず、必要な機能の実装に留まってしまった点は悔いが残る。また、デザイン面も黒・白・灰・青を基調としたシンプルな構成になり、十分に色を使いこなせなかった。ページ構成も最小限で、フレンド（CRUD）、アカウント設定、Mapbox を用いたタイムカプセル投稿機能に必要な画面のみとなってしまった。\n\nI couldn't fully build it to my original ideal and ended up implementing only the necessary features, which I regret. The design also became a simple composition based on black, white, gray, and blue, and I couldn't make full use of color. The page structure was minimal too — only the screens needed for friends (CRUD), account settings, and the Mapbox-based time-capsule posting feature.",
    growth:
      "これまでで最も ‘アプリケーションとして成立している’ 作品を作ることができ、たとえ100%完成に届いていなくても、自分の手で最後まで形にできたことは大きな自信につながった。Next.js や TypeScript の理解もさらに深まり、一人で企画・設計・実装まで進める力が確実に成長したと実感している。\n\nI created my most “complete-as-an-application” work to date, and even if it didn't reach 100% completion, being able to bring it to form with my own hands until the end became a great source of confidence. My understanding of Next.js and TypeScript deepened further, and I truly feel my ability to handle planning, design, and implementation on my own has grown.",
  },

  {
    title: "Tiny Taskers",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://tiny-taskers.vercel.app/",
      "https://github.com/jasmix555/tiny_taskers",
    ],
    summary:
      "子供と親のための「お手伝いアプリ」。親がミッションを作成して子供に割り当て、完了するとポイントが貯まり、親が用意したウェブショップで好きなものと交換できます。UI設計からコーディングまで、ほぼすべてを担当しながらチームメンバーへの指導も行いました。\n\nA family task app where parents create missions for their kids, who earn points on completion and can redeem them in a parent-curated web shop. I handled virtually everything — from concept and UI design to structure and code — while also mentoring junior teammates who were new to the stack.",
    metrics: [
      "Team lead — mentored junior devs",
      "Multi-role app: kid / parent / admin",
      "~83 hrs",
    ],
    thumbnail: "/works/tiny-taskers.webp",
    method: ["Next.js", "TypeScript", "Firebase", "Tailwind", "Figma"],
    category: ["Full-Stack", "EdTech", "Team Project"],
    role: ["メインエンジニア", "メインデザイナー", "チームリード"],
    dateCreated: "2024",
    totalTime: "83 Hours",
    awards: [],
    learnt:
      "アプリの概念自体を一から考え、それをUIとコードに落とし込む経験を積みました。子供・親・管理者という複数のロールを持つアプリの設計は、状態管理やFirebaseのデータ構造を考える良い訓練になりました。また、後輩に対してReact・Next.js・Firebaseの基礎を教えながら進めたことで、自分自身の理解も深まりました。\n\nI gained experience thinking up the app concept from scratch and translating it into UI and code. Designing an app with multiple roles — child, parent, and admin — was great practice for thinking about state management and Firebase data structure. Teaching juniors the basics of React, Next.js, and Firebase as we went also deepened my own understanding.",
    regret:
      "チームプロジェクトでありながら実質的に一人でこなす形になったため、本来のチーム開発の良さを活かしきれませんでした。また、ショップ機能やポイント管理まわりの実装は最低限に留まり、理想の完成形には届きませんでした。\n\nAlthough it was a team project, I effectively carried most of it alone, so I couldn't fully enjoy what real team development has to offer. The shop and point-management features also ended up minimal — nowhere near the ideal I had in mind.",
    growth:
      "アイデア出し・デザイン・構造設計・コーディングまでを一貫して担当し、フロントエンドエンジニアとして必要なプロセス全体を経験できたことは大きな成長でした。後輩を指導したことで、技術を言語化して伝える力も鍛えられ、リードとしての自覚が生まれました。\n\nTaking ownership of the entire process — ideation, design, structure, and coding — was a big step in my growth as a front-end engineer. Mentoring juniors trained me to articulate technical concepts clearly, and it gave me a real sense of what it means to lead.",
  },

  {
    title: "SpaceLang",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://team-project2023.vercel.app/",
      "https://github.com/jasmix555/space-lang",
    ],
    summary:
      "現地のスラングを学ぶ人へ向けた言語習得アプリ\n\nA language-learning app for people who want to learn local slang.",
    metrics: [
      "Lead engineer on a team",
      "First Next.js + Firebase build",
      "~103 hrs",
    ],
    thumbnail: "/works/spacelang.webp",
    method: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["EdTech", "Full-Stack", "Team Project"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    totalTime: "103 Hours",
    awards: [
      {
        title: "HTML5作品アワード 2023 デザイン賞",
        link: "https://html5award.com/award2023",
      },
      {
        title: "HTML5作品アワード 2023 IMAKE賞",
        link: "https://html5award.com/award2023",
      },
    ],
    learnt:
      "このプロジェクトでは、Next.jsとFirebaseを初めて使用しました。フレームワークを使用することが生のJavaScriptでコードを書くよりも効率的であることを学びました。また、初めてのチームでの主要なエンジニアとしての経験もあり、その役割の重さと責任を実感しました。エンジニアとしてだけでなく、デザイナーとしてもプロジェクトに取り組み、チームメンバーと共にページの作成に貢献しました。アイデアを共有し、リーダーとして私はアイデアをどのように実装し、組み合わせてユーザーが本当に使いたいと思う優れたアプリケーションを作成するかについての決定を行いました。\n\nIn this project I used Next.js and Firebase for the first time. I learned that using a framework is more efficient than writing raw JavaScript. It was also my first experience as the lead engineer on a team, and I felt the weight and responsibility of that role. I worked not only as an engineer but also as a designer, contributing to page creation alongside teammates. Sharing ideas and, as the leader, deciding how to implement and combine ideas to create an app users would genuinely want to use.",
    regret:
      "FirebaseやNext.jsの動作原理をより完璧に理解するためにもっと時間を費やすべきでした。例えば、Next.jsを使用してバックエンドコードを書くことができたかどうか、またはDispatchやReduxのようなものを使わずに実装できたかもしれません。また、設計した機能を完全に実装できなかったこともあり、それらのロジックを実装するためのリソースと知識の不足が原因でした。\n\nI should have spent more time understanding how Firebase and Next.js work. For example, whether I could have written backend code with Next.js, or implemented things without Dispatch or Redux. There were also features I designed but couldn't fully implement, due to a lack of resources and knowledge to build that logic.",
    growth:
      "フレームワークの使用、チームでの主要なエンジニアとしての経験、デザイナーとしてのアクティブな参加により、多くのスキルと洞察を得ました。リーダーシップや意思決定のスキルも向上させ、ユーザーエクスペリエンスを重視したアプリケーション開発において成長しました。\n\nThrough using a framework, serving as lead engineer on a team, and actively participating as a designer, I gained many skills and insights. I also improved my leadership and decision-making skills and grew in developing applications with a focus on user experience.",
  },

  {
    title: "Attendance",
    group: "project",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://attendance-checker-three.vercel.app/",
      "https://github.com/jasmix555/attendance_checker",
    ],
    summary:
      "従業員の出退勤を管理するウェブアプリ\n\nA web app for managing employees' clock-in and clock-out.",
    thumbnail: "/works/attendance.webp",
    method: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["Web App", "HR / Attendance", "Solo Project"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/12 ~ 2023/12",
    totalTime: "43 Hours",
    awards: [],
    learnt:
      "FirebaseとNext.jsを利用して、時間とユーザーの状態に焦点を当てたアプリを扱うのは初めてでした。また、このアプリの作成期限を2週間に設定し、何に重点を置くべきかに焦点を当てることができました。\n\nIt was my first time handling an app focused on time and user state using Firebase and Next.js. I also set a two-week deadline for building this app, which helped me focus on what to prioritize.",
    regret:
      "時間管理とユーザーの状態に焦点を当てたアプリケーションにおいて、もっと深く探求すべきでした。もっと柔軟なアプローチや新しいアイディアを試すことで、プロジェクト全体に対する洞察が得られたかもしれません。\n\nI should have explored more deeply in an application focused on time management and user state. Trying more flexible approaches and new ideas might have given me broader insight into the whole project.",
    growth:
      "このプロジェクトを通じて、時間管理やユーザーの状態を扱う経験を通じて、成長しました。短い期間でのデッドライン設定により、効果的な優先順位付けと集中力の向上を経験しました。技術的な挑戦に対処することで、スキルの向上とプロジェクト管理のスキルを向上させることができました。\n\nThrough this project I grew by gaining experience handling time management and user state. Setting a short deadline gave me experience in effective prioritization and improved focus. Tackling technical challenges improved both my skills and my project management.",
  },

  {
    title: "Sakamachi (酒街)",
    group: "concept",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://oh-matchly.vercel.app/",
      "https://github.com/jasmix555/Oh_Matchly",
    ],
    summary:
      "数少ない深夜営業の居酒屋探しが楽になるアプリ\n\nAn app that makes it easier to find the few izakaya open late at night.",
    thumbnail: "/works/sakamachi.webp",
    method: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Frontend", "Location-Based", "Team Project"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    totalTime: "31 Hours",
    status: "Concept",
    awards: [{ title: "作品展示会＋E展 2023 コンセプト賞" }],
    learnt:
      "チームメンバーと共にアプリを開発するためのコーディング環境を構築する方法を学びました。各エンジニアが独自のコーディングの好みを持っているため、他のメンバーとのコーディングスタイルを合わせることが挑戦でした。\n\nI learned how to set up a coding environment for developing an app together with team members. Since each engineer has their own coding preferences, matching coding styles with other members was a challenge.",
    regret:
      "実際にはマップAPIを統合できず、リアルな店舗情報を取得して特定の店舗を検索できるようにすることができませんでした。また、必要なタグやカテゴリによって店舗をフィルタリングするためのフィルターボタンを作成できませんでした。\n\nWe weren't actually able to integrate a map API to fetch real store information and search for specific shops. We also couldn't create filter buttons to filter shops by the necessary tags or categories.",
    growth:
      "GitHubを使用してチームメンバーと協力してコーディングする経験を積むことができました。これにより、整理されていないコーディングを避けるための新しいコーディングアプローチについて考えることができました。また、他のメンバーがコードに変更を加えた場合の管理方法も学びました。\n\nI gained experience collaborating and coding with team members using GitHub. This let me think about new coding approaches to avoid disorganized code, and I also learned how to manage changes other members made to the code.",
  },
];