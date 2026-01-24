import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  res.json({ message: "Adrien's API is up and running!" });
});
app.use((req, res, next) => {
  res.status(404).json({ error: "Bad Request, try another endpoint." });
});
export default app;
