import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/logic";

const router = express.Router();

// DONT FORGET TO WRITE THE CORRECT PATH
router.get(
  "",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
