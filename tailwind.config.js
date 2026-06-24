/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  // hover: utilities only apply on devices that actually hover, so touch
  // screens never get stuck in a hover state on first tap.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // — Paper / editorial system (homepage) —
        paper: "#ECE5D6", // warm beige base
        "paper-2": "#E4DBC7", // deeper paper for alternating sections
        "paper-3": "#F3EEE2", // lifted paper (cards / highlights)
        ink: "#1C1A16", // near-black primary type
        "ink-soft": "#5B544A", // muted body / meta
        "ink-faint": "#6F6657", // captions / hairline labels (AA-contrast on paper)
        clay: "#B0432B", // desaturated vermilion / clay-red accent
        "clay-deep": "#8E3520",
        line: "rgba(28,26,22,0.16)", // hairlines

        // — Legacy dark tokens (kept so /work page survives until restyled) —
        bg: "#0a0b0f",
        surface: "#13151c",
        "surface-2": "#181b24",
        accent: "#8b7bff",
        "accent-2": "#34e0d0",
        muted: "#bcc2cf",
        faint: "#8d94a3",
      },
      fontFamily: {
        // Editorial high-contrast serif for display
        serif: ["Fraunces", "'Noto Serif JP'", "Georgia", "serif"],
        // Clean sans for body (JP falls through to Noto Sans JP)
        sans: ["Inter", "'Noto Sans JP'", "system-ui", "sans-serif"],
        // Monospace for index numbers / meta labels
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
        // legacy alias
        display: ["Fraunces", "'Noto Serif JP'", "serif"],
      },
      maxWidth: {
        site: "1120px",
        editorial: "1320px",
      },
      letterSpacing: {
        label: "0.22em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
