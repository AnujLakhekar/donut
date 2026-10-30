import express from "express";
import { renderFormat } from "../v1/formats/rasterizer.js";
import { generateAvatar } from "../v1/generators/AvatarGenerator.js";
import { generateInitialsAvatar } from "../v1/generators/initialsGenerator.js";
import { generateShapesAvatar } from "../v1/generators/shapesGenerator.js";
import { generatePanesAvatar } from "../v1/generators/panesGenerator.js";

import { middleware } from "../middlewares/api.middleware.js";

const router = express.Router();

router.get("/v1/:style/:filename", middleware, async (req, res) => {
  try {
    const { style, filename } = req.params;

    const match = filename.match(/^(.+)\.(svg|png|json)$/i);
    const seed = match ? match[1] : filename;
    const format = match ? match[2].toLowerCase() : "svg";

    let avatarJson;

    // Route dynamically based on requested style
    if (style === "initials") {
      avatarJson = generateInitialsAvatar({
        seed,
        options: {
          palette: req.query.palette, // e.g., sepia, electric, sunrise
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          textColor: req.query.textColor
            ? `#${req.query.textColor}`
            : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
          fontSize: req.query.fontSize ? Number(req.query.fontSize) : undefined,
          fontWeight: req.query.fontWeight,
          fontFamily: req.query.fontFamily,
          text: req.query.text, // Optional custom override text
        },
      });
    } else if (style === "shapes") {
      avatarJson = generateShapesAvatar({
        seed,
        options: {
          palette: req.query.palette, // e.g., sepia, electric, sunrise, stencil
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
          palette: req.query.palette, // e.g. sepia, duotone, electric, sunrise
          blur: req.query.blur ? Number(req.query.blur) : undefined,
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
        },
      });
    } else {
      avatarJson = generateAvatar({
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
    }

    const size = req.query.size || 256;

    // Await renderFormat to support both WASM and native rasterization engines
    const { buffer, mime } = renderFormat(avatarJson, format, size);

    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
