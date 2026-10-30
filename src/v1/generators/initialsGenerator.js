// src/v1/generator/initialsGenerator.js
import { PALETTES } from '../styles/initials.js';
import { SeededRandom } from './prng.js';

// Helper to extract 1-2 letter initials from a seed/name
function getInitials(seed) {
  const words = seed.trim().split(/[\s_\-+.]+/).filter(Boolean);
  if (words.length === 0) return 'DA';
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function generateInitialsAvatar({ seed = 'John Doe', options = {} }) {
  const rng = new SeededRandom(seed);
  const paletteName = options.palette || 'sepia';
  const palette = PALETTES[paletteName] || PALETTES.sepia;

  const text = options.text || getInitials(seed);
  const fontSize = options.fontSize || 42;
  const fontFamily = options.fontFamily || 'Inter, -apple-system, sans-serif';
  const fontWeight = options.fontWeight || '600';

  let backgroundDef = '';
  let fillStyle = '';

  // Handle Gradients vs Solid Backgrounds
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

  const textColor = options.textColor || rng.pick(palette.textColors);

  const svgDiagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      ${backgroundDef}
      <rect width="100" height="100" fill="${fillStyle}" rx="${options.radius ?? 16}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="central" 
        text-anchor="middle" 
        fill="${textColor}" 
        font-family="${fontFamily}" 
        font-size="${fontSize}" 
        font-weight="${fontWeight}"
      >${text}</text>
    </svg>
  `.trim();

  return {
    seed,
    style: 'initials',
    palette: paletteName,
    text,
    svg: { diagram: svgDiagram }
  };
}