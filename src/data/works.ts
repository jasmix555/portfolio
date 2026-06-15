export type Work = {
  title: string;
  page: string[];
  link: string[];
  summary: string;
  thumbnail: string;
  method: string[];
  category: string[];
  role: string[];
  dateCreated: string;
  totalTime: string;
  awards?: string[];
  learnt?: string;
  regret?: string;
  growth?: string;
};

export const works: Work[] = [
  {
    title: "Pokédex",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://pokedex-orcin-two.vercel.app/",
      "https://github.com/jasmix555/pokedex",
    ],
    summary:
      "PokeAPIを利用してポケモンのデータを取得・表示し、名前検索や世代によるフィルタリングができるポケモン図鑑アプリ。API通信とデータの描画を学ぶために制作しました。\n\nA Pokédex app that fetches and displays Pokémon data via the PokeAPI, with search by name and filtering by generation. I built it to learn API fetching and rendering data.",
    thumbnail: "/works/pokedex.png",
    method: ["React.js", "JavaScript", "Tailwind"],
    category: ["Frontend", "API Integration", "Solo Project"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2025",
    totalTime: "約8時間（学習）",
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
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://gcal-app-tawny.vercel.app/",
      "https://github.com/jasmix555/gcal-app",
    ],
    summary:
      "Teams・Notion・Googleカレンダーのような操作感を目指したカレンダーアプリ。複数ユーザーでのカレンダー共有や、Discordのようなコードによる共有機能を実装し、データの保存・管理について学ぶために制作しました。\n\nA calendar app aiming for a feel similar to Teams, Notion, and Google Calendar. I implemented calendar sharing across multiple users and a Discord-like code-based sharing feature, building it to learn about storing and managing data.",
    thumbnail: "/works/gcal.png",
    method: ["Next.js", "Tailwind", "Firebase", "Claude Code"],
    category: ["Full-Stack", "Productivity Tool", "Realtime Sharing"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2026",
    totalTime: "約4〜5時間（Claude Code使用）",
    awards: [],
    learnt:
      "データの保存と管理について深く学ぶことを目的に制作しました。複数ユーザー間でのカレンダー共有や、Discordのようなコードを使った共有機能を実装する中で、ユーザーごとのデータをどのように構造化し、保存・取得するかを考える良い経験になりました。\n\nI built this with the goal of learning deeply about storing and managing data. While implementing calendar sharing across multiple users and a Discord-like code-based sharing feature, it became a great experience in thinking about how to structure, store, and retrieve data for each user.",
    regret:
      "リアルタイム同期や権限管理など、共有機能まわりをより堅牢に作り込む余地がありました。また、TeamsやNotionのようなUI/UXの完成度には、まだ届いていない部分があると感じています。\n\nThere was room to make the sharing features — real-time sync, permission management, and so on — more robust. I also feel the UI/UX hasn't yet reached the polish of Teams or Notion.",
    growth:
      "データの構造設計や保存・共有の仕組みを自分で考えて実装したことで、バックエンド寄りのデータ設計への理解が大きく深まりました。作っていてとても楽しいプロジェクトでした。\n\nBy designing the data structure and building the storage and sharing mechanisms myself, my understanding of backend-oriented data design deepened significantly. It was a really fun project to build.",
  },

  {
    title: "防音ルームドットコム",
    page: ["Webアプリケーションリンク"],
    link: ["https://bouonroom.com/"],
    summary:
      "防音ソリューションに特化したWebアプリケーションで、最新のアーキテクチャを用いてユーザー体験、SEO、アニメーションの最適化を実現しました。\n\nA web application specialized in soundproofing solutions, built with a modern architecture to optimize user experience, SEO, and animations.",
    thumbnail: "/works/bouonroom.png",
    method: ["Next.js", "SCSS", "ヘッドレスCMS", "Jamstack"],
    category: ["Corporate Website", "Client Work", "SEO"],
    role: ["メインエンジニア", "SEOスペシャリスト"],
    dateCreated: "2024/07 ~ 2024/09",
    totalTime: "64.75時間",
    awards: [],
    learnt:
      "このプロジェクトで、JamstackアーキテクチャやSEOの技術を習得しました。また、クライアントサイドレンダリングを活用し、サーバの制約がある環境でも効果的に対応する方法を学びました。ヘッドレスCMSを利用したことや、カスタムアニメーションの実装もスキルの幅を広げ、フロントエンドデザインのスキルも向上しました。\n\nIn this project I learned Jamstack architecture and SEO techniques. I also learned how to respond effectively even in environments with server constraints by leveraging client-side rendering. Using a headless CMS and implementing custom animations broadened my skill set and improved my front-end design skills.",
    regret:
      "SSR技術をさらに深く探求し、パフォーマンスをより向上させることができたかもしれません。クライアントのサーバ設定の制限がある中での工夫もしましたが、今後のプロジェクトでの経験として役立てたいと感じました。\n\nI might have been able to explore SSR techniques more deeply to further improve performance. I worked around the limitations of the client's server setup, and I want to make use of that experience in future projects.",
    growth:
      "SEO最適化を考慮したアプリケーション構築や、レスポンシブで視覚的に優れたアニメーションの作成を通じ、多くの技術的成長を実感しました。また、モジュール化されたコードの構成の理解も深まり、アプリケーションのスケーラビリティと保守性が向上しました。\n\nThrough building an SEO-optimized application and creating responsive, visually appealing animations, I felt a lot of technical growth. I also deepened my understanding of modular code structure, improving the application's scalability and maintainability.",
  },

  {
    title: "Reminiscape",
    page: ["Webアプリケーションリンク"],
    link: ["https://reminiscape-zeta.vercel.app/"],
    summary:
      "大切な人の記憶やメッセージを、ゆかりの場所にそっと残し、いつかまたそこを訪れた時に“再会”できる。過ぎ去った人の足跡も、未来のあなたへ届く記憶として残せます。\n\nA place to quietly leave the memories and messages of someone important in a location tied to them, so that one day when you return you can be “reunited” with them. Even the footprints of those who have passed can remain as memories delivered to the future you.",
    thumbnail: "/works/reminiscape.png",
    method: ["Next.js", "SCSS", "Firebase", "Mapbox"],
    category: ["Full-Stack Web App", "Geolocation", "Award-Winning"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2024/11 ~ 2025/2",
    totalTime: "約200〜300時間",
    awards: ["企業賞（株式会社裸）"],
    learnt:
      "企業レベルの開発フローを意識した環境構築を一から整え、Git の push / pull、コンベンショナルコミット、Husky を活用した運用など、チーム開発を前提とした仕組みを構築できるようになった。また、Firebase を本格的に組み込むことで、デザインだけのフロントエンドではなく、実際にバックエンド機能を持つ Web アプリとして成立させる経験を得られた。\n\nI built an environment from scratch with an enterprise-level development flow in mind, learning to set up workflows premised on team development — Git push/pull, conventional commits, and Husky-based operations. By fully integrating Firebase, I gained experience making it work as a real web app with actual backend features, not just a design-only front end.",
    regret:
      "当初の理想形まで完全に作りきることはできず、必要な機能の実装に留まってしまった点は悔いが残る。また、デザイン面も黒・白・灰・青を基調としたシンプルな構成になり、十分に色を使いこなせなかった。ページ構成も最小限で、フレンド（CRUD）、アカウント設定、Mapbox を用いたタイムカプセル投稿機能に必要な画面のみとなってしまった。\n\nI couldn't fully build it to my original ideal and ended up implementing only the necessary features, which I regret. The design also became a simple composition based on black, white, gray, and blue, and I couldn't make full use of color. The page structure was minimal too — only the screens needed for friends (CRUD), account settings, and the Mapbox-based time-capsule posting feature.",
    growth:
      "これまでで最も ‘アプリケーションとして成立している’ 作品を作ることができ、たとえ100%完成に届いていなくても、自分の手で最後まで形にできたことは大きな自信につながった。Next.js や TypeScript の理解もさらに深まり、一人で企画・設計・実装まで進める力が確実に成長したと実感している。\n\nI created my most “complete-as-an-application” work to date, and even if it didn't reach 100% completion, being able to bring it to form with my own hands until the end became a great source of confidence. My understanding of Next.js and TypeScript deepened further, and I truly feel my ability to handle planning, design, and implementation on my own has grown.",
  },

  {
    title: "SpaceLang",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://team-project2023.vercel.app/",
      "https://github.com/jasmix555/space-lang",
    ],
    summary:
      "現地のスラングを学ぶ人へ向けた言語習得アプリ\n\nA language-learning app for people who want to learn local slang.",
    thumbnail: "/works/spacelang.png",
    method: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["EdTech", "Full-Stack", "Team Project"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    totalTime: "103 Hours",
    awards: ["/awards/Award2.svg", "/awards/Award3.svg"],
    learnt:
      "このプロジェクトでは、Next.jsとFirebaseを初めて使用しました。フレームワークを使用することが生のJavaScriptでコードを書くよりも効率的であることを学びました。また、初めてのチームでの主要なエンジニアとしての経験もあり、その役割の重さと責任を実感しました。エンジニアとしてだけでなく、デザイナーとしてもプロジェクトに取り組み、チームメンバーと共にページの作成に貢献しました。アイデアを共有し、リーダーとして私はアイデアをどのように実装し、組み合わせてユーザーが本当に使いたいと思う優れたアプリケーションを作成するかについての決定を行いました。\n\nIn this project I used Next.js and Firebase for the first time. I learned that using a framework is more efficient than writing raw JavaScript. It was also my first experience as the lead engineer on a team, and I felt the weight and responsibility of that role. I worked not only as an engineer but also as a designer, contributing to page creation alongside teammates. Sharing ideas and, as the leader, deciding how to implement and combine ideas to create an app users would genuinely want to use.",
    regret:
      "FirebaseやNext.jsの動作原理をより完璧に理解するためにもっと時間を費やすべきでした。例えば、Next.jsを使用してバックエンドコードを書くことができたかどうか、またはDispatchやReduxのようなものを使わずに実装できたかもしれません。また、設計した機能を完全に実装できなかったこともあり、それらのロジックを実装するためのリソースと知識の不足が原因でした。\n\nI should have spent more time understanding how Firebase and Next.js work. For example, whether I could have written backend code with Next.js, or implemented things without Dispatch or Redux. There were also features I designed but couldn't fully implement, due to a lack of resources and knowledge to build that logic.",
    growth:
      "フレームワークの使用、チームでの主要なエンジニアとしての経験、デザイナーとしてのアクティブな参加により、多くのスキルと洞察を得ました。リーダーシップや意思決定のスキルも向上させ、ユーザーエクスペリエンスを重視したアプリケーション開発において成長しました。\n\nThrough using a framework, serving as lead engineer on a team, and actively participating as a designer, I gained many skills and insights. I also improved my leadership and decision-making skills and grew in developing applications with a focus on user experience.",
  },

  {
    title: "Attendance",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://attendance-checker-three.vercel.app/",
      "https://github.com/jasmix555/attendance_checker",
    ],
    summary:
      "従業員の出退勤を管理するウェブアプリ\n\nA web app for managing employees' clock-in and clock-out.",
    thumbnail: "/works/attendance.png",
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
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://oh-matchly.vercel.app/",
      "https://github.com/jasmix555/Oh_Matchly",
    ],
    summary:
      "数少ない深夜営業の居酒屋探しが楽になるアプリ\n\nAn app that makes it easier to find the few izakaya open late at night.",
    thumbnail: "/works/sakamachi.jpg",
    method: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Frontend", "Location-Based", "Team Project"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    totalTime: "31 Hours",
    awards: ["/awards/Award1.svg"],
    learnt:
      "チームメンバーと共にアプリを開発するためのコーディング環境を構築する方法を学びました。各エンジニアが独自のコーディングの好みを持っているため、他のメンバーとのコーディングスタイルを合わせることが挑戦でした。\n\nI learned how to set up a coding environment for developing an app together with team members. Since each engineer has their own coding preferences, matching coding styles with other members was a challenge.",
    regret:
      "実際にはマップAPIを統合できず、リアルな店舗情報を取得して特定の店舗を検索できるようにすることができませんでした。また、必要なタグやカテゴリによって店舗をフィルタリングするためのフィルターボタンを作成できませんでした。\n\nWe weren't actually able to integrate a map API to fetch real store information and search for specific shops. We also couldn't create filter buttons to filter shops by the necessary tags or categories.",
    growth:
      "GitHubを使用してチームメンバーと協力してコーディングする経験を積むことができました。これにより、整理されていないコーディングを避けるための新しいコーディングアプローチについて考えることができました。また、他のメンバーがコードに変更を加えた場合の管理方法も学びました。\n\nI gained experience collaborating and coding with team members using GitHub. This let me think about new coding approaches to avoid disorganized code, and I also learned how to manage changes other members made to the code.",
  },

  {
    title: "Foodera",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://foodera-nine.vercel.app/",
      "https://github.com/jasmix555/Foodera",
    ],
    summary:
      "流行してる料理や新しい料理の経験を簡単で探せるアプリ\n\nAn app for easily discovering trending dishes and new culinary experiences.",
    thumbnail: "/works/foodera.jpg",
    method: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Frontend", "FoodTech", "Solo Project"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/05 ~ 2023/06",
    totalTime: "47 Hours",
    awards: [],
    learnt:
      "このプロジェクトを通じて、アプリのコンポーネントや部品を作成するスキルを磨くことができ、これにより以前よりもコードをよりクリーンに書くことができるようになりました。PugとSassの学習は、コーディングの経験をよりスムーズでクリーンにしました。\n\nThrough this project I honed my skills in creating app components and parts, which let me write cleaner code than before. Learning Pug and Sass made the coding experience smoother and cleaner.",
    regret:
      "実際にはバックエンドのコーディングができなかったため、このアプリは本来のポテンシャルを発揮できませんでした。投稿や新しいストーリーをアップロードする機能を実装できなかったことが残念です。\n\nSince I couldn't actually write backend code, this app couldn't reach its full potential. I regret not being able to implement features for posting or uploading new stories.",
    growth:
      "シンプルで清潔なデザインを使用してアプリを構築する方法を学びました。派手な色を使わずにクリーンなデザインを取り入れることで、アプリの外観を整えるだけでなく、グリッドボックスを使ったスムーズなコーディングも可能になりました。\n\nI learned how to build an app using a simple, clean design. Adopting a clean design without flashy colors not only polished the app's appearance but also enabled smooth coding using grid boxes.",
  },

  {
    title: "Chittle",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/Chittle/",
      "https://github.com/jasmix555/Chittle",
    ],
    summary:
      "食品ロスを増やさないためサイズを小さくした調味料の販売に力を入れているサイト\n\nA site focused on selling smaller-sized seasonings to help reduce food waste.",
    thumbnail: "/works/chittle.jpg",
    method: ["HTML", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Web Design", "E-commerce", "Responsive"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2022/12 ~ 2023/01",
    totalTime: "19 Hours",
    awards: [],
    learnt:
      "レスポンシブなウェブサイトを作成し、ユーザーがコンピュータとモバイルの両方でウェブサイトを使用できるようにする方法を学びました。これはコーディングとデザインの両面での課題であり、レスポンシブデザインを使用する際にユーザーが違和感を感じないように心掛けました。\n\nI learned how to create a responsive website so users can use it on both computer and mobile. This was a challenge in both coding and design, and I was mindful that users shouldn't feel any discomfort when using the responsive design.",
    regret:
      "プロジェクトのコンセプトに対するさらなる研究や分析ができなかったため、プロジェクトが未完成のように感じられることがありました。ウェブサイトのフローに関する多くの質問があり、それらに対する検討が不足していたと後悔しています。\n\nBecause I couldn't do further research and analysis on the project's concept, it sometimes felt unfinished. I had many questions about the website's flow and regret not examining them enough.",
    growth:
      "よりシンプルなコードを作成する方法を学び、ウェブサイトに余分なタグや要素を多く使用せず、軽量な印象を与えることができました。\n\nI learned how to write simpler code, giving the website a lightweight feel without using too many extra tags or elements.",
  },

  {
    title: "XCO Landing Page",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/XCO-LP/",
      "https://github.com/jasmix555/XCO0-LP",
    ],
    summary:
      "いらない服を持ってる人同士が服を交換をするアプリ\n\nAn app for people with unwanted clothes to exchange them with each other.",
    thumbnail: "/works/xco.jpg",
    method: ["HTML", "CSS", "JavaScript", "Illustrator"],
    category: ["Landing Page", "UI/UX", "Team Project"],
    role: ["エンジニア", "デザイナー"],
    dateCreated: "2023/02 ~ 2023/02",
    totalTime: "15 Hours",
    awards: [],
    learnt:
      "ユーザーにアニメーションとイラストを使用して、ランディングページがユーザーを引き込み、このアプリについてもっと知りたくなるようなフローを作成する方法を学びました。\n\nI learned how to use animation and illustration to create a flow that draws users into the landing page and makes them want to learn more about the app.",
    regret:
      "全体的にデザインが不足しており、このアプリケーションが提供する機能や特長を十分に表現できなかったことを後悔しています。\n\nI regret that the design was lacking overall and couldn't fully express the features and strengths this application offers.",
    growth:
      "JavaScriptスキルを向上させ、既存のアニメーションライブラリを活用してHTMLとCSSにアニメーションを組み込む方法を学びました。\n\nI improved my JavaScript skills and learned how to incorporate animations into HTML and CSS using existing animation libraries.",
  },

  {
    title: "Nemu-Nemu Kun Landing Page",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/Nemu-Nemu-Kun/",
      "https://github.com/jasmix555/Nemu-Nemu-Kun",
    ],
    summary:
      "睡眠時間を確保できるように、就寝時間の管理とサポートをするアプリ\n\nAn app that manages and supports bedtime so you can secure enough sleep.",
    thumbnail: "/works/nemu.jpg",
    method: ["HTML", "CSS", "JavaScript"],
    category: ["Landing Page", "HealthTech", "Animation"],
    role: ["エンジニア"],
    dateCreated: "2022/09 ~ 2022/09",
    totalTime: "12 Hours",
    awards: [],
    learnt:
      "このランディングページを作成することで、ユーザーにこのアプリをもっと知りたくなったり試してみたくなるような主な目的を持つランディングページを初めて作成しました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことも初めての経験でした。\n\nBy creating this landing page, I made my first landing page whose main purpose was to make users want to learn more about and try the app. It was also my first time incorporating animations into a website using JavaScript.",
    regret: "特にありませんでした。\n\nNothing in particular.",
    growth:
      "ユーザーにアプリケーションを引き込むランディングページを作成するスキルを向上させました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことで、新しい技術や手法を学ぶ機会を得ました。\n\nI improved my skills in creating landing pages that draw users into an application. I also got the chance to learn new techniques and methods by incorporating animations into a website using JavaScript.",
  },
];
