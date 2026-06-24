import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

type MotionState = { enabled: boolean; toggle: () => void };

const MotionContext = createContext<MotionState>({
  enabled: true,
  toggle: () => {},
});

export const useMotionEnabled = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // The manual pause toggle was removed — motion is on for everyone except
    // users who ask for reduced motion at the OS level.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      localStorage.setItem("animations", String(next));
      return next;
    });
  }, []);

  return (
    <MotionContext.Provider value={{ enabled, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}

export default function MotionToggle() {
  const { enabled, toggle } = useMotionEnabled();

  return (
    <button
      onClick={toggle}
      aria-pressed={!enabled}
      aria-label={enabled ? "Pause animations" : "Resume animations"}
      title={enabled ? "Pause animations" : "Resume animations"}
      data-cursor
      className="fixed bottom-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-paper/80 text-ink-soft backdrop-blur transition-colors hover:border-clay hover:text-clay"
    >
      {enabled ? <FaPause /> : <FaPlay />}
    </button>
  );
}
