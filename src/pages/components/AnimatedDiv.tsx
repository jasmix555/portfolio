import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedDivProps {
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedDiv({ children, className }: AnimatedDivProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2, // Adjust the threshold as needed (from 0 to 1)
  });

  const variants = {
    hidden: { opacity: 0, translateY: 100 },
    visible: { opacity: 1, translateY: 0 },
  };

  return (
    <motion.div
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
