class Config {}

class DevelopmentConfig extends Config {
  public cinemasUrl = "http://localhost:3001/api/cinemas/";
  public moviesPerCinema = "http://localhost:3001/api/movies-per-cinema/";
  public movies = "http://localhost:3001/api/movies/";
}

class ProductionConfig extends Config {
  public cinemasUrl = "http://localhost:3001/api/cinemas/";
  public moviesPerCinema = "http://localhost:3001/api/movies-per-cinema/";
  public movies = "http://localhost:3001/api/movies/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
