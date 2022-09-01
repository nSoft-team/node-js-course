import express, { NextFunction, Request, Response } from "express";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import productsController from "./06-controllers/products-controller";

const server = express();

server.use(express.json());
server.use("/api", productsController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
  next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(3001, () => console.log("Listening..."));
