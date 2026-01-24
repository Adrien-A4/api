import { Router } from "express";

const router = Router();

router.post("/base64/encode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: Buffer.from(text).toString("base64") });
});

router.post("/base64/decode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: Buffer.from(text, "base64").toString("utf-8") });
});

router.post("/url/encode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: encodeURIComponent(text) });
});

router.post("/url/decode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: decodeURIComponent(text) });
});

router.post("/hex/encode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: Buffer.from(text).toString("hex") });
});

router.post("/hex/decode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: Buffer.from(text, "hex").toString("utf-8") });
});

router.post("/binary/encode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    res.json({ result: text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ') });
});

router.post("/binary/decode", (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string") return res.status(400).json({ error: "text is required" });
    const result = text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
    res.json({ result });
});

export default router;
