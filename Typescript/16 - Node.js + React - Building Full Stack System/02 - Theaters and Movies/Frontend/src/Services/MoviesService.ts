import axios from "axios";
import CinemaModel from "../Models/CinemaModel";
import MovieModel from "../Models/MovieModel";
import config from "../Utils/Config";

class MoviesService {
  // Get all cinemas:
  public async getAllCinemas(): Promise<CinemaModel[]> {
    const response = await axios.get<CinemaModel[]>(config.cinemasUrl);
    return response.data;
  }

  // Get movies by cinema:
  public async getMoviesByCinema(cinemaId: number): Promise<MovieModel[]> {
    const response = await axios.get<MovieModel[]>(
      config.moviesPerCinema + cinemaId
    );
    return response.data;
  }

  // Add movie:
  public async addMovie(movie: MovieModel): Promise<MovieModel> {
    const response = await axios.post<MovieModel>(config.movies, movie);
    return response.data;
  }

  // Delete movie:
  public async deleteMovie(movieId: number): Promise<void> {
    await axios.delete(config.movies + movieId);
  }
}

const moviesService = new MoviesService();

export default moviesService;
