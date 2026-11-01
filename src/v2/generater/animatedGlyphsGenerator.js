// src/v2/generator/animatedGlyphsGenerator.js
import { generateGlyphsAvatar } from "../../v1/generators/glyphsGenerator.js";

export function generateAnimatedGlyphsFrames({ seed, options = {}, totalFrames = 12 }) {
  const frames = [];

  for (let i = 0; i < totalFrames; i++) {
    const avatar = generateGlyphsAvatar({
      seed,
      options: {
        ...options,
        progress: i / totalFrames, // 0.0 to 1.0
      },
    });

    frames.push(avatar.svg.diagram);
  }

  return frames;
}