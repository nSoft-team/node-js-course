import { SyntheticEvent } from "react";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import "./MovieCard.css";

interface MovieCardProps {
  movie: MovieModel;
  deleteMovie: (movieId: number) => void; // (movieId: number) => void  --> is a function type getting a number, returning void
}

function MovieCard(props: MovieCardProps): JSX.Element {
  function formatDateTime(dateTime: string): string {
    const d = new Date(dateTime);
    return d.toLocaleString();
  }

  // // First way (for table display)
  // async function deleteMovie(movieId: number) {
  //     alert(movieId);
  // }

  // // Second way (for cards):
  // async function deleteMovie() {
  //     try {
  //         await moviesService.deleteMovie(props.movie.movieId);
  //         alert("Movie has been deleted");
  //     }
  //     catch (err: any) {
  //         alert(err.message);
  //     }
  // }

  return (
    <div className="MovieCard">
      {/* First way (for table display) */}
      {/* <button className="delete" onClick={() => { deleteMovie(props.movie.movieId) }}>❌</button> */}

      {/* Second way (for cards) */}
      {/* <button className="delete" onClick={deleteMovie}>❌</button> */}

      {/* Third way (delete logic is in our parent component) */}
      <button
        className="delete"
        onClick={() => props.deleteMovie(props.movie.movieId)}
      >
        ❌
      </button>

      <span>Name: {props.movie.movieName}</span>
      <br />
      <span>Time: {formatDateTime(props.movie.movieTime)}</span>
      <br />
      <span>Duration: {props.movie.duration} minutes</span>
      <br />
      <span>Cinema: {props.movie.cinemaName}</span>
    </div>
  );
}

export default MovieCard;
