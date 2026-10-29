// src/v1/generator.js
import { STYLES } from "./styles/index.js";
import { SeededRandom } from "./prng.js";

export function generateAvatar({
  styleName = "bottts",
  seed = "default",
  options = {},
}) {
  const style = STYLES[styleName] || STYLES.bottts;
  const rng = new SeededRandom(seed);
  const bg = options.bg || rng.pick(style.backgrounds);
  const bodyColor = options.bodyColors || rng.pick(style.bodyColors);
  const head = rng.pick(style.heads).replace("{color}", bodyColor);
  const eyes = rng.pick(style.eyes);
  const mouth = rng.pick(style.mouths);
  const Json = {
    seed: seed,
    style: style,
    svg: {
      diagram:
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="${bg}" rx="${options.radius ?? 20}"/>
      <g id="head">${head}</g>
      <g id="eyes">${eyes}</g>
      <g id="mouth">${mouth}</g>
    </svg>`.trim(),
    },
    head: `<g id="head">${head}</g>`,
    eyes: `<g id="eyes">${eyes}</g>`,
    mouth: `<g id="mouth">${mouth}</g>`,
  };
}
