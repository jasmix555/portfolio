import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";

type Props = {
  children: ReactNode;
  /** Vertical travel in px across the element's scroll range. Higher = more drift. */
  speed?: number;
  /** Also dip opacity at the edges of the viewport. */
  fade?: boolean;
  className?: string;
};

// Single reusable parallax wrapper. Gated by the motion toggle: when motion is
// off it renders children with no transform at all.
export default function Parallax({
  children,
  speed = 50,
  fade = false,
  className = "",
}: Props) {
  const { enabled } = useMotionEnabled();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity: fade ? opacity : undefined }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
