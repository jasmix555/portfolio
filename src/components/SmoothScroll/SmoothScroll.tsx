import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useMotionEnabled } from "../MotionToggle";

// Wraps the app in Lenis smooth scroll — but only when motion is enabled.
// Reduced-motion users (or those who pause animations) get native scroll.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { enabled } = useMotionEnabled();

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
