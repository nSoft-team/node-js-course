import express, { NextFunction, Request, Response } from "express";
import moviesController from "./controllers/movies-controller";
import errorsHandler from "./middleware/errors-handler";
import preventGarbage from "./middleware/prevent-garbage";
import ErrorModel from "./models/error-model";
import authController from "./controllers/auth-controller";

const server = express();

server.use(express.json()); // Support request.body object.
server.use(preventGarbage); // Call that middleware for any request.

server.use("/api", authController); // Any request route to that controller.
server.use("/api", moviesController); // Any request route to that controller.

// Route not found:
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler); // Catch-All Middleware

server.listen(3001, () => console.log("Listening..."));
