
export const pixelStyle = {
  backgrounds: ['#2A2A2A', '#1E3A8A', '#064E3B', '#831843'],
  bodyColors: ['#F87171', '#60A5FA', '#34D399', '#FBBF24'],
  heads: [
    // 8-bit Block Head
    `<rect x="20" y="20" width="60" height="60" fill="{color}"/>
     <rect x="30" y="10" width="40" height="10" fill="{color}"/>`
  ],
  eyes: [
    // Pixel eyes with highlights
    `<rect x="30" y="35" width="10" height="10" fill="#000"/>
     <rect x="60" y="35" width="10" height="10" fill="#000"/>
     <rect x="32" y="37" width="4" height="4" fill="#FFF"/>
     <rect x="62" y="37" width="4" height="4" fill="#FFF"/>`,
    // Sunglasses pixel grid
    `<rect x="25" y="35" width="50" height="12" fill="#111"/>
     <rect x="30" y="47" width="10" height="5" fill="#111"/>
     <rect x="60" y="47" width="10" height="5" fill="#111"/>`
  ],
  mouths: [
    // Pixel mouth line
    `<rect x="40" y="65" width="20" height="5" fill="#000"/>`,
    // Open pixel mouth
    `<rect x="35" y="60" width="30" height="10" fill="#000"/>
     <rect x="40" y="65" width="20" height="5" fill="#EF4444"/>`
  ]
};