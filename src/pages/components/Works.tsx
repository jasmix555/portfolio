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
  link: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  category: string[];
  method: string[];
  role: string[];
  dateCreated: string;
  awards: string;
};

const about = {
  skills: [
    {
      name: "HTML",
      icon: SiHtml5,
      bar: 90,
    },
    {
      name: "SCSS",
      icon: SiSass,
    },
    {
      name: "CSS",
      icon: SiCss3,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "Pug",
      icon: SiPug,
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
    },
    {
      name: "Illustrator",
      icon: SiAdobeillustrator,
    },
    {
      name: "Photoshop",
      icon: SiAdobephotoshop,
    },
    {
      name: "XD",
      icon: SiAdobexd,
    },
    {
      name: "Figma",
      icon: SiFigma,
    },
    {
      name: "Notion",
      icon: SiNotion,
    },
    {
      name: "GitHub",
      icon: SiGithub,
    },
    {
      name: "Firebase",
      icon: SiFirebase,
    },
  ],
  hobbies: [
    {
      name: "Drums",
    },
  ],
};

const works = [
  {
    title: "SpaceLang",
    link: "https://team-project2023.vercel.app/",
    summary: "",
    thumbnail: "",
    tags: ["Next.js", "SCSS", "Firebase", "Figma"],
    category: ["App", "Language", "Education"],
    method: ["2年生", "学校", "チーム制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    totalTime: "40 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "Foodera",
    link: "https://foodera-nine.vercel.app/",
    summary: "流行してる料理や新しい料理の経験を簡単で探せるアプリ",
    thumbnail: "/works/foodera.jpg",
    tags: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["App", "Food", "Restaurant"],
    method: ["2年生", "学校", "個人制作"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/05 ~ 2023/06",
    totalTime: "32 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "Sakamachi (酒街)",
    link: "https://oh-matchly.vercel.app/",
    summary: "数少ない深夜営業の居酒屋探しが楽になる",
    thumbnail: "/works/sakamachi.jpg",
    tags: ["Pug", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["App", "Food", "Restaurant"],
    method: ["2年生", "学校", "チーム制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    totalTime: "18 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "Chittle",
    link: "https://click.ecc.ac.jp/ecc/json/Chittle/",
    summary:
      "食品ロスを増やさないためサイズを小さくした調味料の販売に力を入れているサイト",
    thumbnail: "/works/chittle.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: ["Website", "Food", "Seasoning"],
    method: ["1年生", "学校", "個人制作"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2022/12 ~ 2023/01",
    totalTime: "15 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "XCO Landing Page",
    link: "https://click.ecc.ac.jp/ecc/json/XCO-LP/",
    summary: "いらない服を持ってる人同士が服を交換をするアプリ",
    thumbnail: "/works/xco.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Illustrator"],
    category: ["Landing Page", "App", "Clothes", "Exchange"],
    method: ["1年生", "学校", "チーム制作"],
    role: ["エンジニア", "デザイナー"],
    dateCreated: "2023/02 ~ 2023/02",
    totalTime: "13 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "Nemu-Nemu Kun Landing Page",
    link: "https://click.ecc.ac.jp/ecc/json/Nemu-Nemu-Kun/",
    summary: "睡眠時間を確保できるように、就寝時間の管理とサポートをするアプリ",
    thumbnail: "/works/nemu.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    category: ["Landing Page", "App", "Sleep", "Health"],
    method: ["1年生", "学校", "チーム制作"],
    role: ["エンジニア"],
    dateCreated: "2022/09 ~ 2022/09",
    totalTime: "8 Hours",
    awards: "",
    description: "",
    information: "",
  },

  {
    title: "+62Resto",
    link: "https://click.ecc.ac.jp/ecc/json/+62Resto/",
    summary: "インドネシア料理テーマカフェサイト",
    thumbnail: "/works/62resto.png",
    tags: ["HTML", "CSS", "XD", "Illustrator"],
    category: ["Website", "Food", "Restaurant"],
    method: ["1年生", "学校", "個人制作"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2022/07 ~ 2022/08",
    totalTime: "9 Hours",
    awards: "",
    description: "",
    information: "",
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
          <AnimatedDiv key={idx} className={`${style.Contents} ${style.work}`}>
            <div className={style.overlay}>
              <div
                className={style.thumbnail}
                style={{
                  backgroundImage: `url(${work.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className={` ${style.overlayTitle} ${style.fontL}`}>
                {work.title}
              </div>
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
              <div className={`${style.awards} ${style.fontS}`}>
                {work.awards}
              </div>
              <button
                className={`${style.modalBtn} ${style.fontM}`}
                onClick={() => openModal(work)}
              >
                <span>もっと知る</span>
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
