import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "got all menus for a restuarant" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "got a specific menu" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "posted a menu" });
});

router.patch("/:id", (req, res) => {
  res.status(201).json({ message: "partially updated a menu" });
});

router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "deleted a menu" });
});

export default router;
