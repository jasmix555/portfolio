import { useState } from "react";
import style from "@/styles/Archive.module.scss";
import Modal from "./Modal";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiNextdotjs,
  SiPug,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFigma,
  SiNotion,
  SiGithub,
  SiFirebase,
  SiAdobexd,
} from "react-icons/si";
import AnimatedDiv from "./AnimatedDiv";

type Work = {
  title: string;
  page: string[];
  link: string[];
  summary: string;
  thumbnail: string;
  method: string[];
  category: string[];
  when: string[];
  role: string[];
  dateCreated: string;
  awards: boolean;
  learnt?: string;
  regret?: string;
  growth?: string;
};

const about = {
  skills: [
    {
      name: "HTML",
      icon: SiHtml5,
      bar: 95,
    },
    {
      name: "SCSS",
      icon: SiSass,
      bar: 80,
    },
    {
      name: "CSS",
      icon: SiCss3,
      bar: 95,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      bar: 50,
    },
    {
      name: "Pug",
      icon: SiPug,
      bar: 80,
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      bar: 60,
    },
    {
      name: "Illustrator",
      icon: SiAdobeillustrator,
      bar: 80,
    },
    {
      name: "Photoshop",
      icon: SiAdobephotoshop,
      bar: 80,
    },
    {
      name: "XD",
      icon: SiAdobexd,
      bar: 60,
    },
    {
      name: "Figma",
      icon: SiFigma,
      bar: 90,
    },
    {
      name: "Notion",
      icon: SiNotion,
      bar: 80,
    },
    {
      name: "GitHub",
      icon: SiGithub,
      bar: 70,
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      bar: 50,
    },
  ],
};

const works = [
  {
    title: "SpaceLang",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://team-project2023.vercel.app/",
      "https://github.com/jasmix555/space-lang",
    ],
    summary: "現地のスラングを学ぶ人へ向けた言語習得アプリ",
    thumbnail: "",
    method: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["App", "Language", "Education"],
    when: ["2年生", "学校", "チーム制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    totalTime: "83 Hours",
    awards: false,
    learnt: "",
    regret: "",
    growth: "",
  },

  {
    title: "Attendance",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://attendance-checker-three.vercel.app/",
      "https://github.com/jasmix555/attendance_checker ",
    ],
    summary: "従業員の出退勤を管理するウェブアプリ",
    thumbnail: "/works/attendance.png",
    method: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["App", "Attendance", "Company", "Management"],
    when: ["2年生", "就活課題", "個人制作"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/12 ~ 2023/12",
    totalTime: "43 Hours",
    awards: false,
    learnt:
      "FirebaseとNext.jsを利用して、時間とユーザーの状態に焦点を当てたアプリを扱うのは初めてでした。また、このアプリの作成期限を2週間に設定し、何に重点を置くべきかに焦点を当てることができました。",
    regret:
      "時間管理とユーザーの状態に焦点を当てたアプリケーションにおいて、もっと深く探求すべきでした。もっと柔軟なアプローチや新しいアイディアを試すことで、プロジェクト全体に対する洞察が得られたかもしれません。",
    growth:
      "このプロジェクトを通じて、時間管理やユーザーの状態を扱う経験を通じて、成長しました。短い期間でのデッドライン設定により、効果的な優先順位付けと集中力の向上を経験しました。技術的な挑戦に対処することで、スキルの向上とプロジェクト管理のスキルを向上させることができました。",
  },

  {
    title: "Sakamachi (酒街)",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://oh-matchly.vercel.app/",
      "https://github.com/jasmix555/Oh_Matchly",
    ],
    summary: "数少ない深夜営業の居酒屋探しが楽になるアプリ",
    thumbnail: "/works/sakamachi.jpg",
    method: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["App", "Food", "Restaurant"],
    when: ["2年生", "学校", "チーム制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    totalTime: "31 Hours",
    awards: true,
    learnt:
      "チームメンバーと共にアプリを開発するためのコーディング環境を構築する方法を学びました。各エンジニアが独自のコーディングの好みを持っているため、他のメンバーとのコーディングスタイルを合わせることが挑戦でした。",
    regret:
      "実際にはマップAPIを統合できず、リアルな店舗情報を取得して特定の店舗を検索できるようにすることができませんでした。また、必要なタグやカテゴリによって店舗をフィルタリングするためのフィルターボタンを作成できませんでした。",
    growth:
      "GitHubを使用してチームメンバーと協力してコーディングする経験を積むことができました。これにより、整理されていないコーディングを避けるための新しいコーディングアプローチについて考えることができました。また、他のメンバーがコードに変更を加えた場合の管理方法も学びました。",
  },

  {
    title: "Foodera",
    page: ["Web Application Link", "GitHub Link"],
    link: [
      "https://foodera-nine.vercel.app/",
      "https://github.com/jasmix555/Foodera",
    ],
    summary: "流行してる料理や新しい料理の経験を簡単で探せるアプリ",
    thumbnail: "/works/foodera.jpg",
    method: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["App", "Food", "Restaurant"],
    when: ["2年生", "学校", "個人制作"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/05 ~ 2023/06",
    totalTime: "47 Hours",
    awards: false,
    learnt:
      "このプロジェクトを通じて、アプリのコンポーネントや部品を作成するスキルを磨くことができ、これにより以前よりもコードをよりクリーンに書くことができるようになりました。PugとSassの学習は、コーディングの経験をよりスムーズでクリーンにしました。",
    regret:
      "実際にはバックエンドのコーディングができなかったため、このアプリは本来のポテンシャルを発揮できませんでした。投稿や新しいストーリーをアップロードする機能を実装できなかったことが残念です。",
    growth:
      "シンプルで清潔なデザインを使用してアプリを構築する方法を学びました。派手な色を使わずにクリーンなデザインを取り入れることで、アプリの外観を整えるだけでなく、グリッドボックスを使ったスムーズなコーディングも可能になりました。",
  },

  {
    title: "Chittle",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/Chittle/",
      "https://github.com/jasmix555/Chittle",
    ],
    summary:
      "食品ロスを増やさないためサイズを小さくした調味料の販売に力を入れているサイト",
    thumbnail: "/works/chittle.jpg",
    method: ["HTML", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Website", "Food", "Seasoning"],
    when: ["1年生", "学校", "個人制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2022/12 ~ 2023/01",
    totalTime: "19 Hours",
    awards: false,
    learnt:
      "レスポンシブなウェブサイトを作成し、ユーザーがコンピュータとモバイルの両方でウェブサイトを使用できるようにする方法を学びました。これはコーディングとデザインの両面での課題であり、レスポンシブデザインを使用する際にユーザーが違和感を感じないように心掛けました。",
    regret:
      "プロジェクトのコンセプトに対するさらなる研究や分析ができなかったため、プロジェクトが未完成のように感じられることがありました。ウェブサイトのフローに関する多くの質問があり、それらに対する検討が不足していたと後悔しています。",
    growth:
      "よりシンプルなコードを作成する方法を学び、ウェブサイトに余分なタグや要素を多く使用せず、軽量な印象を与えることができました。",
  },

  {
    title: "XCO Landing Page",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/XCO-LP/",
      "https://github.com/jasmix555/XCO0-LP",
    ],
    summary: "いらない服を持ってる人同士が服を交換をするアプリ",
    thumbnail: "/works/xco.jpg",
    method: ["HTML", "CSS", "JavaScript", "Illustrator"],
    category: ["Landing Page", "App", "Clothes", "Exchange"],
    when: ["1年生", "学校", "チーム制作"],
    role: ["エンジニア", "デザイナー"],
    dateCreated: "2023/02 ~ 2023/02",
    totalTime: "15 Hours",
    awards: false,
    learnt:
      "ユーザーにアニメーションとイラストを使用して、ランディングページがユーザーを引き込み、このアプリについてもっと知りたくなるようなフローを作成する方法を学びました。",
    regret:
      "全体的にデザインが不足しており、このアプリケーションが提供する機能や特長を十分に表現できなかったことを後悔しています。",
    growth:
      "JavaScriptスキルを向上させ、既存のアニメーションライブラリを活用してHTMLとCSSにアニメーションを組み込む方法を学びました。",
  },

  {
    title: "Nemu-Nemu Kun Landing Page",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/Nemu-Nemu-Kun/",
      "https://github.com/jasmix555/Nemu-Nemu-Kun",
    ],
    summary: "睡眠時間を確保できるように、就寝時間の管理とサポートをするアプリ",
    thumbnail: "/works/nemu.jpg",
    method: ["HTML", "CSS", "JavaScript"],
    category: ["Landing Page", "App", "Sleep", "Health"],
    when: ["1年生", "学校", "チーム制作"],
    role: ["エンジニア"],
    dateCreated: "2022/09 ~ 2022/09",
    totalTime: "12 Hours",
    awards: false,
    learnt:
      "このランディングページを作成することで、ユーザーにこのアプリをもっと知りたくなったり試してみたくなるような主な目的を持つランディングページを初めて作成しました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことも初めての経験でした。",
    regret: "特にありませんでした。",
    growth:
      "ユーザーにアプリケーションを引き込むランディングページを作成するスキルを向上させました。また、JavaScriptを使用してウェブサイトにアニメーションを組み込むことで、新しい技術や手法を学ぶ機会を得ました。",
  },

  {
    title: "+62Resto",
    page: ["Website Link", "GitHub Link"],
    link: [
      "https://click.ecc.ac.jp/ecc/json/+62Resto/",
      "https://github.com/jasmix555/62Resto",
    ],
    summary: "インドネシア料理テーマカフェサイト",
    thumbnail: "/works/62resto.png",
    method: ["HTML", "CSS", "XD", "Illustrator"],
    category: ["Website", "Food", "Restaurant"],
    when: ["1年生", "学校", "個人制作"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2022/07 ~ 2022/08",
    totalTime: "9 Hours",
    awards: false,
    learnt:
      "ウェブサイトのデザインとコーディングを初めて経験しました。シンプルなデザインとコードを作成する方法を学び、ユーザーがウェブサイトを閲覧する際に迷子にならないように管理する方法を身につけました。",
    regret:
      "コーディングの方法が少し乱雑だったと感じ、ウェブサイト全体が清潔なデザインを持つ方法を学ぶ時間が足りなかったことを後悔しています。",
    growth:
      "ウェブサイトのデザインとコーディングにおいて基本的なスキルを向上させました。また、次回のプロジェクトではコードをより整理された形で管理する方法を学ぶ機会が得られました。",
  },
];

export default function Works() {
  const [modal, setModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setModal(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.workWrapper}>
        <AnimatedDiv className={style.header}>
          <p>
            This is a collection of projects during my college life.
            <br />
            Aiming to be an Full-stack engineer,
            <br />I have worked on a wide range of technologies from
            <br />
            Next.Js, HTML , SASS and Javascript.
            <br />
            <br />
            フルスタックエンジニアになることを目指して、
            <br />
            Next.jsの学習に取り組んでいます。
            <br />
            HTML、CSS、JavaScriptの基本を熟知しており、
            <br />
            視覚的に魅力的なWebインターフェースを実現する
            <br />
            ことが得意です。
          </p>
        </AnimatedDiv>

        {works.map((work, idx) => (
          <AnimatedDiv key={idx} className={` ${style.work}`} index={idx}>
            <div className={style.overlay}>
              <div className={work.awards ? style.awards : " "}></div>
              <div
                className={style.thumbnail}
                style={{
                  backgroundImage: `url(${work.thumbnail})`,
                }}
              ></div>
              <div className={` ${style.overlayTitle}`}>{work.title}</div>
            </div>

            <div className={style.innerContents}>
              <div className={`${style.title} ${style.fontL}`}>
                {work.title}
              </div>
              <div className={`${style.summary} ${style.fontL}`}>
                {work.summary}
              </div>
              <div className={`${style.category} ${style.fontM}`}>
                {work.category.join(", ")}
              </div>
              <button
                className={`${style.modalBtn} ${style.fontM}`}
                onClick={() => openModal(work)}
              >
                <span>Details</span>
              </button>
            </div>
          </AnimatedDiv>
        ))}
      </div>
      <Modal
        selectedWork={selectedWork}
        about={about}
        closeModal={closeModal}
      />
    </div>
  );
}
