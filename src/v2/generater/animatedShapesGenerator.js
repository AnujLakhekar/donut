// src/v2/generater/animatedShapesGenerator.js
import { generateShapesAvatar } from "../../v1/generators/shapesGenerator.js";

export function generateAnimatedShapesFrames({ seed, options = {}, totalFrames = 12 }) {
  const frames = [];

  for (let i = 0; i < totalFrames; i++) {
    const avatar = generateShapesAvatar({
      seed,
      options: {
        ...options,
        frameIndex: i,
        totalFrames,
        progress: i / totalFrames, // 0.0 to 1.0 (useful for smooth sin/cos loops)
      },
    });

    frames.push(avatar.svg.diagram);
  }

  return frames;
}