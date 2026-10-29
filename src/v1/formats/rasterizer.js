// src/v1/formats/rasterizer.js
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import resvgWasmModule from '@resvg/resvg-wasm/index_bg.wasm';

let wasmInitialized = false;

async function ensureWasmInitialized() {
  if (!wasmInitialized) {
    await initWasm(resvgWasmModule);
    wasmInitialized = true;
  }
}

export async function renderFormat(json, format = "svg", size = 256) {
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
    // Initialize WASM before rendering
    await ensureWasmInitialized();

    const resvg = new Resvg(svgString, {
      fitTo: { mode: "width", value: Number(size) },
    });
    const pngData = resvg.render();
    const pngBuffer = Buffer.from(pngData.asPng());

    return { 
      buffer: pngBuffer, 
      mime: "image/png" 
    };
  }

  throw new Error(`Unsupported format: ${format}`);
}