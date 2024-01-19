import React from "react";
import BoxComponent from "./Box";
import ThreeJS from "./ThreeJS";
import AnimatedDiv from "./AnimatedDiv";
import style from "@/styles/MainVis.module.scss";

export default function MainVis() {
  return (
    <BoxComponent heading="Top" id={"Top"}>
      <div className={style.mainVis}>
        <ThreeJS />
        <div>
          <AnimatedDiv delay={0.6}>Hi I&apos;m Jason Ng</AnimatedDiv>
          <AnimatedDiv delay={0.7}>
            An Aspiring Front End Engineer
            <br />
            and this is my Portfolio.
          </AnimatedDiv>
        </div>
      </div>
    </BoxComponent>
  );
}
