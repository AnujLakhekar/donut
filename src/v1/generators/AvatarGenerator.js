import { STYLES } from "../styles/index.js";
import { SeededRandom } from "./prng.js";

export function generateAvatar({
  styleName = "bottts",
  seed = "default",
  options = {},
}) {
  const style = STYLES[styleName] || STYLES.bottts;
  const rng = new SeededRandom(seed);
  
  // 1. Extract Options & Fallbacks
  const bg = options.bg || rng.pick(style.backgrounds);
  const bodyColor = options.bodyColors || rng.pick(style.bodyColors);
  
  // Transform Options
  const flip = options.flip ?? 'none'; // 'horizontal', 'vertical', 'both', or 'none'
  const rotate = options.rotate ?? 0;   // degrees, e.g. 10
  const scale = options.scale ?? 1;     // scale ratio, e.g. 0.9
  const translateY = options.translateY ?? 0; // percentage/px shift

  // 2. Select Hair/Top Variant (Weighted or Random)
  let topSvg = '';
  if (style.topVariants) {
    // If weights passed in options, use them; otherwise default to uniform selection
    const topKey = options.topVariant 
      ? rng.pickWeighted(options.topVariant) 
      : rng.pick(Object.keys(style.topVariants));
    topSvg = style.topVariants[topKey] || '';
  }

  const head = rng.pick(style.heads).replace(/{color}/g, bodyColor);
  const eyes = rng.pick(style.eyes);
  const mouth = rng.pick(style.mouths);

  // 3. Build Transform Matrix / CSS String
  // SVG coordinates center is (50, 50) for a 100x100 viewBox
  const scaleX = flip === 'horizontal' || flip === 'both' ? -scale : scale;
  const scaleY = flip === 'vertical' || flip === 'both' ? -scale : scale;
  
  const transformAttr = `
    translate(50 50)
    translate(0 ${translateY})
    rotate(${rotate})
    scale(${scaleX} ${scaleY})
    translate(-50 -50)
  `.replace(/\s+/g, ' ').trim();

  const headGroup = `<g id="head">${head}</g>`;
  const eyesGroup = `<g id="eyes">${eyes}</g>`;
  const mouthGroup = `<g id="mouth">${mouth}</g>`;
  const topGroup = topSvg ? `<g id="top">${topSvg}</g>` : '';

  return {
    seed,
    style: styleName,
    options: { flip, rotate, scale, translateY, topVariant: options.topVariant },
    layers: {
      head: headGroup,
      top: topGroup,
      eyes: eyesGroup,
      mouth: mouthGroup,
    },
    svg: {
      diagram: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
          <rect width="100" height="100" fill="${bg}" rx="${options.radius ?? 20}"/>
          <g id="transformed-avatar" transform="${transformAttr}">
            ${headGroup}
            ${topGroup}
            ${eyesGroup}
            ${mouthGroup}
          </g>
        </svg>
      `.trim(),
    },
  };
}