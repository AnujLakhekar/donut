// src/routes/v2.router.js
import express from "express";
import { renderFormat } from "../formats/rasterizer.js";
import { generateShapesAvatar } from "../v1/generators/shapesGenerator.js";
import { generatePanesAvatar } from "../v1/generators/panesGenerator.js";
import { generateAnimatedShapesFrames } from "../v2/generater/animatedShapesGenerator.js";
import { generateAnimatedGlyphsFrames } from "../v2/generater/animatedGlyphsGenerator.js";
import { generateGlyphsAvatar } from "../v1/generators/glyphsGenerator.js";

const v2Router = express.Router();

v2Router.get("/:style/:filename", async (req, res) => {
  try {
    const { style, filename } = req.params;

    const match = filename.match(/^(.+)\.(svg|png|gif|json)$/i);
    const seed = match ? match[1] : filename;
    const format = match ? match[2].toLowerCase() : "svg";

    // Dedicated Animated GIF handling
    if (format === "gif" || req.query.animated === "true") {
      const frames = generateAnimatedShapesFrames({
        seed,
        options: { palette: req.query.palette },
        totalFrames: 8,
      });

      const { buffer, mime } = await renderFormat(
        { frames },
        "gif",
        req.query.size || 256,
      );

      res.setHeader("Content-Type", mime);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.send(buffer);
    }

    let avatarJson;

    if (style === "shapes") {
      avatarJson = generateShapesAvatar({
        seed,
        options: {
          palette: req.query.palette,
          animated:
            req.query.animated === "true" || req.query.palette === "animated",
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
        },
      });
    } else if (style === "panes" || style === "glass") {
      avatarJson = generatePanesAvatar({
        seed,
        options: {
          palette: req.query.palette,
          blur: req.query.blur ? Number(req.query.blur) : undefined,
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
        },
      });
    } else if (style === "glyphs") {
      if (format === "gif" || req.query.animated === "true") {
        const frames = generateAnimatedGlyphsFrames({
          seed,
          options: req.query,
          totalFrames: 12,
        });
        const { buffer, mime } = await renderFormat(
          { frames },
          "gif",
          req.query.size || 256,
        );
        res.setHeader("Content-Type", mime);
        return res.send(buffer);
      }

      avatarJson = generateGlyphsAvatar({ seed, options: req.query });
    } else {
      return res
        .status(404)
        .json({ error: `Style '${style}' not supported on v2 API.` });
    }

    const size = req.query.size || 256;
    const { buffer, mime } = await renderFormat(avatarJson, format, size);

    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default v2Router;
