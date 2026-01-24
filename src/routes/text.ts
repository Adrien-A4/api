import { Router } from "express";

const router = Router();

router.post("/reverse", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.split("").reverse().join("") });
});

router.post("/upper", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.toUpperCase() });
});

router.post("/lower", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.toLowerCase() });
});

router.post("/capitalize", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.charAt(0).toUpperCase() + text.slice(1) });
});

router.post("/camel", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, "");
  res.json({ result });
});

router.post("/snake", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('_');
  res.json({ result: result || text });
});

router.post("/kebab", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('-');
  res.json({ result: result || text });
});

router.post("/title", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  res.json({ result });
});

router.post("/sponge", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
  res.json({ result });
});

router.post("/trim", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.trim() });
});

router.post("/count/words", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.trim().split(/\s+/).length });
});

router.post("/count/chars", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  res.json({ result: text.length });
});

router.post("/slugify", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const result = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  res.json({ result });
});

router.post("/truncate", (req, res) => {
  const { text, length } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const len = Number(length) || 10;
  res.json({ result: text.length > len ? text.substring(0, len) + "..." : text });
});

router.post("/repeat", (req, res) => {
  const { text, count } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const c = Number(count) || 1;
  res.json({ result: text.repeat(c) });
});

router.post("/pad", (req, res) => {
  const { text, length, char } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
  const len = Number(length) || 10;
  const c = char ? String(char)[0] : " ";
  res.json({ result: text.padEnd(len, c) });
});

router.post("/replace", (req, res) => {
    const { text, find, replaceWith } = req.body;
    if (typeof text !== "string" || typeof find !== "string") return res.status(400).json({ error: "text and find are required" });
    const rep = replaceWith || "";
    res.json({ result: text.split(find).join(rep) });
});

export default router;
