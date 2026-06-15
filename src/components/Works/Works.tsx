import { useState } from "react";

import style from "@/styles/Archive.module.scss";
import { works, type Work } from "@/data/works";
import Modal from "../Modal";
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
  SiReact,
  SiVite,
  SiVitest,
  SiSwr,
  SiAxios,
  SiTailwindcss,
} from "react-icons/si";
import AnimatedDiv from "../AnimatedDiv";

const about = {
  skills: [
    { name: "HTML", icon: SiHtml5 },
    { name: "SCSS", icon: SiSass },
    { name: "CSS", icon: SiCss3 },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Pug", icon: SiPug },
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Vite", icon: SiVite },
    { name: "SWR", icon: SiSwr },
    { name: "Axios", icon: SiAxios },
    { name: "Vitest", icon: SiVitest },
    { name: "Illustrator", icon: SiAdobeillustrator },
    { name: "Photoshop", icon: SiAdobephotoshop },
    { name: "XD", icon: SiAdobexd },
    { name: "Figma", icon: SiFigma },
    { name: "Notion", icon: SiNotion },
    { name: "GitHub", icon: SiGithub },
    { name: "Firebase", icon: SiFirebase },
  ],
};

export default function Works() {
  const [, setModal] = useState<boolean | Work[]>(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setModal([]);
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
              {work.awards && work.awards.length > 0 && (
                <div className={style.awards}>
                  {work.awards.map((award, awardIdx) => (
                    <div
                      key={awardIdx}
                      className={style.awardItem}
                      style={{ backgroundImage: `url(${award})` }}
                    ></div>
                  ))}
                </div>
              )}
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
      <Modal selectedWork={selectedWork} about={about} closeModal={closeModal} />
    </div>
  );
}
