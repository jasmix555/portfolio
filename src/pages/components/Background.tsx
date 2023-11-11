import { motion } from "framer-motion";
import style from "@/styles/portfolio.module.scss";

export default function Background() {
  const containerVariants = {
    start: {
      opacity: 1,
    },
    end: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 1.5,
      },
    },
  };

  const circleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  const circleTransition = {
    loop: Infinity,
    duration: 0.5,
    ease: "linear",
  };

  return (
    <motion.div
      className={style.body}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      <motion.div
        className={style.bg}
        variants={circleVariants}
        transition={circleTransition}
      ></motion.div>
    </motion.div>
  );
}
