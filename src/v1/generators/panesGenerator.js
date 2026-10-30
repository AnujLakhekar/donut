// src/v1/generators/panesGenerator.js
import { PANES_ASSETS } from "../styles/panes.js";
import { SeededRandom } from "./prng.js";

export function generatePanesAvatar({ seed = "default", options = {} }) {
  const rng = new SeededRandom(seed);
  const paletteName = options.palette || "sunrise";
  const palette = PANES_ASSETS.palettes[paletteName] || PANES_ASSETS.palettes.sunrise;

  const bg = options.bg || rng.pick(palette.backgrounds);
  const paneColors = rng.pick(palette.panes);

  // Generate 2 to 3 organic gradient blobs (panes)
  const numPanes = rng.number(2, 3);
  const paneElements = [];
  const gradientDefs = [];

  for (let i = 0; i < numPanes; i++) {
    const gradId = `pane-grad-${i}`;
    const cx = rng.number(20, 80);
    const cy = rng.number(20, 80);
    const rx = rng.number(30, 60);
    const ry = rng.number(30, 60);
    const rotate = rng.number(0, 360);

    gradientDefs.push(`
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${paneColors[0]}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${paneColors[1]}" stop-opacity="0.2" />
      </linearGradient>
    `);

    paneElements.push(`
      <ellipse 
        cx="${cx}" 
        cy="${cy}" 
        rx="${rx}" 
        ry="${ry}" 
        fill="url(#${gradId})" 
        transform="rotate(${rotate} ${cx} ${cy})" 
        filter="url(#glass-blur)"
      />
    `);
  }

  const blurAmount = options.blur !== undefined ? options.blur : 12;

  const svgDiagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="${blurAmount}" />
        </filter>
        <clipPath id="avatar-clip">
          <rect width="100" height="100" rx="${options.radius ?? 20}" />
        </clipPath>
        ${gradientDefs.join('')}
      </defs>
      
      <g clip-path="url(#avatar-clip)">
        <rect width="100" height="100" fill="${bg}" />
        ${paneElements.join('')}
      </g>
    </svg>
  `.trim();

  return {
    seed,
    style: "panes",
    palette: paletteName,
    svg: { diagram: svgDiagram }
  };
}