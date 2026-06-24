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
  Projects,
  Ideas,
  Profile,
  EditorialFooter,
} from "@/components/editorial";

// Update this if you move to a custom domain — used for canonical + OG URLs.
const SITE = "https://portfolio-v2-one-ecru.vercel.app";

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
        <link rel="canonical" href={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jason Ng" />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:title" content="Jason Ng — Front-end Engineer" />
        <meta
          property="og:description"
          content="Front-end / full-stack-leaning engineer in Osaka, Japan. Editorial, motion-driven web interfaces."
        />
        <meta property="og:image" content={`${SITE}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jason Ng — Front-end Engineer" />
        <meta
          name="twitter:description"
          content="Front-end / full-stack-leaning engineer in Osaka, Japan."
        />
        <meta name="twitter:image" content={`${SITE}/og.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jason Ng",
              jobTitle: "Front-end Engineer",
              url: `${SITE}/`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Osaka",
                addressCountry: "JP",
              },
              knowsLanguage: ["en", "ja", "id", "zh"],
              sameAs: [
                "https://github.com/jasmix555",
                "https://www.linkedin.com/in/jason-ng-6bb43a29a/",
                "https://www.instagram.com/jason_ng555/",
                "https://www.wantedly.com/id/jason_ng555",
              ],
            }),
          }}
        />
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
        <Projects />
        <Ideas />
        <Profile />
        <EditorialFooter />
      </motion.main>
    </>
  );
}
