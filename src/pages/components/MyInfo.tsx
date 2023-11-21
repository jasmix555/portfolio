import style from "@/styles/About.module.scss";
import types from "../types/About";

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
            {types.skills.map((skill, idx) => (
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
