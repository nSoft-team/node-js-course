import express, { NextFunction, Request, Response } from "express";
import MovieModel from "../03-models/movie-model";
import logic from "../05-logic/logic";

const router = express.Router();

// http://localhost:3001/api/cinemas
router.get(
  "/cinemas",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cinemas = await logic.getAllCinemas();
      response.json(cinemas);
    } catch (err: any) {
      next(err);
    }
  }
);

// http://localhost:3001/api/movies-per-cinema
router.get(
  "/movies-per-cinema/:cinemaId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cinemaId = +request.params.cinemaId;
      const movies = await logic.getMoviesByCinema(cinemaId);
      response.json(movies);
    } catch (err: any) {
      next(err);
    }
  }
);

// http://localhost:3001/api/movies
router.post(
  "/movies",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const movie = new MovieModel(request.body);
      const addedMovie = await logic.addMovie(movie);
      response.status(201).json(addedMovie);
    } catch (err: any) {
      next(err);
    }
  }
);

// http://localhost:3001/api/movies
router.delete(
  "/movies/:movieId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const movieId = +request.params.movieId;
      await logic.deleteMovie(movieId);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
