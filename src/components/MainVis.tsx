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
        <AnimatedDiv delay={0.6}>
          <h1>Hi I&apos;m Jason Ng</h1>
          <p>
            An Aspiring Front End Engineer
            <br />
            and this is my Portfolio.
          </p>
        </AnimatedDiv>
      </div>
    </BoxComponent>
  );
}
