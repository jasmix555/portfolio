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
  SiGithub,
  SiFirebase,
  SiVercel,
} from "react-icons/si";
import AnimatedDiv from "./AnimatedDiv";
import Image from "next/image";

const about = {
  skills: [
    {
      category: "Coding/Programming",
      items: [
        { name: "HTML", icon: SiHtml5, duration: "1.5 years" },
        { name: "SCSS", icon: SiSass, duration: "1.2 year" },
        { name: "JavaScript", icon: SiJavascript, duration: "9 months" },
        { name: "Next.js", icon: SiNextdotjs, duration: "4 months" },
      ],
    },

    {
      category: "Design",
      items: [
        { name: "Illustrator", icon: SiAdobeillustrator, duration: "2 years" },
        { name: "Photoshop", icon: SiAdobephotoshop, duration: "2 years" },
        { name: "Figma", icon: SiFigma, duration: "1 year" },
      ],
    },

    {
      category: "Hosting",
      items: [
        { name: "GitHub", icon: SiGithub, duration: "1 year" },
        { name: "Vercel", icon: SiVercel, duration: "4 months" },
      ],
    },
    {
      category: "Backend",
      items: [{ name: "Firebase", icon: SiFirebase, duration: "3 months" }],
    },
  ],
};

function About() {
  return (
    <BoxComponent heading="About" id={"About"} height={"100vh"}>
      <div className={style.testimonialGrid}>
        <AnimatedDiv className={`${style.testimonial} ${style.gridColSpan2}`}>
          <div className={style.title}>
            <h1>My Info</h1>
          </div>
          <div>
            <p>Name : Jason Ng</p>
            <p>Birthdate : 2001/11/02</p>
            <p>Nationality : Indonesian</p>
            <p>Languages : English , Indonesian , Japanese , Chinese</p>
          </div>
        </AnimatedDiv>

        <AnimatedDiv className={`${style.testimonial} ${style.image}`}>
          <Image
            className={style.profile}
            src="/profile/profile.png"
            alt="profile"
            width={200}
            height={200}
          />
        </AnimatedDiv>

        <AnimatedDiv className={`${style.testimonial} ${style.gridRowSpan2}`}>
          <div className={style.title}>
            <h1>Tech Stack</h1>
          </div>
          <div className={style.categoryWrapper}>
            {about.skills.map((category, idx) => (
              <div className={style.content} key={idx}>
                <h2 className={style.category}>{category.category}</h2>
                <div className={style.skillsWrapper}>
                  {category.items.map((item, idx) => (
                    <div key={idx} className={style.skills}>
                      <div className={style.tag}>
                        <item.icon />
                        <p className={style.name}>{item.name}</p>
                      </div>
                      <p className={style.duration}>{item.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedDiv>

        <AnimatedDiv className={style.testimonial}>
          <div className={style.title}>
            <h1>My Story</h1>
          </div>
          <p>Currently a student studying web design abroad in Japan</p>
        </AnimatedDiv>

        <AnimatedDiv className={style.testimonial}>
          <div className={style.title}>
            <h1>My Motto</h1>
          </div>
          <p>
            新しいことを探求するのが好きで、
            <br />
            好奇心が強く、満足するまで諦めません！
            <br />
            何かに興味を持ったら、それが理解できるまで調べないと、
            <br />
            じっとしていられなくなります。
          </p>
        </AnimatedDiv>
      </div>
    </BoxComponent>
  );
}

export default About;
