"use client";
import { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, motion } from "framer-motion";
import styles from "@/styles/sample10.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Archive from "./components/Archive";
import MainVis from "./components/MainVis";
import Contact from "./components/Contact";
import About from "./components/About";
import ScrollBar from "./components/ScrollBar";
import Head from "next/head";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function Portfolio() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MainVis />
        <About />
        <div ref={gallery} className={styles.gallery}>
          <Column images={[images[0], images[1], images[2]]} y={y} />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
        <Archive />
        <Contact />
      </div>
    </>
  );
}

interface ColumnProps {
  images: string[];
  y: any;
}
const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src: string, i: number) => (
        <div key={i} className={styles.imageContainer}>
          <Image src={`/images/${src}`} alt="image" fill />
        </div>
      ))}
    </motion.div>
  );
};
