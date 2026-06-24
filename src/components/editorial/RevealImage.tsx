import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionEnabled } from "../MotionToggle";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** wipe direction */
  from?: "bottom" | "left";
};

/**
 * Image with an editorial mask-reveal: a clip-path wipe uncovers the image as
 * it enters view while the image itself eases from a slight zoom — the
 * "image reveal masking" motion. Falls back to a plain image when motion is off.
 */
export default function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  from = "bottom",
}: Props) {
  const { enabled } = useMotionEnabled();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  const shown = "inset(0 0 0 0)";

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={enabled ? { clipPath: hidden } : false}
        animate={{ clipPath: enabled ? (inView ? shown : hidden) : shown }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "100%", width: "100%" }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          initial={enabled ? { scale: 1.14 } : false}
          animate={{ scale: enabled ? (inView ? 1.04 : 1.14) : 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full w-full select-none object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}
