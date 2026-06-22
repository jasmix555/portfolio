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
    thumbnail: "/works/pokedex.png",
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
    thumbnail: "/works/gcal.png",
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
    title: "防音ルームドットコム",
    group: "work",
    page: ["Webアプリケーションリンク"],
    link: ["https://bouonroom.com/"],
    summary:
      "楽器演奏や音楽制作を自宅で気兼ねなく楽しみたい人に向けた、防音賃貸物件専門の検索・紹介サイト。最低D-60相当の遮音性能で厳選した物件をシリーズ別に掲載し、構造別の遮音比較やデシベル換算をビジュアルで示しながら、LINE公式アカウント連携で物件通知を受け取れます。\n\nA search-and-listing platform dedicated to soundproof rental apartments for people who want to play instruments or make music at home. Properties are curated to a minimum D-60 isolation standard and organized by series, with visual construction comparisons, decibel-conversion examples, and LINE-integrated property alerts.",
    highlight:
      "遮音性能の比較表やデシベル換算のグラフをレスポンシブで崩れなく見せる実装と、複数シリーズの物件一覧やLINE登録への導線（CTA）を全ページで滑らかに機能させるフロントエンド構築に注力しました。\n\nI focused on the front-end build for the responsive performance-comparison tables and decibel graphics, plus smooth series listings and LINE-registration CTAs working consistently across every page.",
    thumbnail: "/works/bouonroom.png",
    method: ["Next.js", "SCSS", "ヘッドレスCMS", "Jamstack"],
    category: ["Corporate Website", "Client Work", "SEO"],
    role: ["メインエンジニア", "SEOスペシャリスト"],
    dateCreated: "2024/07 ~ 2024/09",
    totalTime: "64.75 Hours",
    awards: [],
    learnt:
      "このプロジェクトで、JamstackアーキテクチャやSEOの技術を習得しました。また、クライアントサイドレンダリングを活用し、サーバの制約がある環境でも効果的に対応する方法を学びました。ヘッドレスCMSを利用したことや、カスタムアニメーションの実装もスキルの幅を広げ、フロントエンドデザインのスキルも向上しました。\n\nIn this project I learned Jamstack architecture and SEO techniques. I also learned how to respond effectively even in environments with server constraints by leveraging client-side rendering. Using a headless CMS and implementing custom animations broadened my skill set and improved my front-end design skills.",
    regret:
      "SSR技術をさらに深く探求し、パフォーマンスをより向上させることができたかもしれません。クライアントのサーバ設定の制限がある中での工夫もしましたが、今後のプロジェクトでの経験として役立てたいと感じました。\n\nI might have been able to explore SSR techniques more deeply to further improve performance. I worked around the limitations of the client's server setup, and I want to make use of that experience in future projects.",
    growth:
      "SEO最適化を考慮したアプリケーション構築や、レスポンシブで視覚的に優れたアニメーションの作成を通じ、多くの技術的成長を実感しました。また、モジュール化されたコードの構成の理解も深まり、アプリケーションのスケーラビリティと保守性が向上しました。\n\nThrough building an SEO-optimized application and creating responsive, visually appealing animations, I felt a lot of technical growth. I also deepened my understanding of modular code structure, improving the application's scalability and maintainability.",
  },

  {
    title: "セコム×大谷翔平 ホーム守備力テスト",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.secom.co.jp/special/home-project/test/"],
    summary:
      "セコムが大谷翔平を起用し、災害・事故・犯罪から「ホーム（家）」を守る知識をクイズ形式で学べるキャンペーンサイト。スマホセキュリティと防犯の2カテゴリー全5問に挑戦し、全問正解すると描き下ろしイラストの認定証（壁紙）が手に入ります。ニックネームを入力して自分だけの認定証を作れる、参加体験型の作りが特徴です。\n\nA quiz-format campaign site by Secom featuring Shohei Ohtani, teaching how to protect your “home” from disasters, accidents, and crime. Users take a five-question test across two categories, and a perfect score unlocks a certificate wallpaper with original manga-artist illustrations — personalized with the player's nickname.",
    highlight:
      "複数画面を進行するクイズの状態管理と分岐（正解数による結果の出し分け・リトライ）、ニックネームを反映した認定証画像の生成・ダウンロード機能のフロントエンド実装に注力しました。\n\nI focused on the multi-screen quiz flow with state management and branching (score-based results and retry), plus generating and downloading the personalized certificate image from the user's nickname.",
    thumbnail: "/works/secom-ohtani.png",
    featured: 3,
    totalTime: "~40–80 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "日本生命×ユニバーサル・スタジオ・ジャパン",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.nissay.co.jp/enjoy/usj/"],
    summary:
      "USJのオフィシャル・マーケティング・パートナーである日本生命が、契約者向けの特別特典を案内するキャンペーンサイト。スヌーピーをテーマにした新アトラクションや、ドリンク付き・優先搭乗付きの契約者専用ラウンジ特典を、キャラクターや地図、利用手順のステップ表示で紹介します。\n\nA campaign site where Nippon Life, USJ's official marketing partner, presents exclusive benefits for its policyholders. It introduces a Snoopy-themed attraction and a policyholder-only lounge (complimentary drink, priority boarding) through character graphics, a map, and step-by-step usage guidance.",
    highlight:
      "キャラクターを散りばめたキービジュアルや特典詳細のモーダル表示、利用手順をステップで見せるレイアウトを、スマホ最適化のレスポンシブで構築する点に注力しました。\n\nI focused on responsive, mobile-optimized implementation of the character-rich key visuals, the modal panels for benefit details, and the step-by-step usage layout.",
    thumbnail: "/works/nissay-usj.png",
    featured: 5,
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "マムアップパーク",
    group: "work",
    page: ["Website Link"],
    link: ["https://mamamo-mannaka.jp/momup-park/"],
    summary:
      "妊娠・出産期の母親に向けて、心身のコンディショニングを支援するセルフケアプログラムのサイト。「うごく・学ぶ・つながる」の3要素を軸に、全国対応のオンラインクラスと対面スタジオを提供し、専門家・保健師・助産師が指導します。2025年キッズデザイン賞を受賞。\n\nA site for a self-care program supporting mothers' physical and mental conditioning through pregnancy and the postpartum period. Built around three pillars — Move, Learn, Connect — it offers nationwide online classes and in-person studios led by professionals, public health nurses, and midwives. A 2025 Kids Design Award winner.",
    highlight:
      "画像カルーセルのアニメーション、講師カードのカテゴリー（うごく・学ぶ・つながる）絞り込み、プロフィールを展開するモーダルなど、やわらかな世界観を保ちながら動くUIの実装に注力しました。\n\nI focused on the front-end for animated carousels, category filtering of instructor cards (Move/Learn/Connect), and expandable profile modals — interactive UI that keeps the program's soft, approachable tone.",
    thumbnail: "/works/momup-park.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2024",
    awards: [],
  },

  {
    title: "花王 メリット Osolo",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.kao.co.jp/merit/osolo/"],
    summary:
      "花王メリットの新ライン「オソロ（Osolo）」の、親子で“おそろい”に使えるヘアケアを紹介するブランドサイト。ホホバ油やアボカドエキスなど植物由来・サルフェートフリーの処方を、「You and Me」をテーマにした情緒的な動画とミニマルなビジュアルで訴求します。\n\nA brand site for Kao Merit's new “Osolo” line — hair care that parent and child can share. It highlights plant-derived, sulfate-free formulas (jojoba oil, avocado extract) through emotional “You and Me” campaign videos and a minimalist visual design.",
    highlight:
      "大きな商品ビジュアルと情緒的なコンセプトを見せるスクロール演出、動画プレイヤーの制御、開閉式のQ&Aや販売店への購入導線を、ミニマルなトーンを崩さずレスポンシブで実装することに注力しました。\n\nI focused on the scroll-driven presentation of large product visuals and concept messaging, the video player controls, the expandable Q&A, and retailer links — all responsive and faithful to the minimalist tone.",
    thumbnail: "/works/kao-osolo.png",
    featured: 4,
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "LUCUA osaka 11th Anniversary",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.lucua.jp/11th-anniversary/"],
    summary:
      "ルクア大阪の11周年を「HAPPY BLOOMING!!」のテーマで祝う記念キャンペーンサイト。オリジナルギフト配布、フォトスポット、マスコット「ルクアーノ」のシール交換、購入額に応じた抽選会など多数のイベントを、花が咲き誇るビジュアルとフロア別の限定商品紹介、WESPOアプリ連携とともに案内します。\n\nAn anniversary site celebrating LUCUA osaka's 11th year under the theme “HAPPY BLOOMING!!”. It presents many events — gift giveaways, a photo wall, a mascot sticker-exchange, and purchase-based lucky draws — alongside blooming-flower visuals, floor-by-floor merchandise, and WESPO app integration.",
    highlight:
      "花が咲くキービジュアルと「HAPPY BLOOMING」モチーフのアニメーション、多数のイベント・フロア別商品を整理して見せる情報設計、各SNS／アプリ登録への導線を、レスポンシブで構築する点に注力しました。\n\nI focused on the blooming-flower key visuals and motif animations, the information architecture organizing many events and floor-by-floor products, and the links to social and app registration — all responsive.",
    thumbnail: "/works/lucua-11th.png",
    featured: 1,
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "LUCUA osaka Night Market",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.lucua.jp/2026nightmarket/"],
    summary:
      "ルクア大阪が会員向けに開催する夜のショッピングイベントの告知サイト。1F〜9Fを夜桜（よざくら）テーマのナイトマーケットに変え、淡い光と舞い散る花びらで満たした幻想的な空間を演出します。フォトスポットやアカペラライブ、「Something Pink」のドレスコード、事前登録など、没入感のある体験設計が特徴です。\n\nAn announcement site for a members-only evening shopping event at LUCUA osaka. Floors 1F–9F transform into a “yozakura” (night cherry blossom) night market — a dreamlike space of pale light and falling petals. It features an immersive experience design: a photo spot, a cappella performances, a “Something Pink” dress code, and pre-registration.",
    highlight:
      "夜桜の世界観を伝えるキービジュアルと花びらが舞う演出、フロア別の見どころやドレスコード・同伴登録などのイベント情報をわかりやすく見せる構成を、レスポンシブで実装することに注力しました。\n\nI focused on responsive implementation of the key visuals and falling-petal effects conveying the night-blossom atmosphere, plus a clear layout for floor highlights and event details like the dress code and companion registration.",
    thumbnail: "/works/lucua-nightmarket.png",
    featured: 2,
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2026",
    awards: [],
  },

  {
    title: "ロート製薬 それ目薬、はじめどきっ！",
    group: "work",
    page: ["Website Link"],
    link: ["https://jp.rohto.com/learn-more/eyecare/start/"],
    summary:
      "ロート製薬が SixTONES を起用し、6種類の目薬を「かるた」形式で紹介する目のケア啓発キャンペーンサイト。ゲーム・コンタクト・メイクなど日常のシーンに合った目薬を選べるよう、症状別の比較カードと6つのシナリオ導線を用意。メンバーのビジュアルを大胆に使った色分け構成が特徴です。\n\nAn eye-care awareness campaign site by Rohto featuring SixTONES, introducing six eye-drop products in a Japanese “karuta” card-game format. Symptom-based comparison cards and six scenario paths help users pick the right product for everyday situations like gaming, contacts, and makeup, in a bold, color-coded layout built around the members' visuals.",
    highlight:
      "シーン別の6つのシナリオ選択と症状別の商品レコメンド（出し分け）のインタラクション、メンバーのビジュアルを活かしたフルワイドのレスポンシブレイアウトとアイコン主導のナビゲーション実装に注力しました。\n\nI focused on the interaction for the six scenario selectors and symptom-based product recommendations, plus the full-width responsive layout built around the members' visuals and the icon-driven navigation.",
    thumbnail: "/works/rohto-eyecare.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ミノン薬用ヘアケア",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://www.daiichisankyo-hc.co.jp/site_minon-body/product/hair_lp.html",
    ],
    summary:
      "第一三共ヘルスケア「ミノン」の、敏感な頭皮向け薬用ヘアケア（薬用シャンプー・コンディショナー）のランディングページ。「敏感な頭皮のうるおいを守りながら洗う」をコンセプトに、過度な洗浄が頭皮のバリアを傷める課題を提示し、アミノ酸系洗浄を解決策として打ち出します。大人用・キッズ用のタブ切り替えや調査データのビジュアル化が特徴です。\n\nA landing page for MINON medicated hair care (shampoo and conditioner) for sensitive scalps by Daiichi Sankyo Healthcare. Built on the idea of “washing while protecting the moisture of sensitive scalps,” it frames over-cleansing as a cause of barrier damage and positions amino-acid cleansing as the answer, with tabbed adult/kids switching and visualized survey data.",
    highlight:
      "大人用・キッズ用を切り替えるタブUI、調査データの図解、ステップごとの洗髪手順、PC/SP出し分け画像によるレスポンシブ表示を、デザイナーの意図どおりに崩さず実装することに注力しました。\n\nI focused on faithfully implementing the adult/kids tab switching, the data-visualization diagrams, the step-by-step washing guides, and responsive PC/SP image swapping exactly as the designer intended.",
    thumbnail: "/works/minon-haircare.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ミノン 薬用ヘアシャンプー（キッズ）",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://www.daiichisankyo-hc.co.jp/site_minon-body/product/hair_kids.html",
    ],
    summary:
      "第一三共ヘルスケア「ミノン」の、リンスがいらない泡タイプの薬用ヘアシャンプー（キッズ向け）の製品ページ。弱酸性・低刺激性・植物性アミノ酸洗浄で「赤ちゃんから使える」点を訴求し、各種皮膚テストの結果やリンス不要の利便性を順を追って説明する構成が特徴です。\n\nA product page for MINON's rinse-free, foam-type medicated kids' shampoo by Daiichi Sankyo Healthcare. It promotes weakly-acidic, low-irritant, plant-based amino-acid cleansing suitable “from infancy,” walking through dermatological test results and the convenience of needing no separate rinse.",
    highlight:
      "製品の特長・成分・使い方を段階的に見せるセクション構成、関連製品のカルーセル、折りたたみ式ナビゲーション、画像ギャラリーをレスポンシブに動作させる実装にこだわりました。\n\nI focused on the staged feature/ingredient/usage sections, the related-product carousel, collapsible navigation, and image galleries so they all behave cleanly across screen sizes.",
    thumbnail: "/works/minon-hairkids.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ミノン アミノモイスト 製品一覧",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://www.daiichisankyo-hc.co.jp/site_minon-aminomoist/products/",
    ],
    summary:
      "第一三共ヘルスケアの敏感肌向けスキンケア「ミノン アミノモイスト」の製品一覧ページ。アミノ酸処方と「貯水肌」のコンセプトを軸に、クレンジング・化粧水・乳液・美容液・クリーム・シートマスクなどをカテゴリで絞り込んで探せます。乾燥肌・混合肌・エイジングケアなどライン別表示や「肌タイプCHECK」提案機能が特徴です。\n\nThe product index for MINON Amino Moist, Daiichi Sankyo Healthcare's skincare for sensitive skin. Built around amino-acid formulation and a “water-retaining skin” concept, it lets users filter by category — cleansers, toners, serums, creams, sheet masks — with line-based organization (dry, combination, anti-aging) and a “skin type check” recommendation tool.",
    highlight:
      "製品タイプによるカテゴリ絞り込みと「肌タイプCHECK」「お手入れ早見表」への導線を含む一覧UI、レスポンシブなグリッド／ナビゲーションの実装に注力しました。\n\nI focused on the listing UI with category filtering by product type plus pathways into the skin-type check and care chart, building the grid and navigation to adapt responsively.",
    thumbnail: "/works/minon-aminomoist.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ハイチオール（エスエス製薬）",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.ssp.co.jp/hythiol/"],
    summary:
      "エスエス製薬のブランド「ハイチオール」の公式サイト。L-システインと「新陳代謝」を軸に、肌・体の悩みに応える製品群を紹介します。「代謝するかぎり、肌は変われる」というコピーと製品スライダーが印象的で、内服・外用あわせて6製品を悩み別に整理。多言語対応や「肌タイプ診断」を備えるのが特徴です。\n\nThe official site for SS Pharmaceutical's Hythiol brand, presenting products centered on L-cysteine and “metabolism” for skin and body concerns. The hero pairs the tagline “as long as metabolism continues, skin can change” with a product slider, organizing six internal/topical products by concern, with multi-language support and a skin-type questionnaire.",
    highlight:
      "製品スライダーや展開式の悩み別カテゴリ、チェックボックス式の「肌タイプ診断」、PC/SP出し分け画像によるレスポンシブ表示、固定ヘッダーの挙動を、多言語切替も含めて実装することに注力しました。\n\nI focused on the product slider, expandable concern-based categories, the checkbox-driven skin-type questionnaire, responsive PC/SP image swapping, and sticky-header behavior — including multi-language switching.",
    thumbnail: "/works/hythiol.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "エプソン 大判プリンター ポスター内製",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.epson.jp/products/largeprinter/poster-printing/"],
    summary:
      "エプソンのSureColor大判プリンターとAdobe Expressを組み合わせ、ポスターを社内で内製する方法を紹介するページ。コスト・スピード・修正の課題提起から、テンプレート選び・テキスト変更・写真追加の3ステップ解説へと進むストーリー仕立ての縦構成が特徴で、A1ポスター1枚「約55円」といった具体的なコスト提示で内製のメリットを訴求します。\n\nA page showing how businesses can produce posters in-house by pairing Epson SureColor large-format printers with Adobe Express. It uses a story-driven vertical structure that moves from pain points (cost, speed, edits) into a three-step tutorial, with concrete cost framing such as “about 55 yen” per A1 poster.",
    highlight:
      "課題提起から3ステップのチュートリアル、製品比較までを順に読み進めさせる縦長の物語構成と、「_sp.png」による出し分けを含むレスポンシブ表示を、デザインの意図どおりに実装することに注力しました。\n\nI focused on the long-form narrative flow from pain points through the three-step tutorial to the product comparison, with responsive layout including dedicated mobile imagery, exactly as designed.",
    thumbnail: "/works/epson-poster.png",
    totalTime: "~20–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "エプソン 氣志團万博2025 推し活応援部",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.epson.jp/ec/event/kbpk2025/"],
    summary:
      "エプソンが音楽フェス「氣志團万博2025」とコラボした「推し活応援部」キャンペーンページ。会場での企画動画、家庭で印刷できるDL素材（しおりやポップアップカード）、プリンターが当たるプレゼント企画を展開。SNSフォローと指定ハッシュタグ投稿による2ステップ応募やPDFダウンロードが特徴です。\n\nA campaign page for Epson's “Fan Support Division,” tying in with the Kishidan Banpaku 2025 music festival. It features event videos, printable downloadable content (bookmarks, pop-up cards), and a printer giveaway, with a two-step SNS entry (follow plus a hashtagged post) and PDF downloads.",
    highlight:
      "複数の埋め込み動画、DL素材のグリッド、SNS連携による2ステップ応募導線、PDFダウンロードボタン、画像ボタンとテキストリンクを併用するレスポンシブナビゲーションの実装に注力しました。\n\nI focused on the multiple embedded videos, the downloadable-content grid, the two-step SNS entry flow, PDF download buttons, and responsive navigation combining image buttons with text links.",
    thumbnail: "/works/epson-kbpk2025.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ブレンディ マイボトルスティック",
    group: "work",
    page: ["Website Link"],
    link: ["https://agf.ajinomoto.co.jp/brand/blendy/mybottlestick/"],
    summary:
      "味の素AGF「ブレンディ マイボトルスティック」の製品紹介ページ。水に溶かすだけで作れるマイボトル向けスティック飲料を、「水に溶けてすぐできる」「持ち運べる」「1箱でマイボトル6本分」「味を選べる」の4つの特長と、ピーチルイボスやジャスミンなど7種のラインナップで訴求します。\n\nA product page for Ajinomoto AGF's “Blendy My Bottle Stick,” drinks you make by simply dissolving a stick in your water bottle. It presents four selling points — dissolves instantly, portable, “6 bottles per box,” and a choice of flavors — across a seven-flavor lineup including peach rooibos and jasmine.",
    highlight:
      "4つの特長を見せるモジュール構成、お茶系／水分補給系で分類したフレーバー一覧、埋め込み動画ギャラリー、各ECへの購入ボタンを、レスポンシブに崩れなく実装することに注力しました。\n\nI focused on the four-point feature modules, the flavor lineup categorized into tea and hydration types, the embedded video gallery, and the e-commerce purchase buttons so they hold up responsively.",
    thumbnail: "/works/blendy-mybottle.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "味の素AGF カフェタイムギフト",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://agf.ajinomoto.co.jp/brand/gift/fugift/casualgift/cafetimegift/",
    ],
    summary:
      "味の素AGFのギフトブランド「CAFÉ TIME GIFT」を紹介するキャンペーンサイト。「もっと気軽にギフトしよ！」をテーマに、ドリップコーヒーやスティックのアソートギフトを訴求します。ブルーのアーガイル柄を基調とした上品で可愛らしいパッケージと、相手別のメッセージカードが特徴で、応募型モニターキャンペーンの入口も兼ねています。\n\nA campaign site introducing Ajinomoto AGF's “CAFÉ TIME GIFT” line under the theme “Let's gift more casually,” promoting assorted drip-coffee and stick gift sets. It features stylish, cute argyle-patterned packaging and recipient-specific message cards, and doubles as the entry point for a survey-based monitor campaign.",
    highlight:
      "複数のメッセージカードを回転表示するカルーセル、ヘッダーのカテゴリ・ブランド展開メニュー、応募状況に応じて表示が切り替わる条件分岐UIの実装に注力しました。\n\nI focused on the rotating message-card carousel, the expandable category/brand header navigation, and conditional UI that swaps content based on campaign status.",
    thumbnail: "/works/agf-cafetimegift.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "富士フイルム 推し文字プリント",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://www.fujifilm.com/fb/ja/solutions/wide-variety/multicopy/oshikatu",
    ],
    summary:
      "富士フイルムのコンビニプリントサービス「推し文字プリント」の紹介サイト。うちわ・ボード・アルバム用の「推し活」デザインをセブン-イレブンのマルチコピー機で手軽に印刷できることを訴求します。30種類以上の日本語・韓国語テンプレート、10色のカラー展開、A4/A3対応を、パステル基調のkawaiiなビジュアルで紹介します。\n\nThe promo site for Fujifilm's convenience-store service “Oshi-Moji Print,” letting fans easily print uchiwa, board, and album designs at Seven-Eleven copiers. It offers 30+ Japanese and Korean templates, 10 colors, and A4/A3 sizes, all in a pastel, kawaii visual style aimed at fans.",
    highlight:
      "カラー・サイズ選択のタブナビゲーション、色に連動するデザインギャラリー、「もっと見る」展開セクション、デザイン詳細のモーダル、レスポンシブなグリッド表示の実装に注力しました。\n\nI focused on the color/size tabbed navigation, a color-linked design gallery, a “see more” expandable section, modal detail views, and a responsive grid layout.",
    thumbnail: "/works/fujifilm-oshimoji.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "富士フイルム 推し文字プリントメーカー",
    group: "work",
    page: ["Website Link"],
    link: [
      "https://www.fujifilm.com/fb/ja/solutions/wide-variety/multicopy/oshikatu/oshimojiprintmaker",
    ],
    summary:
      "「推し文字プリント」のための自作デザインツール「推し文字プリントメーカー」。ひらがなテキストやスタンプを配置してオリジナルのうちわ・ボード用デザインを生成できるWebアプリで、最大14色までのカスタムカラー作成やA4/A3サイズ選択に対応。生成したデザインはQRコードや予約番号でセブン-イレブンで印刷できます。\n\n“Oshi-Moji Print Maker,” the custom design tool for the Oshi-Moji Print service — a web app where users place hiragana text and stamps to generate original uchiwa and board designs. It supports custom color creation (up to 14 colors) and A4/A3 sizing, with finished designs printable at Seven-Eleven via QR code or reservation number.",
    highlight:
      "テキスト入力・スタンプ配置・カスタムカラー作成といったインタラクティブな生成UIと、ステップ式の操作ガイド、印刷方法のタブ切り替え、デスクトップ/スマホ/タブレット対応のレスポンシブ実装に注力しました。\n\nI focused on the interactive generator UI (text input, stamp placement, custom color creation), step-by-step usage guides, the tabbed printing-method switcher, and responsive support across desktop, smartphone, and tablet.",
    thumbnail: "/works/fujifilm-oshimoji-maker.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Web Tool", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "家ナカまるごと応援キャンペーン",
    group: "work",
    page: ["Website Link"],
    link: ["https://cpn-wv-cl0304.one-zero.jp/ienaka-ouen-20251001/"],
    summary:
      "花王グループカスタマーマーケティングとアムタスによる共同キャンペーンサイト。「読書×家事の秋⁉ 10月の家ナカまるごと応援キャンペーン」として、LINE経由の2つの応募コースで賞品が当たる企画です。2列のカードレイアウトと、ピンク／グリーンで色分けしたSTEP1〜3のビジュアル手順、マスコットキャラクターが特徴です。\n\nA joint campaign site by Kao Group Customer Marketing and Amutus — the “Reading × Housework Autumn?!” October home-support campaign — offering prizes via two LINE-based entry tracks. It features a two-column card layout, color-coded (pink/green) STEP 1-3 visual instructions, and a mascot character.",
    highlight:
      "コース切り替えのタブナビゲーション、FAQアコーディオン、応募状況で表示が変わる条件分岐、LINEへキーワードを受け渡すディープリンク連携、スマホファーストのレスポンシブ実装に注力しました。\n\nI focused on the course-switching tabbed navigation, an FAQ accordion, conditional display based on campaign status, LINE deep-linking that passes keywords into the chat, and a smartphone-first responsive layout.",
    thumbnail: "/works/ienaka-ouen.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Campaign Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ネイチャーメイド スーパーマルチビタミン&ミネラル (Woman)",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.otsuka.co.jp/nmd/smvm_woman/"],
    summary:
      "大塚製薬のサプリメント「ネイチャーメイド スーパーマルチビタミン&ミネラル」の女性向けブランドサイト。12種のビタミンと7種のミネラルを1粒に凝縮した製品を訴求します。野菜不足や不規則な食生活を送る20〜30代女性をターゲットに、摂取不足のデータや「樽（おけ）」の例えで栄養バランスを分かりやすく伝える構成が特徴です。\n\nOtsuka Pharmaceutical's women-focused brand site for “Nature Made Super Multivitamin & Mineral,” promoting a daily tablet packing 12 vitamins and 7 minerals. Targeting women in their 20s-30s with busy or veggie-deficient diets, it uses intake-deficit data and a “barrel” analogy to clearly explain nutritional balance.",
    highlight:
      "セクションへのアンカーナビゲーション、栄養概念を伝えるインフォグラフィック、Instagramフィードのカルーセル埋め込み、PC/SP別の画像出し分けによるレスポンシブ実装に注力しました。\n\nI focused on in-page anchor navigation, infographics explaining the nutritional concepts, the embedded Instagram feed carousel, and responsive image-swapping between desktop and mobile.",
    thumbnail: "/works/naturemade-woman.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "ネイチャーメイド スーパーマルチビタミン&ミネラル (Man)",
    group: "work",
    page: ["Website Link"],
    link: ["https://www.otsuka.co.jp/nmd/smvm_man/"],
    summary:
      "大塚製薬「ネイチャーメイド スーパーマルチビタミン&ミネラル」の男性向けブランドサイト。女性版と対をなす構成で、20〜30代男性の野菜摂取不足にフォーカスします。マルチビタミン国内シェアNo.1（2024-2025）や約4ヶ月分という容量、人工添加物不使用といったベネフィットを、ヒーロー画像と番号付きポイントで明快に伝えます。\n\nThe men-focused counterpart of Otsuka's “Nature Made Super Multivitamin & Mineral” site, mirroring the women's version while focusing on the vegetable shortfall among men in their 20s-30s. It highlights its No.1 multivitamin market share in Japan (2024-2025), a roughly four-month supply, and additive-free formulation through hero imagery and numbered key points.",
    highlight:
      "女性版と共通設計を保ちつつ男性向けにビジュアルを差し替える展開で、セクションアンカーナビ、番号付きポイントのレイアウト、Instagram埋め込み、レスポンシブ対応の実装に注力しました。\n\nI focused on adapting the shared design with male-oriented visuals while keeping it consistent with the women's version — the section anchor nav, numbered key-point layouts, Instagram embeds, and responsive behavior.",
    thumbnail: "/works/naturemade-man.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "DHC リップクリームシリーズ",
    group: "work",
    page: ["Website Link"],
    link: ["https://top.dhc.co.jp/shop/skin/lipseries_moist_color/"],
    summary:
      "DHCのリップクリームシリーズを紹介するブランドサイト。累計20億本を売り上げた定番の薬用リップから、SPF22 PA++のカラーリップ、敏感肌用、ナイトケア用、植物オイル配合のボタニカルまで幅広いラインアップを訴求します。パステル基調の清潔感あるデザインと、オリーブバージンオイルという共通成分の打ち出しが特徴です。\n\nDHC's brand site for its lip cream series, promoting a broad lineup from the flagship medicated lip cream (2 billion units sold) to SPF22 PA++ color lips, a sensitive-skin variant, a nighttime balm, and botanical oil-blend versions. It features a clean pastel design and olive virgin oil as the shared signature ingredient.",
    highlight:
      "好みで製品をおすすめする分岐式の「リップ診断」、アイコン付きの横並びナビゲーション、技術解説のモーダルポップアップ、製品カードのレスポンシブグリッド、スクロール連動のセクションナビの実装に注力しました。\n\nI focused on the branching “lip diagnosis” that recommends products by preference, the icon-based horizontal navigation, modal popups explaining the product technology, a responsive product-card grid, and scroll-linked section navigation.",
    thumbnail: "/works/dhc-lip.png",
    totalTime: "~8–40 Hours",
    method: ["HTML", "SCSS", "JavaScript"],
    category: ["Client Work", "Product Site", "Responsive"],
    role: ["Front-end Engineer"],
    dateCreated: "2025",
    awards: [],
  },

  {
    title: "Reminiscape",
    group: "project",
    page: ["Webアプリケーションリンク"],
    link: ["https://reminiscape-zeta.vercel.app/"],
    summary:
      "大切な人の記憶やメッセージを、ゆかりの場所にそっと残し、いつかまたそこを訪れた時に“再会”できる。過ぎ去った人の足跡も、未来のあなたへ届く記憶として残せます。\n\nA place to quietly leave the memories and messages of someone important in a location tied to them, so that one day when you return you can be “reunited” with them. Even the footprints of those who have passed can remain as memories delivered to the future you.",
    thumbnail: "/works/reminiscape.png",
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
    thumbnail: "/works/tiny-taskers.png",
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
    thumbnail: "/works/spacelang.png",
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
    group: "concept",
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
    status: "Concept",
    awards: [{ title: "作品展示会＋E展 2023 コンセプト賞" }],
    learnt:
      "チームメンバーと共にアプリを開発するためのコーディング環境を構築する方法を学びました。各エンジニアが独自のコーディングの好みを持っているため、他のメンバーとのコーディングスタイルを合わせることが挑戦でした。\n\nI learned how to set up a coding environment for developing an app together with team members. Since each engineer has their own coding preferences, matching coding styles with other members was a challenge.",
    regret:
      "実際にはマップAPIを統合できず、リアルな店舗情報を取得して特定の店舗を検索できるようにすることができませんでした。また、必要なタグやカテゴリによって店舗をフィルタリングするためのフィルターボタンを作成できませんでした。\n\nWe weren't actually able to integrate a map API to fetch real store information and search for specific shops. We also couldn't create filter buttons to filter shops by the necessary tags or categories.",
    growth:
      "GitHubを使用してチームメンバーと協力してコーディングする経験を積むことができました。これにより、整理されていないコーディングを避けるための新しいコーディングアプローチについて考えることができました。また、他のメンバーがコードに変更を加えた場合の管理方法も学びました。\n\nI gained experience collaborating and coding with team members using GitHub. This let me think about new coding approaches to avoid disorganized code, and I also learned how to manage changes other members made to the code.",
  },

  {
    title: "Foodera",
    group: "concept",
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
    status: "Concept",
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
    group: "concept",
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
    status: "Concept",
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
    group: "concept",
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
    status: "Concept",
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
    group: "concept",
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
    status: "Concept",
    awards: [],
    learnt:
      "このランディングページを作成することで、ユーザーにこのアプリをもっと知りたくなったり試してみたくなるような主な目的を持つランディングページを初めて作成しました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことも初めての経験でした。\n\nBy creating this landing page, I made my first landing page whose main purpose was to make users want to learn more about and try the app. It was also my first time incorporating animations into a website using JavaScript.",
    regret: "特にありませんでした。\n\nNothing in particular.",
    growth:
      "ユーザーにアプリケーションを引き込むランディングページを作成するスキルを向上させました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことで、新しい技術や手法を学ぶ機会を得ました。\n\nI improved my skills in creating landing pages that draw users into an application. I also got the chance to learn new techniques and methods by incorporating animations into a website using JavaScript.",
  },
];
