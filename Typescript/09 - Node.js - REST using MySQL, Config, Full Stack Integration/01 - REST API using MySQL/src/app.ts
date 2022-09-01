import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import productsController from "./06-controllers/products-controller";

const server = express();

server.use(cors()); // Enable CORS for any frontend
// server.use(cors({ origin: "http://localhost:3000" })); // Enable CORS only for this frontend
// server.use(cors({ origin: ["http://localhost:3000", "http://localhost:4200"] })); // Enable CORS only for those frontend

server.use(express.json());
server.use(expressFileUpload());
server.use("/api", productsController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
  next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));
