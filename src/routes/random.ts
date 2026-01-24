import { Router } from "express";

const router = Router();

router.get("/number", (req, res) => {
  let min = 0;
  let max = 100;
  if (req.query.min) min = Number(req.query.min);
  if (req.query.max) max = Number(req.query.max);
  const rawQuery = req.url.split("?")[1];
  if (rawQuery && !req.query.max && !req.query.min) {
    const parsed = Number(rawQuery);
    if (!isNaN(parsed)) max = parsed;
  }
  if (min > max) [min, max] = [max, min];
  res.json({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  });
});
router.get("/string", (req, res) => {
  const length = Number(req.query.length) || 10;
  const charset =
    (req.query.charset as string) ||
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }

  res.json({
    value: result,
  });
});
export default router;
