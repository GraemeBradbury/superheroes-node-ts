import express from "express";
import { battle } from "./battle";

const app = express();

app.get("/battle", async (req, res) => {
  if (
    typeof req.query.hero === "string" &&
    typeof req.query.villain === "string"
  ) {
    const result = await battle(req.query.hero, req.query.villain);
    res.send(result);
    return;
  }

  res.send(400);
});

export default app;
