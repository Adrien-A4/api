import { Router } from "express";

const router = Router();

router.get("/now", (req, res) => {
    res.json({ result: new Date().toISOString() });
});

router.get("/unix", (req, res) => {
    res.json({ result: Date.now() });
});

router.get("/iso", (req, res) => {
    const date = req.query.date ? new Date(String(req.query.date)) : new Date();
    res.json({ result: date.toISOString() });
});

router.get("/is-leap-year", (req, res) => {
    const year = Number(req.query.year) || new Date().getFullYear();
    res.json({ result: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 });
});

router.get("/days-in-month", (req, res) => {
    const year = Number(req.query.year) || new Date().getFullYear();
    const month = Number(req.query.month); // 1-12
    if (!month || month < 1 || month > 12) return res.status(400).json({ error: "Invalid month (1-12)" });
    res.json({ result: new Date(year, month, 0).getDate() });
});

router.get("/day-of-year", (req, res) => {
    const date = req.query.date ? new Date(String(req.query.date)) : new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    res.json({ result: Math.floor(diff / oneDay) });
});

router.get("/week-of-year", (req, res) => {
    const date = req.query.date ? new Date(String(req.query.date)) : new Date();
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    res.json({ result: Math.ceil((days + start.getDay() + 1) / 7) });
});

router.post("/add", (req, res) => {
    const { date, amount, unit } = req.body;
    const d = date ? new Date(date) : new Date();
    const val = Number(amount) || 0;
    
    switch(unit) {
        case 'days': d.setDate(d.getDate() + val); break;
        case 'hours': d.setHours(d.getHours() + val); break;
        case 'minutes': d.setMinutes(d.getMinutes() + val); break;
        case 'seconds': d.setSeconds(d.getSeconds() + val); break;
        case 'years': d.setFullYear(d.getFullYear() + val); break;
        default: return res.status(400).json({ error: "Invalid unit (days, hours, minutes, seconds, years)" });
    }
    res.json({ result: d.toISOString() });
});

router.post("/subtract", (req, res) => {
    const { date, amount, unit } = req.body;
    const d = date ? new Date(date) : new Date();
    const val = Number(amount) || 0;
    
    switch(unit) {
        case 'days': d.setDate(d.getDate() - val); break;
        case 'hours': d.setHours(d.getHours() - val); break;
        case 'minutes': d.setMinutes(d.getMinutes() - val); break;
        case 'seconds': d.setSeconds(d.getSeconds() - val); break;
        case 'years': d.setFullYear(d.getFullYear() - val); break;
        default: return res.status(400).json({ error: "Invalid unit (days, hours, minutes, seconds, years)" });
    }
    res.json({ result: d.toISOString() });
});

router.get("/diff", (req, res) => {
    const d1 = req.query.d1 ? new Date(String(req.query.d1)) : new Date();
    const d2 = req.query.d2 ? new Date(String(req.query.d2)) : new Date();
    res.json({ result: Math.abs(d1.getTime() - d2.getTime()) });
});

export default router;
