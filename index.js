// server.js
import express from "express";
import { renderFormat } from "./src/v1/formats/rasterizer.js";
import { generateAvatar } from "./src/v1/generator/generator.js";

const app = express();

app.get("/v1/:style/:filename", async (req, res) => {
  try {
    const { style, filename } = req.params;

    const match = filename.match(/^(.+)\.(svg|png|json)$/i);
    const seed = match ? match[1] : filename;
    const format = match ? match[2].toLowerCase() : "svg";

    // Parse options from query strings
    // Express automatically parses ?topVariant[short01]=2 into req.query.topVariant
    const avatarJson = generateAvatar({
      styleName: style,
      seed,
      options: {
        bg: req.query.bg ? `#${req.query.bg}` : undefined,
        radius: req.query.radius ? Number(req.query.radius) : undefined,

        // Transform options
        flip: req.query.flip, // 'horizontal' | 'vertical' | 'both'
        rotate: req.query.rotate ? Number(req.query.rotate) : 0,
        scale: req.query.scale ? Number(req.query.scale) : 1,
        translateY: req.query.translateY ? Number(req.query.translateY) : 0,

        // Variant weights object
        topVariant: req.query.topVariant ? req.query.topVariant : undefined,
      },
    });

    const size = req.query.size || 256;
    const { buffer, mime } = renderFormat(avatarJson, format, size);

    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Avatar Generator API</title>
        <style>body { font-family: sans-serif; text-align: center; padding: 2rem; }</style>
      </head>
      <body>
        <h1>Avatar Generator API</h1>
        <p>An open-source JavaScript avatar generation API.</p>
        <h2>Usage Example</h2>
        <code>GET /v1/bottts/eyeman.svg</code><br><br>
        <img src="/v1/bottts/eyeman.svg" width="150" />
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Avatar API running at http://localhost:3000");
});
