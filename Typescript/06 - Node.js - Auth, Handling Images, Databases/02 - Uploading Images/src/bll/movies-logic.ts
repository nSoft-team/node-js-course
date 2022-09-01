import dal from "../dal/dal";
import ErrorModel from "../models/error-model";
import MovieModel from "../models/movie-model";
import { v4 as uuid } from "uuid";

async function getAllMovies(): Promise<MovieModel[]> {
  const movies = await dal.getAllMovies();
  return movies;
}

async function getOneMovie(id: number): Promise<MovieModel> {
  const movies = await dal.getAllMovies();
  const movie = movies.find((m) => m.id === id);
  if (!movie) {
    throw new ErrorModel(404, `Movie id ${id} not found`);
  }
  return movie;
}

async function addMovie(movie: MovieModel): Promise<MovieModel> {
  // Validation:
  const error = movie.validatePost();
  if (error) {
    throw new ErrorModel(400, error);
  }

  // Add ID:
  const movies = await dal.getAllMovies();
  movie.id = movies[movies.length - 1].id + 1;

  // Handle image only if frontend sent image:
  if (movie.image) {
    // movie.image.name is the original image name. e.g. "cat.jpg"
    const extension = movie.image.name.substring(
      movie.image.name.lastIndexOf(".")
    ); // the original extension (e.g. ".jpg")
    movie.imageName = uuid() + extension; // A unique name for the image file.
    await movie.image.mv("./src/assets/images/" + movie.imageName); // Save the image to the disk.
    delete movie.image; // Delete the image before returning the model to the front.
  }

  // Save movie to database:
  movies.push(movie);
  await dal.saveAllMovies(movies);

  // Return added movie without image:
  return movie;
}

async function updateMovie(movie: MovieModel): Promise<MovieModel> {
  const error = movie.validatePut();
  if (error) {
    throw new ErrorModel(400, error);
  }

  const movies = await dal.getAllMovies();
  const index = movies.findIndex((m) => m.id == movie.id);
  if (index === -1) {
    throw new ErrorModel(404, `Movie id ${movie.id} not found`);
  }

  // Handle image only if frontend sent image:
  if (movie.image) {
    // Replace previous image on disk with the new one.
  }

  movies[index] = movie;
  await dal.saveAllMovies(movies);
  return movie;
}

async function deleteMovie(id: number): Promise<void> {
  const movies = await dal.getAllMovies();
  const index = movies.findIndex((m) => m.id == id);
  if (index === -1) {
    throw new ErrorModel(404, `Movie id ${id} not found`);
  }

  // If movie contain image on disk - delete it!

  movies.splice(index, 1);
  await dal.saveAllMovies(movies);
}

export default {
  getAllMovies,
  getOneMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
