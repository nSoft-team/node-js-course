import express from "express";
import moviesController from "./controllers/movies-controller";
import errorsHandler from "./middleware/errors-handler";
import preventGarbage from "./middleware/prevent-garbage";

const server = express();

server.use(express.json()); // Support request.body object.
server.use(preventGarbage); // Call that middleware for any request.
server.use("/", moviesController); // Any request route to that controller

server.use(errorsHandler); // Catch-All Middleware

server.listen(3001, () => console.log("Listening..."));
