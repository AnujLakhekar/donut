// src/v2/formatter/gifEncoder.js
import gifenc from "gifenc";
import { Resvg } from "@resvg/resvg-js";

const { GIFEncoder, quantize, applyPalette } = gifenc;

export async function createAnimatedGif(
  svgFrames,
  width = 256,
  height = 256,
  delay = 100,
) {
  const gif = GIFEncoder();

  for (const svg of svgFrames) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: width },
    });

    const rendered = resvg.render();
    const rgba = rendered.pixels;

    const palette = quantize(rgba, 256);
    const index = applyPalette(rgba, palette);

    gif.writeFrame(index, width, height, {
      palette,
      delay,
    });
  }

  gif.finish();
  return Buffer.from(gif.bytes());
}
