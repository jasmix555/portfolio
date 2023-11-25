import { useState, useEffect } from "react";
import style from "@/styles/Archive.module.scss";
import Modal from "./Modal";

type Work = {
  title: string;
  link: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  category: string;
  method: string[];
  role: string[];
  dateCreated: string;
  awards: string;
};

const works = [
  {
    title: "SpaceLang",
    link: "https://team-project2023.vercel.app/",
    summary: "",
    thumbnail: "",
    tags: ["Next.Js", "SCSS", "Firebase", "Figma"],
    category: "App",
    method: ["2年生", "学校", "チーム開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    awards: "",
  },

  {
    title: "Foodera",
    link: "https://foodera-nine.vercel.app/",
    summary: "流行してる料理や新しい料理の経験を簡単で探せるアプリ",
    thumbnail: "/works/foodera.jpg",
    tags: ["PUG", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: "App",
    method: ["2年生", "学校", "個人開発"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/05 ~ 2023/06",
    awards: "",
  },

  {
    title: "Sakamachi (酒街)",
    link: "https://oh-matchly.vercel.app/",
    summary: "数少ない深夜営業の居酒屋探しが楽になる",
    thumbnail: "/works/sakamachi.jpg",
    tags: ["PUG", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: "App",
    method: ["2年生", "学校", "チーム開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    awards: "",
  },

  {
    title: "Chittle",
    link: "https://click.ecc.ac.jp/ecc/json/Chittle/",
    summary:
      "食品ロスを増やさないためにサイズを小さくした調味料の販売に力を入れているサイト",
    thumbnail: "/works/chittle.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "Illustrator", "Figma"],
    category: "Website",
    method: ["1年生", "学校", "個人開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2022/12 ~ 2023/01",
    awards: "",
  },

  {
    title: "XCO Landing Page",
    link: "https://click.ecc.ac.jp/ecc/json/XCO-LP/",
    summary: "いらない服を持ってる人同士が服を交換をするアプリ",
    thumbnail: "/works/xco.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    method: ["1年生", "学校", "チーム開発"],
    role: ["エンジニア", "デザイナー"],
    dateCreated: "2023/02 ~ 2023/02",
    awards: "",
  },

  {
    title: "Nemu-Nemu Kun Landing Page",
    link: "https://click.ecc.ac.jp/ecc/json/Nemu-Nemu-Kun/",
    summary: "睡眠時間を確保できるように、就寝時間の管理とサポートをするアプリ",
    thumbnail: "/works/nemu.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    method: ["1年生", "学校", "チーム開発"],
    role: ["エンジニア"],
    dateCreated: "2022/09 ~ 2022/09",
    awards: "",
  },

  {
    title: "+62Resto",
    link: "https://click.ecc.ac.jp/ecc/json/+62Resto/",
    summary: "インドネシア料理テーマカフェサイト",
    thumbnail: "/works/62resto.png",
    tags: ["HTML", "CSS", "AdobeXD", "Illustrator"],
    category: "Website",
    method: ["1年生", "学校", "個人開発"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2022/07 ~ 2022/08",
    awards: "",
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
        <div className={style.header}>
          <p>
            This is a collection of projects during my college life.
            <br />
            I have working on websites and web applications.
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
        </div>

        {works.map((work, idx) => (
          <div key={idx} className={`${style.Contents} ${style.work}`}>
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
              <div className={`${style.dateCreated} ${style.fontM}`}>
                {work.dateCreated}
              </div>
              <div className={`${style.summary} ${style.fontL}`}>
                {work.summary}
              </div>
              <div className={`${style.category} ${style.fontM}`}>
                {work.category}
              </div>
              <div className={`${style.method} ${style.fontS}`}>
                {work.method.join(", ")}
              </div>
              <div className={`${style.role} ${style.fontS}`}>
                {work.role.join(", ")}
              </div>
              <div className={`${style.tags} ${style.fontS}`}>
                {work.tags.join(", ")}
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
          </div>
        ))}
      </div>
      <Modal selectedWork={selectedWork} closeModal={closeModal} />
    </div>
  );
}
