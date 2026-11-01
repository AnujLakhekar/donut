// src/v1/generators/glyphsGenerator.js
import { GLYPHS_ASSETS } from "../styles/glyphsAssets.js";
import { SeededRandom } from "./prng.js";

export function generateGlyphsAvatar({ seed = "default", options = {} }) {
  const rng = new SeededRandom(seed);
  const paletteName = options.palette || "electric";
  const palette = GLYPHS_ASSETS.palettes[paletteName] || GLYPHS_ASSETS.palettes.electric;

  const bg = options.bg || palette.bg;
  const moundColor = palette.mound;
  const glyphColor = options.textColor || palette.glyph;

  // Pick deterministic glyph shape based on seed
  const rawGlyph = rng.pick(GLYPHS_ASSETS.shapes).replace(/{color}/g, glyphColor);

  // Animation values derived from progress t (0.0 to 1.0)
  const t = options.progress ?? 0;
  const loopAngle = t * Math.PI * 2;

  // Subtle floating motion for animated GIF
  const floatY = options.progress !== undefined ? Math.sin(loopAngle) * 6 : 0;
  const scalePulse = options.progress !== undefined ? 1 + Math.cos(loopAngle) * 0.05 : 1;

  const svgDiagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <!-- Background Card -->
      <rect width="100" height="100" fill="${bg}" rx="${options.radius ?? 20}"/>

      <!-- Bottom Curved Base Mound -->
      <path d="M 0 100 Q 50 60 100 100 Z" fill="${moundColor}" />

      <!-- Centered Floating Glyph Symbol -->
      <g transform="translate(0 ${floatY}) scale(${scalePulse})" transform-origin="50 35">
        ${rawGlyph}
      </g>
    </svg>
  `.trim();

  return {
    seed,
    style: "glyphs",
    palette: paletteName,
    svg: { diagram: svgDiagram }
  };
}