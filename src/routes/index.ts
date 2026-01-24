import { Router } from "express";
import utils from "./utils.js";
import random from "./random.js";
import status from "./status.js";
import text from "./text.js";
import math from "./math.js";
import time from "./time.js";
import color from "./color.js";
import convert from "./convert.js";
import mock from "./mock.js";
import encode from "./encode.js";

const router = Router();

router.use("/utils", utils);
router.use("/random", random);
router.use("/status", status);
router.use("/text", text);
router.use("/math", math);
router.use("/time", time);
router.use("/color", color);
router.use("/convert", convert);
router.use("/mock", mock);
router.use("/encode", encode);

export default router;