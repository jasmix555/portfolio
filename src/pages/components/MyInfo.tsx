import style from "@/styles/portfolio.module.scss";

export default function MyInfo() {
  return (
    <div className={style.testimonialGrid}>
      <div className={style.testimonial}>
        <div>
          <h1>Jason Ng</h1>
        </div>
      </div>
      <div className={style.testimonial + " " + style.gridRowSpan2}>
        <div>
          <p>Birthdate : 2001/11/02</p>
          <p>Nationality : Indonesian</p>
          <p>Birthdate : 2001/11/02</p>
          <p>Birthdate : 2001/11/02</p>
        </div>
      </div>
      <div className={style.testimonial + " " + style.gridRowSpan2}>
        <div>
          <h1>My Skills</h1>
        </div>
      </div>
      <div className={style.testimonial}>
        <div>
          <h1>My Hobbies</h1>
        </div>
      </div>
      <div className={style.testimonial}>
        <div>
          <h1>My Name</h1>
        </div>
      </div>
      <div className={style.testimonial}>
        <div>
          <h1>My Name</h1>
        </div>
      </div>
    </div>
  );
}
