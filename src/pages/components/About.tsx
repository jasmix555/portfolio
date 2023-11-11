import BoxComponent from "./Box";
import MyInfo from "./MyInfo";

function About() {
  return (
    <BoxComponent heading="About" id={"About"} bgc={"#f5f5f5"} height={"100vh"}>
      <MyInfo />
    </BoxComponent>
  );
}

export default About;
