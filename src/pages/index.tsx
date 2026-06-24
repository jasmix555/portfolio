import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import {
  CustomCursor,
  EditorialNav,
  IntroLoader,
  Hero,
  WorkScroll,
  Projects,
  Ideas,
  Profile,
  EditorialFooter,
} from "@/components/editorial";

const LivingBackground = dynamic(
  () => import("@/components/editorial/LivingBackground"),
  { ssr: false }
);

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);
  const lenis = useLenis();

  // Lock scrolling (Lenis + native) until the intro finishes.
  useEffect(() => {
    if (introDone) return;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [introDone, lenis]);

  return (
    <>
      <Head>
        <title>Jason Ng — Front-end Engineer</title>
        <meta
          name="description"
          content="Jason Ng — front-end / full-stack-leaning engineer based in Osaka, Japan. Editorial, motion-driven web interfaces. Open to new opportunities."
        />
        <meta name="theme-color" content="#ECE5D6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jason Ng — Front-end Engineer" />
        <meta
          property="og:description"
          content="Front-end / full-stack-leaning engineer in Osaka, Japan. Editorial, motion-driven web interfaces."
        />
        <meta property="og:image" content="/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jason Ng — Front-end Engineer" />
        <meta name="twitter:image" content="/og.png" />
      </Head>

      <LivingBackground />
      <IntroLoader onDone={() => setIntroDone(true)} />
      <CustomCursor />
      <EditorialNav />

      <motion.main
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Hero />
        <WorkScroll />
        <Projects />
        <Ideas />
        <Profile />
        <EditorialFooter />
      </motion.main>
    </>
  );
}
