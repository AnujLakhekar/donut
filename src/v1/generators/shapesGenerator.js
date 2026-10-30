// src/v1/generators/shapesGenerator.js
import { SHAPES_ASSETS } from "../styles/shapes.js";
import { SeededRandom } from "./prng.js";

export function generateShapesAvatar({ seed = "default", options = {} }) {
  const rng = new SeededRandom(seed);
  const paletteName = options.palette || "electric";
  const palette = SHAPES_ASSETS.palettes[paletteName] || SHAPES_ASSETS.palettes.electric;

  const shapeColor = options.shapeColor || rng.pick(palette.shapeColors);
  const isAnimated = options.animated || false;

  let backgroundDef = "";
  let fillStyle = "";

  if (palette.gradients) {
    const grad = rng.pick(palette.gradients);
    backgroundDef = `
      <defs>
        <linearGradient id="${grad.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${grad.colors[0]}" />
          <stop offset="100%" stop-color="${grad.colors[1]}" />
        </linearGradient>
      </defs>
    `;
    fillStyle = `url(#${grad.id})`;
  } else {
    fillStyle = options.bg || rng.pick(palette.backgrounds);
  }

  // Generate 2x2 grid of tiles (tile dimensions: 50x50 each inside a 100x100 viewBox)
  const gridTiles = [];
  const rotations = [0, 90, 180, 270];

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const tileSvg = rng.pick(SHAPES_ASSETS.tiles).replace(/{color}/g, shapeColor);
      const rotation = rng.pick(rotations);
      const x = col * 50;
      const y = row * 50;

      gridTiles.push(`
        <g transform="translate(${x} ${y}) rotate(${rotation} 25 25)">
          ${tileSvg}
        </g>
      `);
    }
  }

  // Optional CSS Animation for "Animated" style option
  const animationStyle = isAnimated ? `
    <style>
      @keyframes loopRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .loop-grid { transform-origin: 50px 50px; animation: loopRotate 20s linear infinite; }
    </style>
  ` : "";

  const svgDiagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      ${animationStyle}
      ${backgroundDef}
      <rect width="100" height="100" fill="${fillStyle}" rx="${options.radius ?? 20}"/>
      <g class="loop-grid">
        ${gridTiles.join('')}
      </g>
    </svg>
  `.trim();

  return {
    seed,
    style: "shapes",
    palette: paletteName,
    svg: { diagram: svgDiagram }
  };
}