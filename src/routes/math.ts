import { Router } from "express";

const router = Router();

router.get("/add", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  res.json({ result: a + b });
});

router.get("/subtract", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  res.json({ result: a - b });
});

router.get("/multiply", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  res.json({ result: a * b });
});

router.get("/divide", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  if (b === 0) return res.status(400).json({ error: "Cannot divide by zero" });
  res.json({ result: a / b });
});

router.get("/power", (req, res) => {
  const base = Number(req.query.base);
  const exponent = Number(req.query.exponent);
  if (isNaN(base) || isNaN(exponent))
    return res.status(400).json({ error: "base and exponent must be numbers" });
  res.json({ result: Math.pow(base, exponent) });
});

router.get("/sqrt", (req, res) => {
  const value = Number(req.query.value);
  if (isNaN(value))
    return res.status(400).json({ error: "value must be a number" });
  if (value < 0)
    return res.status(400).json({ error: "Cannot sqrt negative number" });
  res.json({ result: Math.sqrt(value) });
});

router.get("/factorial", (req, res) => {
  const n = Number(req.query.n);
  if (isNaN(n) || n < 0)
    return res.status(400).json({ error: "n must be a non-negative number" });
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  res.json({ result });
});

router.get("/fibonacci", (req, res) => {
  const n = Number(req.query.n);
  if (isNaN(n) || n < 0)
    return res.status(400).json({ error: "n must be a non-negative number" });
  const seq = [0, 1];
  for (let i = 2; i < n; i++)
    seq.push((seq?.[i - 1] ?? 0) + (seq?.[i - 2] ?? 0));
  res.json({ result: seq.slice(0, n) });
});

router.get("/is-prime", (req, res) => {
  const n = Number(req.query.n);
  if (isNaN(n)) return res.status(400).json({ error: "n must be a number" });
  if (n < 2) return res.json({ result: false });
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return res.json({ result: false });
  }
  res.json({ result: true });
});

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
router.get("/gcd", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  res.json({ result: gcd(a, b) });
});

router.get("/lcm", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: "a and b must be numbers" });
  res.json({ result: (a * b) / gcd(a, b) });
});

router.post("/mean", (req, res) => {
  const { numbers } = req.body;
  if (!Array.isArray(numbers))
    return res.status(400).json({ error: "numbers must be an array" });
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  res.json({ result: sum / numbers.length });
});

router.post("/median", (req, res) => {
  const { numbers } = req.body;
  if (!Array.isArray(numbers))
    return res.status(400).json({ error: "numbers must be an array" });
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  res.json({
    result:
      sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2,
  });
});

router.post("/mode", (req, res) => {
  const { numbers } = req.body;
  if (!Array.isArray(numbers))
    return res.status(400).json({ error: "numbers must be an array" });
  const counts: Record<number, number> = {};
  numbers.forEach((n) => (counts[n] = (counts[n] || 0) + 1));
  const maxFreq = Math.max(...Object.values(counts));
  const modes = Object.keys(counts)
    .filter((k) => counts[Number(k)] === maxFreq)
    .map(Number);
  res.json({ result: modes });
});

router.get("/percent", (req, res) => {
  const value = Number(req.query.value);
  const total = Number(req.query.total);
  if (isNaN(value) || isNaN(total))
    return res.status(400).json({ error: "value and total must be numbers" });
  res.json({ result: (value / total) * 100 });
});

router.get("/circle/area", (req, res) => {
  const r = Number(req.query.r);
  if (isNaN(r)) return res.status(400).json({ error: "r must be a number" });
  res.json({ result: Math.PI * r * r });
});

router.get("/circle/circumference", (req, res) => {
  const r = Number(req.query.r);
  if (isNaN(r)) return res.status(400).json({ error: "r must be a number" });
  res.json({ result: 2 * Math.PI * r });
});

export default router;
