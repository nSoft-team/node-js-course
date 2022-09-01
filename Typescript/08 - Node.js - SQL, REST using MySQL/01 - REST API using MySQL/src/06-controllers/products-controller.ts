import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/products-logic";

const router = express.Router();

router.get(
  "/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await logic.getAllProducts();
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/products/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const product = await logic.getOneProduct(id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
