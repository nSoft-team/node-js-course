import express from "express";
import moviesController from "./controllers/movies-controller";

const server = express();

server.use(express.json()); // Support request.body object.

server.use("/", moviesController); // Any request route to that controller

server.listen(3001, () => console.log("Listening..."));
