import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";

/**
 * Desktop-only ink cursor. A soft clay disc that trails the pointer with a
 * spring and swells when hovering links / buttons / [data-cursor]. Multiply
 * blend makes it read like ink soaking into the paper. Hidden entirely on
 * touch devices and when motion is paused (native cursor returns).
 */
export default function CustomCursor() {
  const { enabled } = useMotionEnabled();
  const [active, setActive] = useState(false); // pointer is a fine device
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || !enabled) return;
    setActive(true);
    document.body.classList.add("has-ink-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(Boolean(t?.closest("a, button, [data-cursor]")));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("has-ink-cursor");
      setActive(false);
    };
  }, [enabled, x, y]);

  if (!active) return null;

  const size = hovering ? 56 : 16;

  return (
    <motion.div
      aria-hidden="true"
      className="ink-cursor"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: hovering ? "rgba(176,67,43,0.85)" : "#1c1a16",
      }}
      animate={{ width: size, height: size, scale: down ? 0.7 : 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    />
  );
}
