import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// A greeting in each language Jason speaks: EN, JP, ID, ZH.
const greetings = ["Hello", "こんにちは", "Halo", "你好"];

// Every greeting is shown for exactly this long.
const WORD_MS = 600;

export default function Intro() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (i < greetings.length - 1) setI(i + 1);
      else setDone(true);
    }, WORD_MS);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="grid place-items-center gap-5 text-center">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="grid place-items-center">
              <AnimatePresence>
                <motion.span
                  key={i}
                  style={{ gridArea: "1 / 1" }}
                  className="whitespace-nowrap font-display text-4xl font-bold text-white md:text-6xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {greetings[i]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
