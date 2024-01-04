import AnimatedDiv from "./AnimatedDiv";
import BoxComponent from "./Box";

export default function Project() {
  return (
    <BoxComponent
      heading="Project"
      id={"Project"}
      bgc={"#f5f5f5"}
      height={"100vh"}
    >
      <AnimatedDiv
        style={{
          width: "90vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: " 0 auto",
          backgroundColor: "#eee",
        }}
      >
        <h1>Main Project</h1>
      </AnimatedDiv>
    </BoxComponent>
  );
}
