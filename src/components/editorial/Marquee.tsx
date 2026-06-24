import { useMotionEnabled } from "../MotionToggle";

/**
 * Infinite horizontal marquee. The track is duplicated and translated by -50%
 * so the loop is seamless. Pauses on hover; static when motion is off.
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const { enabled } = useMotionEnabled();
  const track = [...items, ...items];

  return (
    <div
      className={`marquee-paused relative flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex shrink-0 items-center whitespace-nowrap ${
          enabled ? "animate-marquee" : ""
        }`}
      >
        {track.map((it, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{it}</span>
            <span className="text-clay">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
