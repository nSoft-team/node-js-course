import express, { NextFunction, Request, Response } from "express";
import GiftModel from "../03-models/gift-model";
import logic from "../05-logic/logic";

const router = express.Router();

router.get(
  "/targets",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const targets = await logic.getAllTargets();
      response.json(targets);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/gifts-by-target/:targetId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const targetId = +request.params.targetId;
      const gifts = await logic.getGiftsByTarget(targetId);
      response.json(gifts);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/gifts",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const gift = new GiftModel(request.body);
      const addedGift = await logic.addGift(gift);
      response.status(201).json(addedGift);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
