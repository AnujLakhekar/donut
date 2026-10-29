// assets.js
export const ASSETS = {
  backgrounds: ['#FFD1DC', '#B19FFB', '#A0E7E5', '#FFAEBC'],
  heads: [
    `<circle cx="50" cy="50" r="35" fill="{color}"/>`,
    `<rect x="18" y="18" width="64" height="64" rx="16" fill="{color}"/>`
  ],
  headColors: ['#FFDBAC', '#F1C27D', '#E0AC69', '#8D5524'],
  eyes: [
    `<circle cx="38" cy="45" r="4" fill="#333"/><circle cx="62" cy="45" r="4" fill="#333"/>`,
    `<path d="M34 45 Q38 40 42 45 M58 45 Q62 40 66 45" stroke="#333" stroke-width="3" fill="none"/>`
  ],
  mouths: [
    `<path d="M40 65 Q50 75 60 65" stroke="#333" stroke-width="3" fill="none"/>`,
    `<line x1="42" y1="65" x2="58" y2="65" stroke="#333" stroke-width="3" stroke-linecap="round"/>`
  ]
};