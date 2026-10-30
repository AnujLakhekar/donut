// src/v1/styles/shapes.js
export const SHAPES_ASSETS = {
  // SVG path segments aligned to tile borders
  tiles: [
    // Corner curves
    `<path d="M0 25 A25 25 0 0 1 25 0 M50 25 A25 25 0 0 1 25 50" stroke="{color}" stroke-width="12" stroke-linecap="round" fill="none"/>`,
    // Straight dual crossings
    `<path d="M0 25 H50 M25 0 V50" stroke="{color}" stroke-width="12" stroke-linecap="round" fill="none"/>`,
    // Loop arc curves
    `<path d="M0 25 C15 25 25 15 25 0 M25 50 C25 35 35 25 50 25" stroke="{color}" stroke-width="12" stroke-linecap="round" fill="none"/>`
  ],
  palettes: {
    sepia: {
      backgrounds: ['#5C4033', '#4A3525', '#6E4D3B', '#3E2A1E'],
      shapeColors: ['#E8D8C8', '#D4C3B3', '#F5E6D3']
    },
    greyscale: {
      backgrounds: ['#3A3A3A', '#4A4A4A', '#5A5A5A', '#2A2A2A'],
      shapeColors: ['#E0E0E0', '#CCCCCC', '#111111']
    },
    duotone: {
      backgrounds: ['#2E335A'],
      shapeColors: ['#9AA5FF']
    },
    muted: {
      backgrounds: ['#A0B0C0', '#C49A82', '#8EA08A', '#7A8068'],
      shapeColors: ['#1A2530', '#3D1F10', '#183015', '#1F2418']
    },
    electric: {
      backgrounds: ['#D000FF', '#FF0055', '#00FF00', '#00D8FF'],
      shapeColors: ['#000000', '#FFFFFF']
    },
    pastelWall: {
      backgrounds: ['#E8F0E6', '#EAF5EA', '#F3E8F5', '#E6EEF8'],
      shapeColors: ['#4A5D4E', '#5A465C', '#3E4D5E']
    },
    boldPop: {
      backgrounds: ['#3AAFA9', '#2B7A78', '#A270E3', '#2A75D3'],
      shapeColors: ['#042825', '#2E0A52', '#031B38']
    },
    sunrise: {
      gradients: [
        { id: 'sun1', colors: ['#FF9A9E', '#FECFEF'] },
        { id: 'sun2', colors: ['#FEE140', '#FA709A'] }
      ],
      shapeColors: ['#6B2A2A', '#802B33']
    },
    stencil: {
      backgrounds: ['#1E1E24'],
      shapeColors: ['#8B8C89', '#C2C2C2']
    }
  }
};