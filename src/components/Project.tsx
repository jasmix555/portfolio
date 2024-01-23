import AnimatedDiv from "./AnimatedDiv";
import BoxComponent from "./Box";
import style from "@/styles/Project.module.scss";

export default function Project() {
  return (
    <BoxComponent
      heading="Project"
      id={"Project"}
      bgc={"#f5f5f5"}
      height={"100vh"}
    >
      <AnimatedDiv className={style.wrapper}>
        <h1>Main Project</h1>
      </AnimatedDiv>
    </BoxComponent>
  );
}
