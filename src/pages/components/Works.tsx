import works from "../types/Works";
import style from "@/styles/Archive.module.scss";

export default function Works() {
  return (
    <div className={style.workWrapper}>
      {works.map((work) => (
        <a href={work.link} className={`${style.Contents} ${style.work}`}>
          <div className={style.overlay}>
            <div className={style.thumbnail}>{work.thumbnail}</div>
            <div
              className={`${style.title} ${style.fontL} ${style.overlayTitle}`}
            >
              {work.title}
            </div>
          </div>

          <div className={style.innerContents}>
            <div className={`${style.dateCreated} ${style.fontS}`}>
              {work.dateCreated}
            </div>
            <div className={`${style.title} ${style.fontL}`}>{work.title}</div>
            <div className={`${style.description} ${style.fontM}`}>
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
          </div>
        </a>
      ))}
    </div>
  );
}
