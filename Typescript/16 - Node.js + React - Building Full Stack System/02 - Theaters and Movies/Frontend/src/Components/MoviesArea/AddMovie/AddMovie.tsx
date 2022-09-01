import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MoviesService";
import "./AddMovie.css";

function AddMovie(): JSX.Element {
  const [cinemas, setCinemas] = useState<CinemaModel[]>([]);

  const { register, handleSubmit, formState } = useForm<MovieModel>();

  const navigate = useNavigate();

  useEffect(() => {
    moviesService
      .getAllCinemas()
      .then((cinemas) => setCinemas(cinemas))
      .catch((err) => alert(err.message));
  }, []);

  async function submit(movie: MovieModel): Promise<void> {
    try {
      const addedMovie = await moviesService.addMovie(movie);
      alert("Movie added! ID: " + addedMovie.movieId);
      navigate("/movies");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="AddMovie">
      <form onSubmit={handleSubmit(submit)}>
        <label>Cinema: </label>
        <select
          defaultValue=""
          {...register("cinemaId", {
            required: { value: true, message: "Missing cinema" },
          })}
        >
          <option disabled value="">
            Select Cinema
          </option>
          {cinemas.map((c) => (
            <option key={c.cinemaId} value={c.cinemaId}>
              {c.cinemaName}
            </option>
          ))}
        </select>
        <span>{formState.errors?.cinemaId?.message}</span>

        <label>Name: </label>
        <input
          type="text"
          {...register("movieName", {
            required: { value: true, message: "Missing name" },
          })}
        />
        <span>{formState.errors?.movieName?.message}</span>

        <label>Time: </label>
        <input
          type="datetime-local"
          {...register("movieTime", {
            required: { value: true, message: "Missing time" },
          })}
        />
        <span>{formState.errors?.movieTime?.message}</span>

        <label>Duration: </label>
        <input
          type="number"
          min="20"
          max="500"
          {...register("duration", {
            required: { value: true, message: "Missing duration" },
          })}
        />
        <span>{formState.errors?.duration?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddMovie;
