import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res
    .status(201)
    .json({ message: "got a restaurant based on search and filters" });
});

router.get("/:id", (req, res) => {
  res.status(201).json({ message: "got a restaurant" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "created a restaurant" });
});

router.patch("/:id", (req, res) => {
  res.status(201).json({ message: "partially updated a restaurant" });
});

router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "deleted a restaurant" });
});

export default router;
