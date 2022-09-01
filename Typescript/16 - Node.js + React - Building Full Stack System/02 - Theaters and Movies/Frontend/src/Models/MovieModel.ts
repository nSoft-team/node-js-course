class MovieModel {
  public movieId: number; // PK
  public cinemaId: number; // FK
  public movieName: string;
  public movieTime: string;
  public duration: number;
  public cinemaName: string;
}

export default MovieModel;
