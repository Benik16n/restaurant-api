import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { isTest } from "../env.ts";

const app = express();

app.use(helmet());
app.use(
  morgan("dev", {
    skip: () => isTest(),
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API running" });
});
export default app;
