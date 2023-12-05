import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Archive from "./components/Archive";
import MainVis from "./components/MainVis";
import Contact from "./components/Contact";
import About from "./components/About";
import ScrollBar from "./components/ScrollBar";
import Head from "next/head";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Jason Ng Portfolio</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollBar />
      <Background />
      <Navbar sectionIds={["Top", "About", "Archive", "Contact"]} />
      <div
        className="main-wrap"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MainVis />
        <About />
        <Archive />
        <Contact />
      </div>
    </>
  );
}
