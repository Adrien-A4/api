import { Router } from "express";

const router = Router();

router.get("/c-to-f", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: (val * 9/5) + 32 });
});

router.get("/f-to-c", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: (val - 32) * 5/9 });
});

router.get("/km-to-miles", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * 0.621371 });
});

router.get("/miles-to-km", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val / 0.621371 });
});

router.get("/kg-to-lbs", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * 2.20462 });
});

router.get("/lbs-to-kg", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val / 2.20462 });
});

router.get("/cm-to-in", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * 0.393701 });
});

router.get("/in-to-cm", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val / 0.393701 });
});

router.get("/l-to-gal", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * 0.264172 });
});

router.get("/gal-to-l", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val / 0.264172 });
});

router.get("/mb-to-gb", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val / 1024 });
});

router.get("/gb-to-mb", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * 1024 });
});

router.get("/deg-to-rad", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * (Math.PI / 180) });
});

router.get("/rad-to-deg", (req, res) => {
    const val = Number(req.query.value);
    if (isNaN(val)) return res.status(400).json({ error: "value must be a number" });
    res.json({ result: val * (180 / Math.PI) });
});

export default router;
