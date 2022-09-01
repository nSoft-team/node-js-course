import { ProductModel } from "../03-models/product-model";
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
  "/products/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      const product = await logic.getOneProduct(_id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const product = new ProductModel(request.body);
      const addedProduct = await logic.addProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  "/products/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body._id = request.params._id;
      const product = new ProductModel(request.body);
      const updatedProduct = await logic.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.patch(
  "/products/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body._id = request.params._id;
      const product = new ProductModel(request.body);
      const updatedProduct = await logic.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/products/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      await logic.deleteProduct(_id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

// --------------------------------

router.get(
  "/test-queries",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // const products = await logic.getPartialProducts();
      const products = await logic.getSomeProducts();

      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
