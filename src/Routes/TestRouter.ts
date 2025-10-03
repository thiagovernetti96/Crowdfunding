import { Router } from "express";

export const TestRouter = Router();

TestRouter.post('/', (req, res) => {
  res.json({ msg: "rota teste funcionando" });
});
