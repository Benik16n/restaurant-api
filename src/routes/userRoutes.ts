import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.status(201).json({ message: "got a user" });
});

router.patch("/:id", (req, res) => {
  res.status(201).json({ message: "updated a users password" });
});

router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "deleted a user" });
});

export default router;
