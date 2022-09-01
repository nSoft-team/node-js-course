import express, { NextFunction, Request, Response } from "express";
import moviesLogic from "../bll/movies-logic";
import logging from "../middleware/logging";
import verifyAdmin from "../middleware/verify-admin";
import verifyLoggedIn from "../middleware/verify-logged-in";
import MovieModel from "../models/movie-model";

const router = express.Router();

// router.use(logging); // Dont do it!

router.get(
  "/movies",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const movies = await moviesLogic.getAllMovies();
      response.json(movies);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/movies/:id",
  logging,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const movie = await moviesLogic.getOneMovie(id);
      response.json(movie);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/movies",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const movie = new MovieModel(request.body);
      const addedMovie = await moviesLogic.addMovie(movie);
      response.status(201).json(addedMovie);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  "/movies/:id",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      request.body.id = id;
      const movie = new MovieModel(request.body);
      const updatedMovie = await moviesLogic.updateMovie(movie);
      response.json(updatedMovie);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/movies/:id",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await moviesLogic.deleteMovie(id);
      response.sendStatus(204); // No Content
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
