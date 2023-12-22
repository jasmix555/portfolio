import BoxComponent from "./Box";
// import MyInfo from "./MyInfo";
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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  hobbies: [
    {
      name: "Drums",
    },
  ],
};

function About() {
  return (
    <BoxComponent heading="About" id={"About"} bgc={"#f5f5f5"} height={"100vh"}>
      <div className={style.testimonialGrid}>
        <motion.div className={style.testimonial}>
          <div className={style.title}>
            <h1>Jason Ng</h1>
          </div>
        </motion.div>
        <motion.div className={style.testimonial + " " + style.gridRowSpan2}>
          <div className={style.title}>
            <h1>My Info</h1>
          </div>
          <p>Birthdate: 2001/11/02</p>
          <p>Nationality: Indonesian</p>
          <p>Languages:🇺🇸 🇮🇩 🇯🇵</p>
          <p>Birthdate: 2001/11/02</p>
        </motion.div>
        <motion.div className={style.testimonial + " " + style.gridRowSpan2}>
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
        </motion.div>
        <motion.div className={style.testimonial}>
          <div className={style.title}>
            <h1>My Hobbies</h1>
          </div>
        </motion.div>
        <motion.div className={style.testimonial}>
          <div className={style.title}>
            <h1>My Name</h1>
          </div>
        </motion.div>
      </div>
    </BoxComponent>
  );
}

export default About;
