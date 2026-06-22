import { useCallback, MouseEvent } from "react";
import { useLenis } from "@studio-freight/react-lenis";

// Returns an onClick handler that smooth-scrolls to `#id` via Lenis.
// When Lenis isn't active (motion off / reduced-motion), it does nothing and the
// anchor's native href handles the jump.
export function useAnchorScroll() {
  const lenis = useLenis();
  return useCallback(
    (e: MouseEvent, id: string) => {
      if (!lenis) return;
      e.preventDefault();
      lenis.scrollTo(`#${id}`, { offset: -80 });
    },
    [lenis]
  );
}
