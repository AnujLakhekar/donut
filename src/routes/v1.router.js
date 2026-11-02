// src/routes/v1.router.js
import express from "express";
import { renderFormat } from "../formats/rasterizer.js";
import { generateAvatar } from "../v1/generators/AvatarGenerator.js";
import { generateInitialsAvatar } from "../v1/generators/initialsGenerator.js";
import { generateGlyphsAvatar } from "../v1/generators/glyphsGenerator.js";

const v1Router = express.Router();

v1Router.get("/:style/:filename", async (req, res) => {
  try {
    const { style, filename } = req.params;

    const match = filename.match(/^(.+)\.(svg|png|json)$/i);
    const seed = match ? match[1] : filename;
    const format = match ? match[2].toLowerCase() : "svg";

    let avatarJson;

    if (style === "initials") {
      avatarJson = generateInitialsAvatar({
        seed,
        options: {
          palette: req.query.palette,
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          textColor: req.query.textColor
            ? `#${req.query.textColor}`
            : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
          fontSize: req.query.fontSize ? Number(req.query.fontSize) : undefined,
          fontWeight: req.query.fontWeight,
          fontFamily: req.query.fontFamily,
          text: req.query.text,
        },
      });
    } else if (style === "glyphs") {
      avatarJson = generateGlyphsAvatar({ seed, options: req.query });
    } else {
      avatarJson = generateAvatar({
        styleName: style,
        seed,
        options: {
          bg: req.query.bg ? `#${req.query.bg}` : undefined,
          radius: req.query.radius ? Number(req.query.radius) : undefined,
          flip: req.query.flip,
          rotate: req.query.rotate ? Number(req.query.rotate) : 0,
          scale: req.query.scale ? Number(req.query.scale) : 1,
          translateY: req.query.translateY ? Number(req.query.translateY) : 0,
          topVariant: req.query.topVariant,
        },
      });
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

export default v1Router;
