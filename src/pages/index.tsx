import Navbar from "./components/Navbar";
import Archive from "./components/Archive";
import MainVis from "./components/MainVis";
import Contact from "./components/Contact";
import About from "./components/About";
import ScrollBar from "./components/ScrollBar";
import Head from "next/head";
import Project from "./components/Project";
import Stoker from "./components/Stoker";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Jason Ng Portfolio</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Stoker /> */}
      <ScrollBar />
      <Navbar sectionIds={["Top", "About", "Project", "Archive", "Contact"]} />
      <MainVis />
      <About />
      <Project />
      <Archive />
      <Contact />
    </>
  );
}
