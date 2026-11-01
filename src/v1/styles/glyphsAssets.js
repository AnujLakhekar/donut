// src/v1/styles/glyphsAssets.js

export const GLYPHS_ASSETS = {
  palettes: {
    ink: { bg: "#E5E5E5", mound: "#1A1A1A", glyph: "#1A1A1A" },
    sepia: { bg: "#E8DFD1", mound: "#4A3222", glyph: "#4A3222" },
    greyscale: { bg: "#E0E0E0", mound: "#5A5A5A", glyph: "#5A5A5A" },
    duotone: { bg: "#D9E5E2", mound: "#0B3C36", glyph: "#0B3C36" },
    muted: { bg: "#E3E1DC", mound: "#5C5549", glyph: "#8B94A0" },
    electric: { bg: "#FAFAC6", mound: "#5C5600", glyph: "#9000FF" },
    cool: { bg: "#DCEBF0", mound: "#123C4D", glyph: "#3A52A4" },
    warm: { bg: "#FCE8E6", mound: "#661C2A", glyph: "#C84B42" },
  },

  // Centered Vector Glyph Elements
  shapes: [
    // 1. Downward Chevron / V-shape
    `<path d="M 25 25 L 50 45 L 75 25" stroke="{color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />`,

    // 2. Rotated Diamond / Rhombus
    `<rect x="35" y="20" width="30" height="30" rx="4" transform="rotate(45 50 35)" stroke="{color}" stroke-width="10" fill="none" />`,

    // 3. Curved Upward Arc
    `<path d="M 25 35 Q 50 15 75 35" stroke="{color}" stroke-width="12" stroke-linecap="round" fill="none" />`,

    // 4. Diagonal Stem / Hook Curve
    `<path d="M 35 45 Q 40 15 65 20" stroke="{color}" stroke-width="12" stroke-linecap="round" fill="none" />`,

    // 5. Concentric Circle Ring
    `<circle cx="50" cy="32" r="14" stroke="{color}" stroke-width="10" fill="none" />`,

    // 6. Upward Pillar Arrow
    `<path d="M 50 45 V 20 M 35 30 L 50 15 L 65 30" stroke="{color}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />`,
  ],
};
