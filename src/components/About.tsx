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
  SiAdobexd,
} from "react-icons/si";
import AnimatedDiv from "./AnimatedDiv";

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

function About() {
  return (
    <BoxComponent heading="About" id={"About"} height={"100vh"}>
      <div className={style.testimonialGrid}>
        <AnimatedDiv className={style.testimonial}>
          <h1>Jason Ng</h1>
        </AnimatedDiv>

        <AnimatedDiv className={`${style.testimonial} `}>
          <div className={style.portrait}>
            {/* <div className={`${style.img} ${style.one}`}></div> */}
            <div className={`${style.img} ${style.two}`}></div>
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
