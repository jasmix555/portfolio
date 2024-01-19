import React from "react";
import BoxComponent from "./Box";
import ThreeJS from "./ThreeJS";
import AnimatedDiv from "./AnimatedDiv";

export default function MainVis() {
  return (
    <BoxComponent heading="Top" id={"Top"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeJS />
        <AnimatedDiv delay={0.6}>
          <div>
            <h1>Hi I&apos;m Jason Ng</h1>
            <p
              style={{
                fontSize: "1.8rem",
              }}
            >
              An Aspiring Front End Engineer
              <br />
              and this is my Portfolio.
            </p>
          </div>
        </AnimatedDiv>
      </div>
    </BoxComponent>
  );
}
