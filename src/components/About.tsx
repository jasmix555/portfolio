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
  SiReact,
} from "react-icons/si";
import AnimatedDiv from "./AnimatedDiv";
import Image from "next/image";

const about = {
  skills: [
    {
      category: "Coding/Programming",
      items: [
        { name: "HTML", icon: SiHtml5, duration: "3Years 9Months" },
        { name: "SCSS", icon: SiSass, duration: "3Years 2Months" },
        { name: "JavaScript", icon: SiJavascript, duration: "2Years" },
        { name: "React.js", icon: SiReact, duration: "1Year 5Months" },
        { name: "Next.js", icon: SiNextdotjs, duration: "1Year 2Months" },
      ],
    },

    {
      category: "Design",
      items: [
        {
          name: "Illustrator",
          icon: SiAdobeillustrator,
          duration: "2Years 6Months",
        },
        { name: "Photoshop", icon: SiAdobephotoshop, duration: "2Years 7Months" },
        { name: "Figma", icon: SiFigma, duration: "1Year 6Months" },
      ],
    },

    {
      category: "Hosting",
      items: [
        { name: "GitHub", icon: SiGithub, duration: "1Year 2Months" },
        { name: "Vercel", icon: SiVercel, duration: "9Months" },
      ],
    },
    {
      category: "Backend",
      items: [{ name: "Firebase", icon: SiFirebase, duration: "8Months" }],
    },
  ],
};

function About() {
  return (
    <BoxComponent heading='About' id={"About"} height={"fit-content"}>
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
            src='/profile/profile.png'
            alt='profile'
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
            <h1>Hobbies</h1>
          </div>
          <p>
            Working Out(Home Workout),
            <br />
            Drums, Taking Pictures(Canon Eos)
          </p>
        </AnimatedDiv>

        <AnimatedDiv className={style.testimonial}>
          <div className={style.title}>
            <h1>My Motto</h1>
          </div>
          <p>
            まず行動し、経験から学び、成長し続ける。
          </p>
        </AnimatedDiv>
      </div>
    </BoxComponent>
  );
}

export default About;
