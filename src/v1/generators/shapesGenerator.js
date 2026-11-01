// src/v1/generators/shapesGenerator.js
import { SHAPES_ASSETS } from "../styles/shapes.js";
import { SeededRandom } from "./prng.js";

export function generateShapesAvatar({ seed = "default", options = {} }) {
  const rng = new SeededRandom(seed);
  const paletteName = options.palette || "electric";
  const palette = SHAPES_ASSETS.palettes[paletteName] || SHAPES_ASSETS.palettes.electric;

  const shapeColor = options.shapeColor || rng.pick(palette.shapeColors);
  const fillStyle = options.bg || rng.pick(palette.backgrounds);

  // Normalized progress from keyframe generator (0.0 to 1.0)
  const t = options.progress ?? 0;
  const loopAngle = t * Math.PI * 2; // 0 to 2PI for smooth sin/cos loops

  // 1. Pick procedural tiles for a 2x2 layout deterministically based on seed
  const gridTiles = [];
  const rotations = [0, 90, 180, 270];

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const tileRaw = rng.pick(SHAPES_ASSETS.tiles).replace(/{color}/g, shapeColor);
      const baseRotation = rng.pick(rotations);
      
      // Compute subtle wobble per tile using phase offset
      const phase = (row * 2 + col) * (Math.PI / 2);
      const tileWobble = Math.sin(loopAngle + phase) * 8; // Slight local rotation
      const x = col * 50;
      const y = row * 50;

      gridTiles.push(`
        <g transform="translate(${x} ${y}) rotate(${baseRotation + tileWobble} 25 25)">
          ${tileRaw}
        </g>
      `);
    }
  }

  // 2. Pick an accent overlay style deterministically based on seed
  // Options: 'wave' | 'strokes' | 'rings' | 'none'
  const overlayTypes = ['wave', 'strokes', 'rings', 'none'];
  const overlayType = rng.pick(overlayTypes);

  let overlayElement = "";

  if (overlayType === 'wave') {
    // Wavy Path Morphing
    const waveAmp = Math.sin(loopAngle) * 10;
    const strokePulse = 8 + Math.cos(loopAngle) * 3;
    const wavePath = `M 10 ${50 + waveAmp} Q 30 ${30 - waveAmp}, 50 ${50 + waveAmp} T 90 ${50 - waveAmp}`;

    overlayElement = `
      <path 
        d="${wavePath}" 
        stroke="${shapeColor}" 
        stroke-width="${strokePulse}" 
        stroke-linecap="round" 
        fill="none" 
        opacity="0.9"
      />
    `;
  } else if (overlayType === 'strokes') {
    // Random Animated Accent Strokes (2-3 dynamic slashes)
    const strokeCount = rng.number(2, 4);
    const strokeLines = [];

    for (let i = 0; i < strokeCount; i++) {
      const x1 = rng.number(10, 40);
      const y1 = rng.number(10, 80);
      const length = rng.number(30, 50);
      const dx = Math.cos(loopAngle + i) * 6;
      const dy = Math.sin(loopAngle + i) * 6;

      strokeLines.push(`
        <line 
          x1="${x1 + dx}" y1="${y1 + dy}" 
          x2="${x1 + length + dx}" y2="${y1 + length + dy}" 
          stroke="${shapeColor}" 
          stroke-width="${rng.number(4, 8)}" 
          stroke-linecap="round"
          opacity="0.85"
        />
      `);
    }
    overlayElement = strokeLines.join('');
  } else if (overlayType === 'rings') {
    // Pulsing Concentric Accent Ring
    const pulseRadius = 15 + Math.sin(loopAngle) * 5;
    const ringStroke = 4 + Math.cos(loopAngle) * 2;

    overlayElement = `
      <circle 
        cx="50" cy="50" r="${pulseRadius}" 
        stroke="${shapeColor}" 
        stroke-width="${ringStroke}" 
        fill="none" 
        opacity="0.8"
      />
    `;
  }

  // 3. Floating Sprinkles generated deterministically per seed with orbital offsets
  const numSprinkles = rng.number(3, 7);
  const sprinkles = [];

  for (let i = 0; i < numSprinkles; i++) {
    const baseX = rng.number(15, 85);
    const baseY = rng.number(15, 85);
    const radius = rng.number(2, 5);
    const phaseOffset = i * (Math.PI / 3);

    // Circular floating motion around base position
    const offsetX = Math.cos(loopAngle + phaseOffset) * 6;
    const offsetY = Math.sin(loopAngle + phaseOffset) * 6;

    sprinkles.push(
      `<circle cx="${baseX + offsetX}" cy="${baseY + offsetY}" r="${radius}" fill="${shapeColor}" opacity="0.85" />`
    );
  }

  const svgDiagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="${fillStyle}" rx="${options.radius ?? 20}"/>
      
      <!-- Random Tile Grid with Oscillating Rotations -->
      <g class="tile-grid">
        ${gridTiles.join('')}
      </g>

      <!-- Dynamic Seeded Overlay (Wave, Random Strokes, or Pulsing Ring) -->
      <g class="overlay">
        ${overlayElement}
      </g>

      <!-- Floating Animated Sprinkles -->
      <g class="sprinkles">
        ${sprinkles.join('')}
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