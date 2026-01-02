import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(201).json({ message: "got all the reviews" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "created a review" });
});

router.patch("/:id", (req, res) => {
  res.status(201).json({ message: "partially updated a review" });
});

router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "deleted a review" });
});

export default router;
