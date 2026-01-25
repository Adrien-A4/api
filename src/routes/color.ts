import { Router } from "express";

const router = Router();

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result?.[1] ?? "0", 16),
        g: parseInt(result?.[2] ?? "0", 16),
        b: parseInt(result?.[3] ?? "0", 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

router.get("/random", (req, res) => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  res.json({ result: "#" + color });
});

router.get("/hex-to-rgb", (req, res) => {
  const hex = String(req.query.hex);
  const rgb = hexToRgb(hex);
  if (!rgb) return res.status(400).json({ error: "Invalid hex" });
  res.json({ result: rgb });
});

router.get("/rgb-to-hex", (req, res) => {
  const r = Number(req.query.r);
  const g = Number(req.query.g);
  const b = Number(req.query.b);
  if ([r, g, b].some((x) => isNaN(x) || x < 0 || x > 255))
    return res.status(400).json({ error: "Invalid rgb values" });
  res.json({ result: rgbToHex(r, g, b) });
});

router.get("/rgb-to-hsl", (req, res) => {
  let r = Number(req.query.r) / 255;
  let g = Number(req.query.g) / 255;
  let b = Number(req.query.b) / 255;

  if ([r, g, b].some((x) => isNaN(x)))
    return res.status(400).json({ error: "Invalid rgb values" });

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  res.json({
    result: {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    },
  });
});

router.get("/is-light", (req, res) => {
  const hex = String(req.query.hex);
  const rgb = hexToRgb(hex);
  if (!rgb) return res.status(400).json({ error: "Invalid hex" });
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  res.json({ result: yiq >= 128 });
});

router.get("/is-dark", (req, res) => {
  const hex = String(req.query.hex);
  const rgb = hexToRgb(hex);
  if (!rgb) return res.status(400).json({ error: "Invalid hex" });
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  res.json({ result: yiq < 128 });
});

router.get("/invert", (req, res) => {
  const hex = String(req.query.hex);
  const rgb = hexToRgb(hex);
  if (!rgb) return res.status(400).json({ error: "Invalid hex" });
  res.json({ result: rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b) });
});

router.get("/grayscale", (req, res) => {
  const hex = String(req.query.hex);
  const rgb = hexToRgb(hex);
  if (!rgb) return res.status(400).json({ error: "Invalid hex" });
  const avg = Math.round((rgb.r + rgb.g + rgb.b) / 3);
  res.json({ result: rgbToHex(avg, avg, avg) });
});

export default router;
