import dal from "../dal/dal";
import ErrorModel from "../models/error-model";
import MovieModel from "../models/movie-model";

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
  const error = movie.validatePost();
  if (error) {
    throw new ErrorModel(400, error);
  }

  // if(movie.validatePost()) throw new ErrorModel(400, movie.validatePost());

  const movies = await dal.getAllMovies();
  movie.id = movies[movies.length - 1].id + 1;
  movies.push(movie);
  await dal.saveAllMovies(movies);
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
