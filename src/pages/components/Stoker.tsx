import style from "@/styles/Stoker.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Stoker() {
  const [stoker, setStoker] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setStoker({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: stoker.x - 10,
      y: stoker.y - 10,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className={style.wrapper}>
      <motion.div
        className={style.stoker}
        variants={variants}
        initial="default"
        animate="default"
      ></motion.div>
    </div>
  );
}
