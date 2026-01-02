import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(201).json({ message: "got dishes based on a filter" });
});

router.get("/:id", (req, res) => {
  res.status(201).json({ message: "got a dish" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "created a dish" });
});

router.patch("/:id", (req, res) => {
  res.status(201).json({ message: "partially updated a dish " });
});

router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "deleted a dish" });
});

export default router;
