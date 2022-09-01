import { OkPacket } from "mysql";
import CinemaModel from "../03-models/cinema-model";
import ErrorModel from "../03-models/error-model";
import MovieModel from "../03-models/movie-model";
import dal from "../04-dal/dal";

// Get all cinemas:
async function getAllCinemas(): Promise<CinemaModel[]> {
  const sql = "SELECT * FROM cinemas";
  const cinemas = await dal.execute(sql);
  return cinemas;
}

// Get movies by cinema:
async function getMoviesByCinema(cinemaId: number): Promise<MovieModel[]> {
  // const sql = `SELECT movies.*, cinemas.cinemaName
  //              FROM cinemas JOIN movies
  //              ON cinemas.cinemaId = movies.cinemaId
  //              WHERE movies.cinemaId = ?`;

  const sql = `SELECT M.*, C.cinemaName
                 FROM cinemas AS C JOIN movies AS M
                 ON C.cinemaId = M.cinemaId
                 WHERE M.cinemaId = ?`;

  const movies = await dal.execute(sql, [cinemaId]);
  return movies;
}

// Add movie:
async function addMovie(movie: MovieModel): Promise<MovieModel> {
  const sql = "INSERT INTO Movies VALUES(DEFAULT, ?, ?, ?, ?)";

  const info: OkPacket = await dal.execute(sql, [
    movie.cinemaId,
    movie.movieName,
    movie.movieTime,
    movie.duration,
  ]);

  movie.movieId = info.insertId;

  return movie;
}

// Delete movie:
async function deleteMovie(movieId: number): Promise<void> {
  const sql = "DELETE FROM movies WHERE movieId = ?";
  await dal.execute(sql, [movieId]);
}

export default {
  getAllCinemas,
  getMoviesByCinema,
  addMovie,
  deleteMovie,
};
