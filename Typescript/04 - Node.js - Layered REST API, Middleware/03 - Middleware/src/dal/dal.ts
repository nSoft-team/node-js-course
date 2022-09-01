import fs from "fs/promises";
import MovieModel from "../models/movie-model";

const fileAbsolutePath = "./src/database/movies.json";

async function getAllMovies(): Promise<MovieModel[]> {
  const content = await fs.readFile(fileAbsolutePath, "utf-8");
  const movies: MovieModel[] = JSON.parse(content);
  return movies;
}

async function saveAllMovies(movies: MovieModel[]): Promise<void> {
  const content = JSON.stringify(movies, null, 4); // 4 --> save json using indentation
  await fs.writeFile(fileAbsolutePath, content);
}

export default {
  getAllMovies,
  saveAllMovies,
};
