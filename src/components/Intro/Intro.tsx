import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// A greeting in each language Jason speaks: EN, JP, ID, ZH.
const greetings = ["Hello", "こんにちは", "Halo", "你好"];

const WORD_MS = 600; // time each greeting is shown
const PAUSE_MS = 1100; // text fade + "just the 3D" beat before content

export default function Intro({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [textGone, setTextGone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setTextGone(true);
    setHidden(true);
    onDone();
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let k = 1; k < greetings.length; k++) {
      timers.push(setTimeout(() => setI(k), k * WORD_MS));
    }
    // fade the text out after the last greeting, then reveal content after a beat
    timers.push(setTimeout(() => setTextGone(true), greetings.length * WORD_MS));
    timers.push(setTimeout(finish, greetings.length * WORD_MS + PAUSE_MS));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          onClick={finish}
          role="button"
          tabIndex={0}
          aria-label="Skip intro"
          className="fixed inset-0 z-[80] grid cursor-pointer place-items-center"
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
                {!textGone && (
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
                )}
              </AnimatePresence>
            </div>
          </div>

          <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-faint">
            Click anywhere to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
