import style from "@/styles/About.module.scss";

import {
  SiHtml5,
  SiSass,
  SiJavascript,
  SiNextdotjs,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFigma,
  SiNotion,
  SiGithub,
} from "react-icons/si";

const about = {
  skills: [
    {
      name: "HTML5",
      icon: SiHtml5,
      bar: 90,
    },
    {
      name: "SASS",
      icon: SiSass,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
    },
    {
      name: "Adobe Illustrator",
      icon: SiAdobeillustrator,
    },
    {
      name: "Adobe Photoshop",
      icon: SiAdobephotoshop,
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
  ],
  hobbies: [
    {
      name: "Drums",
    },
  ],
};

export default function MyInfo() {
  return (
    <div className={style.testimonialGrid}>
      <div className={style.testimonial}>
        <div className={style.title}>
          <h1>Jason Ng</h1>
        </div>
      </div>
      <div className={style.testimonial + " " + style.gridRowSpan2}>
        <div className={style.title}>
          <h1>My Info</h1>
        </div>
        <p>Birthdate : 2001/11/02</p>
        <p>Nationality : Indonesian</p>
        <p>Languages :🇺🇸 🇮🇩 🇯🇵</p>
        <p>Birthdate : 2001/11/02</p>
      </div>
      <div className={style.testimonial + " " + style.gridRowSpan2}>
        <div className={style.skillWrapper}>
          <div className={style.title}>
            <h1>My Skills</h1>
          </div>
          <div className={style.skillContent}>
            {about.skills.map((skill, idx) => (
              <div key={idx} className={style.skill}>
                {<skill.icon />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.testimonial}>
        <div className={style.title}>
          <h1>My Hobbies</h1>
        </div>
      </div>
      <div className={style.testimonial}>
        <div className={style.title}>
          <h1>My Name</h1>
        </div>
      </div>
      <div className={style.testimonial}>
        <div className={style.title}>
          <h1>My Name</h1>
        </div>
      </div>
    </div>
  );
}
