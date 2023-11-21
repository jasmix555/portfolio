import Link from "next/link";
import works from "../types/Works";
import style from "@/styles/archive.module.scss";
import { div } from "three/examples/jsm/nodes/Nodes.js";

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
              <div
                className={`${style.title} ${style.fontL} ${style.overlayTitle}`}
              >
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
