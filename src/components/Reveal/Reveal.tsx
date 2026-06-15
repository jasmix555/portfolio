import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
    >
      {children}
    </div>
  );
}
