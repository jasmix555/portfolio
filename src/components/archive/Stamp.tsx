/**
 * Accession stamp — the thing an archive presses onto a file.
 *
 * Type only, no drawn mark: a 1px rule box around `JN` with the signal bar
 * welded to its right edge. Every proportion is derived from the box height
 * (font 0.625, optical padding 0.18, bar 0.17), which is why the same component
 * holds at 64px and at 16px. The bar is the only place the signal appears in
 * the header.
 *
 * Never: signal as the box or the letters, rounded corners, gradient, rotation,
 * a second hue, or the stamp without its bar.
 */
export default function Stamp({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-stretch border-bone ${
        size >= 64 ? "border-2" : "border"
      } ${className}`}
      style={{ height: size }}
    >
      <span
        className="flex items-center font-extrabold leading-none tracking-[-0.04em] [font-stretch:112%]"
        style={{
          fontSize: Math.round(size * 0.625),
          paddingInline: Math.round(size * 0.18),
        }}
      >
        JN
      </span>
      <span
        className="bg-signal"
        style={{ width: Math.max(3, Math.round(size * 0.17)) }}
      />
    </span>
  );
}
