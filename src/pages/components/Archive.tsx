import BoxComponent from "./Box";
import style from "@/styles/Archive.module.scss";
import Works from "./Works";
import works from "../types/Works";
export default function Archive() {
  return (
    <BoxComponent heading="Archive" id={"Archive"} bgc={"#f5f5f5"}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2>
            This is a collection of my works over the years.
            <br />I have been working as a Front End Engineer for 2 years now.
            <br />
            I have working on websites and web applications.
            <br />I have also worked on a wide range of technologies from React,
            HTML , SASS , Javascript and Typescript.
          </h2>
        </div>
        <div className={style.works}>
          <Works />
        </div>
      </div>
    </BoxComponent>
  );
}
