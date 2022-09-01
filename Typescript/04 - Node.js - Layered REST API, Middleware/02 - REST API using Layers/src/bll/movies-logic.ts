import dal from "../dal/dal";
import MovieModel from "../models/movie-model";

async function getAllMovies(): Promise<MovieModel[]> {
  const movies = await dal.getAllMovies();
  return movies;
}

async function getOneMovie(id: number): Promise<MovieModel> {
  const movies = await dal.getAllMovies();
  const movie = movies.find((m) => m.id === id);
  return movie;
}

async function addMovie(movie: MovieModel): Promise<MovieModel> {
  const movies = await dal.getAllMovies();
  movie.id = movies[movies.length - 1].id + 1;
  movies.push(movie);
  await dal.saveAllMovies(movies);
  return movie;
}

async function updateMovie(movie: MovieModel): Promise<MovieModel> {
  const movies = await dal.getAllMovies();
  const index = movies.findIndex((m) => m.id == movie.id);
  movies[index] = movie;
  await dal.saveAllMovies(movies);
  return movie;
}

async function deleteMovie(id: number): Promise<void> {
  const movies = await dal.getAllMovies();
  const index = movies.findIndex((m) => m.id == id);
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
