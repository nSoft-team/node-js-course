class MovieModel {
  public id: number;
  public name: string;
  public year: number;

  public constructor(movie: MovieModel) {
    // Copy Constructor
    this.id = movie.id;
    this.name = movie.name;
    this.year = movie.year;
  }
}

export default MovieModel;
