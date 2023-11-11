import { motion, useScroll, useSpring } from "framer-motion";
import style from "@/styles/portfolio.module.scss";

export default function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className={style.progressBar} style={{ scaleX }} />
    </>
  );
}
