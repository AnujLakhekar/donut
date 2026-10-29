import { Resvg } from "@resvg/resvg-js";

export function renderFormat(json, format = "svg", size = 256) {
  if (format == "json") return json;
  if (format === "svg")
    return { buffer: Buffer.from(json.svg.diagram), mime: "image/svg+xml" };
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: Number(size) },
  });

  if (format === "png") {
    const pngBuffer = resvg.render().asPng();
    return { buffer: pngBuffer, mime: "image/png" };
  }

  throw new Error(`Unsupported format: ${format}`);
}
