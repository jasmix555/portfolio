import BoxComponent from "./Box";
import style from "@/styles/Archive.module.scss";
import Works from "./Works";
import works from "../types/Works";
export default function Archive() {
  return (
    <BoxComponent heading="Archive" id={"Archive"} bgc={"#f5f5f5"}>
      <div className={style.wrapper}>
        <div className={style.works}>
          <Works />
        </div>
      </div>
    </BoxComponent>
  );
}
