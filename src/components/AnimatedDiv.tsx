import { cubicBezier, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedDivProps {
  children: React.ReactNode;
  delay?: number;
  index?: number; // Add index prop
  className?: any;
  translate?: number;
  transition?: number;
  style?: any;
}

export default function AnimatedDiv({
  children,
  className,
  delay,
  index = 1,
  translate,
  transition,
  style,
}: AnimatedDivProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust the threshold as needed (from 0 to 1)
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: translate || 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: transition || 0.2,
        delay: index * 0.1 + (delay || 0), // Increase delay based on the index and additional delay
        cubicBezier: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  };

  return (
    <motion.div
      style={style}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
