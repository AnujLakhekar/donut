// src/v1/styles/bottts.js
export const botttsStyle = {
  backgrounds: ['#E0F7FA', '#EDE7F6', '#FFF3E0', '#E8F5E9', '#FCE4EC'],
  bodyColors: ['#00ACC1', '#7E57C2', '#FF9800', '#4CAF50', '#EC407A'],
  heads: [
    // Square antenna head
    `<rect x="25" y="30" width="50" height="45" rx="8" fill="{color}"/>
     <rect x="46" y="15" width="8" height="15" fill="#555"/>
     <circle cx="50" cy="12" r="6" fill="#E91E63"/>`,
    // Rounded dome head
    `<path d="M20 70 V45 A30 30 0 0 1 80 45 V70 Z" fill="{color}"/>
     <line x1="50" y1="15" x2="50" y2="25" stroke="#555" stroke-width="4"/>
     <circle cx="50" cy="12" r="5" fill="#00E676"/>`
  ],
  eyes: [
    // Visor
    `<rect x="30" y="40" width="40" height="15" rx="4" fill="#1A237E"/>
     <circle cx="40" cy="47" r="3" fill="#00E5FF"/>
     <circle cx="60" cy="47" r="3" fill="#00E5FF"/>`,
    // Dual LED screens
    `<rect x="32" y="40" width="12" height="12" rx="2" fill="#212121"/>
     <rect x="56" y="40" width="12" height="12" rx="2" fill="#212121"/>
     <circle cx="38" cy="46" r="2" fill="#FFEB3B"/>
     <circle cx="62" cy="46" r="2" fill="#FFEB3B"/>`
  ],
  mouths: [
    // Speaker grill
    `<rect x="38" y="60" width="24" height="8" rx="2" fill="#424242"/>
     <line x1="42" y1="64" x2="58" y2="64" stroke="#FFF" stroke-width="2" stroke-dasharray="2 2"/>`,
    // Digital smile
    `<path d="M35 60 L45 68 L55 68 L65 60" stroke="#333" stroke-width="4" stroke-linecap="round" fill="none"/>`
  ]
};