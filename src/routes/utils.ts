import { Router } from "express";
import { v4 as uuid } from "uuid";
import { generatePassword } from "../lib/password.js";
import { hash, verifyHash } from "../lib/hash.js";
import { encode, decode } from "../lib/base64.js";

const router = Router();

router.get("/uuid", (_, res) => {
  res.json({ uuid: uuid() });
});

router.get("/password", (req, res) => {
  const length = Number(req.query.length ?? 16);
  res.json({ password: generatePassword(length) });
});

router.post("/hash", (req, res) => {
  const { value } = req.body;
  if (!value) {
    return res.status(400).json({ error: "Missing value" });
  }
  res.json({ hash: hash(value) });
});

router.all("/hash", (req, res) => {
  res
    .status(405)
    .json({ error: "Method Not Allowed, send a post request instead." });
});

router.post("/verify-hash", (req, res) => {
  const { value, hashed } = req.body;
  if (!value || !hashed) {
    return res.status(400).json({ error: "Missing fields" });
  }
  res.json({ valid: verifyHash(value, hashed) });
});

router.get("/timestamp", (_, res) => {
  res.json({
    unix: Math.floor(Date.now() / 1000),
    iso: new Date().toISOString(),
  });
});

router.post("/base64/encode", (req, res) => {
  const { value } = req.body;
  if (!value) return res.status(400).json({ error: "Missing value" });
  res.json({ encoded: encode(value) });
});

router.post("/base64/decode", (req, res) => {
  const { value } = req.body;
  if (!value) return res.status(400).json({ error: "Missing value" });
  res.json({ decoded: decode(value) });
});

router.get("/ip", (req, res) => {
  res.json({ ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress });
});

export default router;
