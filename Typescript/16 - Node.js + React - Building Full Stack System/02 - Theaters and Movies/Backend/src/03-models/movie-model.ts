class MovieModel {
  public movieId: number; // PK
  public cinemaId: number; // FK
  public movieName: string;
  public movieTime: string;
  public duration: number;

  public constructor(movie: MovieModel) {
    this.movieId = movie.movieId;
    this.cinemaId = movie.cinemaId;
    this.movieName = movie.movieName;
    this.movieTime = movie.movieTime;
    this.duration = movie.duration;
  }
}

export default MovieModel;
