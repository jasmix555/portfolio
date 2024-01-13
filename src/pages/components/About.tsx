import BoxComponent from "./Box";
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
  SiPug,
  SiCss3,
  SiFirebase,
} from "react-icons/si";
import AnimatedDiv from "./AnimatedDiv";

const about = {
  skills: [
    {
      name: "HTML5",
      icon: SiHtml5,
      bar: 90,
    },
    {
      name: "Pug",
      icon: SiPug,
    },
    {
      name: "CSS3",
      icon: SiCss3,
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
      name: "Illustrator",
      icon: SiAdobeillustrator,
    },
    {
      name: "Photoshop",
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
    {
      name: "Firebase",
      icon: SiFirebase,
    },
  ],
};

function About() {
  return (
    <BoxComponent heading="About" id={"About"} bgc={"#f5f5f5"} height={"100vh"}>
      <div className={style.testimonialGrid}>
        <AnimatedDiv className={style.testimonial}>
          <h1>Jason Ng</h1>
        </AnimatedDiv>
        <AnimatedDiv className={style.testimonial}>
          <div className={style.portrait}>
            <div className={style.image}></div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv className={style.testimonial}>
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
        </AnimatedDiv>
        <AnimatedDiv className={style.testimonial}>
          <div className={style.title}>
            <h1>My Info</h1>
          </div>
          <p>Birthdate: 2001/11/02</p>
          <p>Nationality: Indonesian</p>
          <p>Languages:🇺🇸 🇮🇩 🇯🇵</p>
        </AnimatedDiv>
        <AnimatedDiv className={style.testimonial}>
          <p>
            新しいことを探求するのが好きで、好奇心が強く、満足するまで諦めません！
            <br />
            何かに興味を持ったら、それが理解できるまで調べないと、じっとしていられなくなります。
          </p>
        </AnimatedDiv>

        <AnimatedDiv className={style.testimonial}>
          <div className={style.title}>
            <h1>My Hobbies</h1>
          </div>
          <p>Drums</p>
          <p>Working Out</p>
        </AnimatedDiv>
      </div>
    </BoxComponent>
  );
}

export default About;
