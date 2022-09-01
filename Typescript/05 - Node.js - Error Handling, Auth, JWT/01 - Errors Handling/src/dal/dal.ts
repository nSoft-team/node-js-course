import fs from "fs/promises";
import MovieModel from "../models/movie-model";
import UserModel from "../models/user-model";

const moviesFileAbsolutePath = "./src/database/movies.json";
const usersFileAbsolutePath = "./src/database/users.json";

async function getAllMovies(): Promise<MovieModel[]> {
  const content = await fs.readFile(moviesFileAbsolutePath, "utf-8");
  const movies: MovieModel[] = JSON.parse(content);
  return movies;
}

async function saveAllMovies(movies: MovieModel[]): Promise<void> {
  const content = JSON.stringify(movies, null, 4); // 4 --> save json using indentation
  await fs.writeFile(moviesFileAbsolutePath, content);
}

async function getAllUsers(): Promise<UserModel[]> {
  const content = await fs.readFile(usersFileAbsolutePath, "utf-8");
  const users: UserModel[] = JSON.parse(content);
  return users;
}

async function saveAllUsers(users: UserModel[]): Promise<void> {
  const content = JSON.stringify(users, null, 4); // 4 --> save json using indentation
  await fs.writeFile(usersFileAbsolutePath, content);
}

export default {
  getAllMovies,
  saveAllMovies,
  getAllUsers,
  saveAllUsers,
};
