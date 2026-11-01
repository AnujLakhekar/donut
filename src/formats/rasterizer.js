// src/v1/formats/rasterizer.js
import { Resvg } from "@resvg/resvg-js";
import { createAnimatedGif } from "../v2/formatter/gifEncoder.js";

export async function renderFormat(json, format = "svg", size = 256) {
  if (format === "json") {
    return {
      buffer: Buffer.from(JSON.stringify(json, null, 2)),
      mime: "application/json",
    };
  }

  const svgString = typeof json === "string" ? json : json?.svg?.diagram;

  if (format === "svg") {
    return {
      buffer: Buffer.from(svgString),
      mime: "image/svg+xml",
    };
  }

  if (format === "png") {
    const resvg = new Resvg(svgString, {
      fitTo: { mode: "width", value: Number(size) },
    });
    const pngBuffer = resvg.render().asPng();

    return {
      buffer: pngBuffer,
      mime: "image/png",
    };
  }

  if (format === "gif") {
    const frames = json.frames || (svgString ? [svgString] : []);
    if (!frames.length) {
      throw new Error("No SVG frames provided for GIF generation.");
    }

    const gifBuffer = await createAnimatedGif(
      frames,
      Number(size),
      Number(size),
      100,
    );

    return {
      buffer: gifBuffer,
      mime: "image/gif",
    };
  }

  throw new Error(`Unsupported format: ${format}`);
}
