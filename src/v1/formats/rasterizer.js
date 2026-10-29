import { Resvg } from "@resvg/resvg-js";

export function renderFormat(json, format = "svg", size = 256) {
  if (format === "json") {
    return {
      buffer: Buffer.from(JSON.stringify(json, null, 2)),
      mime: "application/json",
    };
  }

  const svgString = json.svg.diagram;

  if (format === "svg") {
    return { 
      buffer: Buffer.from(svgString), 
      mime: "image/svg+xml" 
    };
  }

  if (format === "png") {
    const resvg = new Resvg(svgString, {
      fitTo: { mode: "width", value: Number(size) },
    });
    const pngBuffer = resvg.render().asPng();
    return { 
      buffer: pngBuffer, 
      mime: "image/png" 
    };
  }

  throw new Error(`Unsupported format: ${format}`);
}