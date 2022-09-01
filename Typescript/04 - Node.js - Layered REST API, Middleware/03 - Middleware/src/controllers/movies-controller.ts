import express, { Request, Response } from "express";
import moviesLogic from "../bll/movies-logic";
import logging from "../middleware/logging";
import MovieModel from "../models/movie-model";

const router = express.Router();

// router.use(logging); // Dont do it!

router.get("/api/movies", async (request: Request, response: Response) => {
  const movies = await moviesLogic.getAllMovies();
  response.json(movies);
});

router.get(
  "/api/movies/:id",
  logging,
  async (request: Request, response: Response) => {
    const id = +request.params.id;
    const movie = await moviesLogic.getOneMovie(id);
    response.json(movie);
  }
);

router.post("/api/movies", async (request: Request, response: Response) => {
  const movie = new MovieModel(request.body);
  const addedMovie = await moviesLogic.addMovie(movie);
  response.status(201).json(addedMovie);
});

router.put("/api/movies/:id", async (request: Request, response: Response) => {
  const id = +request.params.id;
  request.body.id = id;
  const movie = new MovieModel(request.body);
  const updatedMovie = await moviesLogic.updateMovie(movie);
  response.json(updatedMovie);
});

router.delete(
  "/api/movies/:id",
  async (request: Request, response: Response) => {
    const id = +request.params.id;
    await moviesLogic.deleteMovie(id);
    response.sendStatus(204);
  }
);

export default router;
