import Link from "next/link";
import style from "@/styles/Archive.module.scss";
// import works from "../types/Works";

const works = [
  {
    title: "SpaceLang",
    link: "https://team-project2023-9rrxwr8ry-jasmix555s-projects.vercel.app/",
    description: "",
    thumbnail: "",
    tags: ["Next.Js", "SASS", "Firebase", "Figma"],
    category: "App",
    method: ["2年生", "学校", "チーム開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/10 ~ 現在",
    awards: "",
  },

  {
    title: "Foodera",
    link: "https://foodera-nine.vercel.app/",
    description: "流行してる料理や新しい料理の経験を簡単で探せるアプリ",
    thumbnail: "/works/foodera.jpg",
    tags: ["PUG", "SASS", "JavaScript", "Illustrator", "Figma"],
    category: "App",
    method: ["2年生", "学校", "個人開発"],
    role: ["メインエンジニア", "メインデザイナー"],
    dateCreated: "2023/05 ~ 2023/06",
    awards: "",
  },

  {
    title: "Sakamachi (酒街)",
    link: "https://oh-matchly.vercel.app/",
    description: "数少ない深夜営業の居酒屋探しが楽になる",
    thumbnail: "/works/sakamachi.jpg",
    tags: ["PUG", "SASS", "JavaScript", "Illustrator", "Figma"],
    category: "App",
    method: ["2年生", "学校", "チーム開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2023/04 ~ 2023/06",
    awards: "",
  },

  {
    title: "Chittle",
    link: "https://click.ecc.ac.jp/ecc/json/Chittle/",
    description:
      "食品ロスを増やさないためにサイズを小さくした調味料の販売に力を入れているサイト",
    thumbnail: "/works/chittle.png",
    tags: ["HTML", "CSS", "JavaScript", "Illustrator", "Figma"],
    category: "Website",
    method: ["1年生", "学校", "個人開発"],
    role: ["メインエンジニア", "デザイナー"],
    dateCreated: "2022/12 ~ 2023/01",
    awards: "",
  },

  {
    title: "Nemu-Nemu Kun LP",
    link: "https://click.ecc.ac.jp/ecc/json/Nemu-Nemu-Kun/",
    description:
      "睡眠時間を確保できるように、就寝時間の管理とサポートをするアプリ",
    thumbnail: "/works/nemu.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Landing Page",
    method: ["1年生", "学校", "チーム開発"],
    role: ["メインエンジニア"],
    dateCreated: "2022/09 ~ 2022/09",
    awards: "",
  },

  {
    title: "+62Resto",
    link: "https://click.ecc.ac.jp/ecc/json/+62Resto/",
    description: "インドネシア料理テーマカフェサイト",
    thumbnail: "/works/62resto.png",
    tags: ["HTML", "CSS", "AdobeXD", "Illustrator"],
    category: "Website",
    method: ["1年生", "学校", "個人開発"],
    role: ["メインエンジニア"],
    dateCreated: "2022/07 ~ 2022/08",
    awards: "",
  },
];

export default function Works() {
  return (
    <div className={style.wrapper}>
      <div className={style.workWrapper}>
        <div className={style.header}>
          <h2>
            {/* This is a collection of my works over the years.
          <br />I have been working as a Front End Engineer for 2 years now.
          <br />
          I have working on websites and web applications.
          <br />I have also worked on a wide range of technologies from React,
          HTML , SASS , Javascript and Typescript. */}
            フルスタックエンジニアになることを目指して、
            <br />
            Next.jsの学習に取り組んでいます。
            <br />
            HTML、CSS、JavaScriptの基本を熟知しており、
            <br />
            視覚的に魅力的なWebインターフェースを実現する
            <br />
            ことが得意です。
          </h2>
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
              <div className={` ${style.overlayTitle}`}>{work.title}</div>
            </div>

            <div className={style.innerContents}>
              <div className={`${style.title} ${style.fontL}`}>
                {work.title}
              </div>
              <div className={`${style.dateCreated} ${style.fontM}`}>
                {work.dateCreated}
              </div>
              <div className={`${style.description} ${style.fontL}`}>
                {work.description}
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
              <div>
                <Link href={work.link} className={`${style.link}`}>
                  <span>もっと見る</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
