import { AnimatePresence, motion } from "framer-motion";
import style from "@/styles/portfolio.module.scss";

export default function Background() {
  return (
    // <AnimatePresence mode="wait">
    <div>
      <motion.div
        className={style.slideIn}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>

      <motion.div
        className={style.slideInOne}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      ></motion.div>

      <motion.div
        className={style.slideOut}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      ></motion.div>
    </div>
    // </AnimatePresence>
  );
}
