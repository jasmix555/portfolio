import { useEffect } from "react";
import { useMotionEnabled } from "../MotionToggle";

/**
 * Identity layer — the scroll-driven field that replaces the WebGL wave.
 *
 * Two layers, one scroll input, no shader and no canvas. A single passive
 * listener behind rAF writes two custom properties on the root; the halftone
 * and the column rules read them from CSS (see globals.css) so the whole thing
 * stays on the compositor. Both offsets are taken modulo their tile so the
 * numbers stay small and the tiles never run out of overscan.
 *
 * No rail, no marker, no progress read-out, no sidebar of any kind: the ground
 * moves, the page carries the information. The component renders nothing.
 *
 * Under reduced motion the listener is never attached: the layers stay at their
 * load position and the ground is simply a static print.
 */
export default function ScrollField() {
  const { enabled } = useMotionEnabled();

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    let raf = 0;

    const write = () => {
      raf = 0;
      const y = window.scrollY;
      // Halftone drifts down at 0.06×, column rules slide at −0.12×.
      //
      // Deliberately not wrapped to the tile size. Both patterns repeat on
      // their own, so a modulo bought nothing but a copy of the halftone pitch
      // and the rule pitch living over here in JS — where they silently go
      // wrong the moment the CSS that owns them changes.
      root.style.setProperty("--dot-y", `${(y * 0.06).toFixed(2)}px`);
      root.style.setProperty("--col-x", `${(y * -0.12).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--dot-y");
      root.style.removeProperty("--col-x");
    };
  }, [enabled]);

  return null;
}
