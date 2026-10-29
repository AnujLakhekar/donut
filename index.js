// server.js
import express from 'express';
import { generateAvatar } from './src/v1/generator.js';
import { renderFormat } from './src/v1/formats/rasterizer.js';

const app = express();

// Route pattern: /v1/:style/:filename
// Examples:
//   GET /v1/bottts/john_doe.svg
//   GET /v1/pixel/world.png?size=512&bg=FF0000
app.get('/v1/:style/:filename', async (req, res) => {
  try {
    const { style, filename } = req.params;

    // Split filename into seed and extension (e.g., "john.png" -> seed: "john", ext: "png")
    const match = filename.match(/^(.+)\.(svg|png)$/i);
    const seed = match ? match[1] : filename;
    const format = match ? match[2].toLowerCase() : 'svg';

    // 1. Generate core SVG
    const svg = generateAvatar({
      styleName: style,
      seed,
      options: {
        bg: req.query.bg ? `#${req.query.bg}` : undefined,
        radius: req.query.radius,
      },
    });

    // 2. Convert to requested format and size
    const size = req.query.size || 256;
    const { buffer, mime } = renderFormat(svg, format, size);

    // 3. Send response with caching
    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(buffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Avatar API running at http://localhost:3000');
});