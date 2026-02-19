import express from "express";
import routes from "./routes/index.js";
import path from "path";
import favicon from "serve-favicon";
const app = express();
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  res.json({ message: "Adrien's API is up and running!" });
});
const __dirname = path.resolve();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use((req, res, next) => {
  res.status(404).json({ error: "Bad Request, try another endpoint." });
});
export default app;
