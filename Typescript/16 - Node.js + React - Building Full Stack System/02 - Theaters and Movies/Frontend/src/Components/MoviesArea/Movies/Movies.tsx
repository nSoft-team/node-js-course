import { SyntheticEvent, useEffect, useState } from "react";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import MovieCard from "../MovieCard/MovieCard";
import "./Movies.css";

function Movies(): JSX.Element {
  const [cinemas, setCinemas] = useState<CinemaModel[]>([]);
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    moviesService
      .getAllCinemas()
      .then((cinemas) => setCinemas(cinemas))
      .catch((err) => alert(err.message));
  }, []);

  async function handleChange(args: SyntheticEvent) {
    try {
      const cinemaId = +(args.target as HTMLSelectElement).value;
      const movies = await moviesService.getMoviesByCinema(cinemaId);
      setMovies(movies);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteMovie(movieId: number) {
    try {
      await moviesService.deleteMovie(movieId);
      alert("Movie has been deleted");
      const newMovies = [...movies];
      const indexToDelete = newMovies.findIndex((m) => m.movieId === movieId);
      newMovies.splice(indexToDelete, 1);
      setMovies(newMovies);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="Movies">
      <select defaultValue="" onChange={handleChange}>
        <option disabled value="">
          Select Cinema
        </option>
        {cinemas.map((c) => (
          <option key={c.cinemaId} value={c.cinemaId}>
            {c.cinemaName}
          </option>
        ))}
      </select>

      <br />

      <div className="container">
        {movies.map((m) => (
          <MovieCard key={m.movieId} movie={m} deleteMovie={deleteMovie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
