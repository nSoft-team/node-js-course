import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import controller from "./06-controllers/controllers";

const server = express();

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use("/api", controller);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
  next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));
