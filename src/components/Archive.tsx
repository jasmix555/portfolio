import BoxComponent from "./Box";
import style from "@/styles/Archive.module.scss";
import Works from "./Works";
export default function Archive() {
  return (
    <BoxComponent heading="Archive" id={"Archive"}>
      <div className={style.wrapper}>
        <div className={style.works}>
          <Works />
        </div>
      </div>
    </BoxComponent>
  );
}
