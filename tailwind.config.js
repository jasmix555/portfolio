/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // `src/data` too: the stack chart picks its recency band in profile.ts, so
    // those class names only exist in a data file. Left out of the scan they
    // fail silently — the bars just don't paint.
    "./src/data/**/*.{js,ts}",
  ],
  // hover: utilities only apply on devices that actually hover, so touch
  // screens never get stuck in a hover state on first tap.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    // REC ARCHIVE is a print system: radius 0 everywhere, no shadows.
    // Separation is hairlines, never softness. Overriding (not extending)
    // makes `rounded-*` / `shadow-*` impossible to reach for by accident.
    borderRadius: { none: "0", DEFAULT: "0", full: "0" },
    boxShadow: { none: "none", DEFAULT: "none" },
    extend: {
      colors: {
        // — Monochrome ramp. Contrast is measured against ground / bone. —
        ground: "#0B0B0B", // page base (not pure black — hairlines + grain must stay visible)
        g1: "#141414", // panel fill / expanded row
        g2: "#1E1E1E", // row hover
        g3: "#2E2E2E", // solid hairline
        g4: "#4A4A4A", // disabled type
        g5: "#6E6E6E", // UI borders (3.86:1 — passes 3:1)
        g6: "#9A9A9A", // labels / meta on ground (6.99:1)
        g7: "#C7C4BD", // body copy (11.3:1)
        bone: "#F2F0EB", // primary type (17.3:1)
        rule: "rgba(242,240,235,0.18)", // default 1px hairline
        // — The one signal. 4.6:1 on ground. No second hue anywhere, ever. —
        signal: "#E5390A", // OXIDE
      },
      fontFamily: {
        sans: ["Archivo", "'Zen Kaku Gothic New'", "system-ui", "sans-serif"],
        // Plex Mono carries no CJK — Zen Kaku picks up the JP inside labels.
        mono: [
          "'IBM Plex Mono'",
          "'Zen Kaku Gothic New'",
          "ui-monospace",
          "monospace",
        ],
        jp: ["'Zen Kaku Gothic New'", "system-ui", "sans-serif"],
        mincho: ["'Zen Old Mincho'", "Georgia", "serif"],
      },
      // Nothing exists between 15 and 34px. The scale gap is the design.
      fontSize: {
        "display-xl": [
          "280px",
          { lineHeight: "0.82", letterSpacing: "-0.05em", fontWeight: "800" },
        ],
        "display-l": [
          "160px",
          { lineHeight: "0.86", letterSpacing: "-0.04em", fontWeight: "800" },
        ],
        head: [
          "96px",
          { lineHeight: "0.86", letterSpacing: "-0.045em", fontWeight: "800" },
        ],
        sub: [
          "56px",
          { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        title: [
          "34px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "jp-accent": ["34px", { lineHeight: "1.3" }],
        body: ["15px", { lineHeight: "1.7" }],
        // +0.2 line-height over EN so both lock to the same 8px grid.
        "body-jp": ["15px", { lineHeight: "1.9", letterSpacing: "0.01em" }],
        data: ["13px", { lineHeight: "1.5", letterSpacing: "0.12em" }],
        // 12px floor: 11px mono at 0.22em tracking is legible on a design board and
        // not on a laptop at arm’s length. Nothing on the site prints smaller.
        label: ["12px", { lineHeight: "1.55", letterSpacing: "0.2em" }],
      },
      letterSpacing: {
        label: "0.22em",
        data: "0.12em",
        btn: "0.16em",
        meta: "0.14em",
      },
      maxWidth: {
        content: "1248px", // 1440 − 2 × 96 margin
        prose: "62ch", // body copy never runs longer
      },
      // 3 curves, 4 durations. No springs, no bounce — mechanical, not bouncy.
      transitionTimingFunction: {
        snap: "cubic-bezier(.2,0,0,1)", // block wipes, reveals
        drive: "cubic-bezier(.65,0,.35,1)", // position, scrub, nav
        cut: "steps(6,end)", // counters, mono glyph swaps
      },
      transitionDuration: {
        flick: "80ms", // hover, focus
        quick: "180ms", // wipes, toggles
        move: "420ms", // record expand
      },
    },
  },
  plugins: [],
};
