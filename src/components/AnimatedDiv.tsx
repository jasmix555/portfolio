import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedDivProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function AnimatedDiv({
  children,
  className,
  style,
}: AnimatedDivProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust the threshold as needed (from 0 to 1)
  });

  const variants = {
    hidden: { opacity: 0, translateY: 80 },
    visible: { opacity: 1, translateY: 0 },
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
