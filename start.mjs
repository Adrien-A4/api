import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));

async function start() {
  try {
    await import("./src/server.ts");
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

start();
