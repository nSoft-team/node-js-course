import { OkPacket } from "mysql";
import CinemaModel from "../models/cinema-model";
import MovieModel from "../models/movie-model";
import dal from "../dal/dal";
import { cinemas, movies } from "../utils/data";

async function getAllCinemas(): Promise<CinemaModel[]> {
  // const sql = "SELECT * FROM cinemas";
  // const cinemas = await dal.execute(sql);
   return cinemas;
}

async function getMoviesByCinema(cinemaId: number): Promise<MovieModel[]> {
  // const sql = `SELECT M.*, C.cinemaName
  //                FROM cinemas AS C JOIN movies AS M
  //                ON C.cinemaId = M.cinemaId
  //                WHERE M.cinemaId = ?`;

  // const movies = await dal.execute(sql, [cinemaId]);
  const moviesFiltered = movies.filter(movie => movie.cinemaId === cinemaId)
  return moviesFiltered;
}

async function addMovie(movie: MovieModel): Promise<MovieModel> {
  // const sql = "INSERT INTO Movies VALUES(DEFAULT, ?, ?, ?, ?)";

  // const info: OkPacket = await dal.execute(sql, [
  //   movie.cinemaId,
  //   movie.movieName,
  //   movie.movieTime,
  //   movie.duration,
  // ]);

  // movie.movieId = info.insertId;

  movies.push(movie);
  const addedMovie = movies.find(item => movie.movieId === item.movieId);  
  return addedMovie;
}

async function deleteMovie(movieId: number): Promise<void> {
  // const sql = "DELETE FROM movies WHERE movieId = ?";
  // await dal.execute(sql, [movieId]);
  
  movies.forEach(item => {
    if(item.movieId === movieId){
      movies.splice(movies.indexOf(item), 1);
    }
  })
}

export default {
  getAllCinemas,
  getMoviesByCinema,
  addMovie,
  deleteMovie,
};
