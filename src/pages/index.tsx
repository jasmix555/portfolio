import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Intro from "@/components/Intro";
import MotionToggle from "@/components/MotionToggle";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Contact from "@/components/Contact";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Head>
        <title>Jason Ng — Front-end Engineer</title>
        <meta
          name="description"
          content="Jason Ng — front-end / full-stack engineer based in Osaka, Japan, open to new opportunities. Building modern web apps with React and Next.js."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background3D />
      <Intro onDone={() => setIntroDone(true)} />
      <MotionToggle />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Navbar />

        <main className="relative">
          <Hero start={introDone} />
          <About />
          <TechStack />
          <Works />
          <Contact />
          <footer className="border-t border-white/10 py-9 text-center text-[13px] text-faint">
            © 2026 Jason Ng — designed &amp; built with care.
          </footer>
        </main>
      </motion.div>
    </>
  );
}
