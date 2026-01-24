import { Router } from "express";

const router = Router();

function formatUptimeShort(totalSeconds: number) {
  let seconds = Math.floor(totalSeconds);

  const units = [
    { label: "y", value: 60 * 60 * 24 * 365 },
    { label: "d", value: 60 * 60 * 24 },
    { label: "h", value: 60 * 60 },
    { label: "m", value: 60 },
    { label: "s", value: 1 },
  ];

  const parts: string[] = [];

  for (const unit of units) {
    const amount = Math.floor(seconds / unit.value);
    if (amount > 0) {
      parts.push(`${amount}${unit.label}`);
      seconds %= unit.value;
    }
  }

  return parts.length ? parts.join(" ") : "0s";
}

router.get("/", (req, res) => {
  res.json({
    name: "Adrien's API",
    uptime: formatUptimeShort(process.uptime()),
    time: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;
