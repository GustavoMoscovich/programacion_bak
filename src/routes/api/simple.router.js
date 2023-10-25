import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    let total = 1;
    for (let i = 1; i < 100; i++) {
      total = i * i;
    }
    return res.status(200).send({ total });
  });

export default router;
